'use client';

import { useState, useEffect } from 'react';

interface VoteData {
  upvotes: number;
  downvotes: number;
  totalVotes: number;
}

export default function Home() {
  const [votes, setVotes] = useState<VoteData>({ upvotes: 0, downvotes: 0, totalVotes: 0 });
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  // Fetch current votes on component mount
  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const response = await fetch('/api/vote');
      const data = await response.json();
      setVotes(data);
    } catch (error) {
      console.error('Error fetching votes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (type: 'upvote' | 'downvote') => {
    setVoting(true);
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const updatedVotes = await response.json();
        setVotes(updatedVotes);
      } else {
        console.error('Error voting:', response.statusText);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voting App</h1>
          <p className="text-gray-600">Cast your vote below!</p>
        </div>

        {/* Vote Display */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{votes.upvotes}</div>
            <div className="text-sm text-green-600">Upvotes</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{votes.downvotes}</div>
            <div className="text-sm text-red-600">Downvotes</div>
          </div>
        </div>

        {/* Total Votes */}
        <div className="text-center mb-8">
          <div className="text-lg text-gray-600">
            Total Votes: <span className="font-semibold">{votes.totalVotes}</span>
          </div>
        </div>

        {/* Voting Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleVote('upvote')}
            disabled={voting}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 
                     text-white font-semibold py-4 px-6 rounded-lg transition-colors
                     flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {voting ? 'Voting...' : 'Upvote'}
          </button>

          <button
            onClick={() => handleVote('downvote')}
            disabled={voting}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 
                     text-white font-semibold py-4 px-6 rounded-lg transition-colors
                     flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {voting ? 'Voting...' : 'Downvote'}
          </button>
        </div>

        {/* Vote Progress Bar */}
        {votes.totalVotes > 0 && (
          <div className="mt-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Upvotes: {Math.round((votes.upvotes / votes.totalVotes) * 100)}%</span>
              <span>Downvotes: {Math.round((votes.downvotes / votes.totalVotes) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(votes.upvotes / votes.totalVotes) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
