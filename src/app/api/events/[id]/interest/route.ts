import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * Handle POST request to toggle interest in an event
 * Fixes: "Failed to execute JSON" error - ensures proper JSON response and error handling
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to show interest.' },
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const { id: eventId } = await context.params

    // Validate event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { 
        id: true,
        _count: {
          select: { interested: true }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user already interested
    const existingInterest = await prisma.eventInterest.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: session.user.id
        }
      }
    })

    let isInterested: boolean

    if (existingInterest) {
      // Remove interest
      await prisma.eventInterest.delete({
        where: {
          eventId_userId: {
            eventId,
            userId: session.user.id
          }
        }
      })
      isInterested = false
    } else {
      // Add interest
      await prisma.eventInterest.create({
        data: {
          eventId,
          userId: session.user.id
        }
      })
      isInterested = true
    }

    return NextResponse.json(
      { 
        success: true,
        isInterested,
        message: isInterested ? 'Interest added successfully' : 'Interest removed successfully'
      },
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error toggling event interest:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update interest. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
