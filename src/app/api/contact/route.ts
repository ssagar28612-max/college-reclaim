import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send email to admin
    await sendEmail({
      to: process.env.SUPPORT_EMAIL || "support@yourdomain.com",
      subject: `Support Request: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #7c3aed;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 10px;
                border-radius: 5px;
                border-left: 3px solid #7c3aed;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #6b7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Support Request</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">From:</span>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <span class="label">Subject:</span>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent via College Reclaim Support Form</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: "We received your message - College Reclaim Support",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #6b7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Contacting Us!</h1>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>We've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
                <p><strong>Your message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #7c3aed;">
                  ${message.replace(/\n/g, "<br>")}
                </p>
                <p>If you have any urgent concerns, feel free to reach out to us directly at <a href="mailto:collegereclaimjc@gmail.com">collegereclaimjc@gmail.com</a></p>
                <p>Best regards,<br>College Reclaim Team</p>
              </div>
              <div class="footer">
                <p>Follow us on Instagram: <a href="https://instagram.com/college_reclaim">@college_reclaim</a></p>
                <p>&copy; 2025 College Reclaim. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
