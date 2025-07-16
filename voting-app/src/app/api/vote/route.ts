import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Vote from '@/models/Vote';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get or create the vote document
    let vote = await Vote.findOne();
    if (!vote) {
      vote = new Vote();
      await vote.save();
    }

    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { type } = await request.json();
    
    if (type !== 'upvote' && type !== 'downvote') {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
    }

    // Get or create the vote document
    let vote = await Vote.findOne();
    if (!vote) {
      vote = new Vote();
    }

    // Update the vote count
    if (type === 'upvote') {
      vote.upvotes += 1;
    } else {
      vote.downvotes += 1;
    }

    await vote.save();

    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 });
  }
}