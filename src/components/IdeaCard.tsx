
import React from 'react';
import { Idea, CategoryType } from '../types';
import UpvoteIcon from './icons/UpvoteIcon';
import DownvoteIcon from './icons/DownvoteIcon';

interface IdeaCardProps {
  idea: Idea;
  onVote: (ideaId: number, voteType: 'up' | 'down') => void;
  voted: 'up' | 'down' | null;
}

const categoryColors: { [key in CategoryType]: string } = {
  [CategoryType.AI]: 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200',
  [CategoryType.AUTOMATION]: 'bg-purple-100 text-purple-800 ring-1 ring-inset ring-purple-200',
  [CategoryType.GENERAL]: 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200',
};

const themeColors = [
  'bg-green-100 text-green-800 ring-1 ring-inset ring-green-200',
  'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200',
  'bg-pink-100 text-pink-800 ring-1 ring-inset ring-pink-200',
  'bg-teal-100 text-teal-800 ring-1 ring-inset ring-teal-200',
  'bg-orange-100 text-orange-800 ring-1 ring-inset ring-orange-200',
];

const getThemeColor = (theme: string) => {
    let hash = 0;
    for (let i = 0; i < theme.length; i++) {
        hash = theme.charCodeAt(i) + ((hash << 5) - hash);
    }
    return themeColors[Math.abs(hash) % themeColors.length];
};

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote, voted }) => {
  const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)}y ago`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)}mo ago`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)}d ago`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)}h ago`;
    interval = seconds / 60;
    return `${Math.floor(interval)}m ago`;
  };
  
  const voteButtonClasses = "p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const upvoteClasses = voted === 'up' ? 'text-white bg-indigo-500' : 'text-gray-500 bg-gray-200 hover:bg-indigo-100';
  const downvoteClasses = voted === 'down' ? 'text-white bg-red-500' : 'text-gray-500 bg-gray-200 hover:bg-red-100';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex transition-shadow duration-300 hover:shadow-xl">
      <div className="p-4 flex flex-col items-center justify-start bg-gray-50/70 border-r border-gray-100">
        <button
          onClick={() => onVote(idea.id, 'up')}
          disabled={!!voted}
          className={`${voteButtonClasses} ${upvoteClasses}`}
          aria-label="Upvote"
        >
          <UpvoteIcon className="w-6 h-6" />
        </button>
        <span className="text-2xl font-bold text-gray-800 my-2 w-12 text-center" aria-label={`${idea.votes} votes`}>{idea.votes}</span>
        <button
          onClick={() => onVote(idea.id, 'down')}
          disabled={!!voted}
          className={`${voteButtonClasses} ${downvoteClasses}`}
          aria-label="Downvote"
        >
          <DownvoteIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 pr-4 flex-1">{idea.title}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[idea.category]} whitespace-nowrap`}>{idea.category}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {idea.themes.map(theme => (
              <span key={theme} className={`text-xs font-medium px-2.5 py-1 rounded-full ${getThemeColor(theme)}`}>
                  {theme}
              </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{idea.description}</p>
        <div className="border-t border-gray-100 pt-3 mt-auto flex justify-between items-center text-sm">
            <p className="text-gray-500 truncate" title={`Submitted by ${idea.authorName} from ${idea.authorTeam} (${idea.authorDivision})`}>
                By <span className="font-semibold text-gray-700">{idea.authorName}</span> <span className="hidden sm:inline">({idea.authorTeam})</span>
            </p>
            <p className="text-gray-500 flex-shrink-0 pl-2">
                {timeSince(idea.createdAt)}
            </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
