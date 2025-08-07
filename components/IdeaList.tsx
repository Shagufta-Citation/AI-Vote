
import React from 'react';
import { Idea } from '../types';
import IdeaCard from './IdeaCard';

interface IdeaListProps {
  ideas: Idea[];
  onVote: (ideaId: number, voteType: 'up' | 'down') => void;
  votedIdeas: { [key: number]: 'up' | 'down' };
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onVote, votedIdeas }) => {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800">No ideas yet!</h3>
        <p className="text-gray-500 mt-2">Be the first to submit an amazing idea.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onVote={onVote}
          voted={votedIdeas[idea.id] || null}
        />
      ))}
    </div>
  );
};

export default IdeaList;
