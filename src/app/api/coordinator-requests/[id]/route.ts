import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import bcrypt from "bcryptjs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();
    const { action } = body; // "approve" or "reject"

    if (!action || (action !== "approve" && action !== "reject")) {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    const coordinatorRequest = await prisma.coordinatorRequest.findUnique({
      where: { id },
    });

    if (!coordinatorRequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    if (coordinatorRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "Request has already been processed" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      // Create user account or update existing user
      const existingUser = await prisma.user.findUnique({
        where: { email: coordinatorRequest.email },
      });

      // Generate random password
      const randomPassword = Math.random().toString(36).slice(-8) + "Co@" + Math.random().toString(36).slice(-4);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      if (existingUser) {
        // Update existing user to coordinator
        await prisma.user.update({
          where: { email: coordinatorRequest.email },
          data: {
            role: "COORDINATOR",
            department: coordinatorRequest.department,
          },
        });
      } else {
        // Create new coordinator user
        await prisma.user.create({
          data: {
            email: coordinatorRequest.email,
            name: coordinatorRequest.name,
            password: hashedPassword,
            role: "COORDINATOR",
            department: coordinatorRequest.department,
            phoneNumber: coordinatorRequest.phoneNumber,
            emailVerified: new Date(),
          },
        });
      }

      // Update request status
      await prisma.coordinatorRequest.update({
        where: { id },
        data: {
          status: "APPROVED",
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
        },
      });

      // Send approval email
      try {
        await sendEmail({
        to: coordinatorRequest.email,
        subject: "Coordinator Access Approved - College Reclaim",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .credentials { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #10b981; margin: 20px 0; }
                .button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .warning { background: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✅ Coordinator Access Approved!</h1>
                </div>
                <div class="content">
                  <p>Dear ${coordinatorRequest.name},</p>
                  <p>Congratulations! Your coordinator access request has been approved.</p>
                  
                  <div class="credentials">
                    <h3>Your Login Credentials:</h3>
                    <p><strong>Email:</strong> ${coordinatorRequest.email}</p>
                    <p><strong>Temporary Password:</strong> ${randomPassword}</p>
                  </div>

                  <div class="warning">
                    <strong>⚠️ Important:</strong> Please change your password after your first login for security.
                  </div>

                  <p><strong>Your Access Includes:</strong></p>
                  <ul>
                    <li>✅ Create and manage events for ${coordinatorRequest.department}</li>
                    <li>✅ Access to coordinator dashboard</li>
                    <li>✅ View event analytics and interest metrics</li>
                  </ul>

                  <p style="text-align: center;">
                    <a href="${process.env.NEXTAUTH_URL}/auth/coordinator-signin" class="button">Sign In Now</a>
                  </p>

                  <p style="margin-top: 30px;">Best regards,<br>College Reclaim Team</p>
                </div>
              </div>
            </body>
          </html>
        `,
        });
      } catch (emailError) {
        console.error("Failed to send approval email:", emailError);
        // Continue even if email fails
      }

      return NextResponse.json(
        { message: "Request approved and credentials sent" },
        { status: 200 }
      );
    } else {
      // Reject request
      await prisma.coordinatorRequest.update({
        where: { id },
        data: {
          status: "REJECTED",
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
        },
      });

      // Send rejection email
      try {
        await sendEmail({
        to: coordinatorRequest.email,
        subject: "Coordinator Access Request Update - College Reclaim",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Coordinator Access Request Update</h1>
                </div>
                <div class="content">
                  <p>Dear ${coordinatorRequest.name},</p>
                  <p>Thank you for your interest in becoming a coordinator for College Reclaim.</p>
                  <p>After careful review, we are unable to approve your coordinator access request at this time.</p>
                  <p>If you believe this is an error or would like to discuss this further, please contact us at:</p>
                  <p><strong>Email:</strong> collegereclaimjc@gmail.com</p>
                  <p style="margin-top: 30px;">Best regards,<br>College Reclaim Team</p>
                </div>
              </div>
            </body>
          </html>
        `,
        });
      } catch (emailError) {
        console.error("Failed to send rejection email:", emailError);
        // Continue even if email fails
      }

      return NextResponse.json(
        { message: "Request rejected" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error processing coordinator request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
