
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Idea, SortOption, CategoryType } from './types';
import Header from './components/Header';
import AddIdeaForm from './components/AddIdeaForm';
import SortControl from './components/SortControl';
import IdeaList from './components/IdeaList';
import FilterControls from './components/FilterControls';
import ExportButton from './components/ExportButton';
import DownloadIcon from './components/icons/DownloadIcon';

const initialIdeas: Idea[] = [
  {
    id: 1,
    title: 'Implement User Profiles',
    description: 'Allow users to create profiles to track their submitted ideas and votes.',
    votes: 28,
    createdAt: new Date(Date.now() - 86400000 * 2),
    themes: ['User Experience'],
    category: CategoryType.GENERAL,
    authorName: 'Eleanor Vantage',
    authorEmail: 'e.vantage@example.com',
    authorTeam: 'UX Design',
    authorDivision: 'Product',
  },
  {
    id: 2,
    title: 'Automate Invoice Processing',
    description: 'Use AI to scan and process invoices from suppliers, reducing manual data entry.',
    votes: 15,
    createdAt: new Date(Date.now() - 86400000 * 5),
    themes: ['Credit Control', 'Management Accounts'],
    category: CategoryType.AI,
    authorName: 'Ben Carter',
    authorEmail: 'b.carter@example.com',
    authorTeam: 'Finance',
    authorDivision: 'Accounts Payable',
  },
  {
    id: 3,
    title: 'Add a Comment Section to Ideas',
    description: 'Enable discussions on each idea to refine and debate them before voting.',
    votes: 42,
    createdAt: new Date(Date.now() - 86400000 * 1),
    themes: ['User Experience'],
    category: CategoryType.GENERAL,
    authorName: 'Olivia Chen',
    authorEmail: 'o.chen@example.com',
    authorTeam: 'Community',
    authorDivision: 'Marketing',
  },
  {
    id: 4,
    title: 'Weekly Idea Digest Email',
    description: 'Send a summary of the top-voted and newest ideas every week to keep users engaged.',
    votes: 8,
    createdAt: new Date(Date.now() - 3600000 * 3),
    themes: ['Operations'],
    category: CategoryType.AUTOMATION,
    authorName: 'Marcus Wright',
    authorEmail: 'm.wright@example.com',
    authorTeam: 'Internal Comms',
    authorDivision: 'HR',
  },
];

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.POPULARITY);
  const [votedIdeas, setVotedIdeas] = useState<{ [key: number]: 'up' | 'down' }>({});
  const [themeFilter, setThemeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType | 'All'>('All');

  useEffect(() => {
    try {
      const storedVotes = localStorage.getItem('votedIdeas');
      if (storedVotes) {
        setVotedIdeas(JSON.parse(storedVotes));
      }
    } catch (error) {
      console.error("Failed to parse voted ideas from localStorage", error);
    }
  }, []);

  const handleVote = useCallback((ideaId: number, voteType: 'up' | 'down') => {
    if (votedIdeas[ideaId]) return;

    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            votes: voteType === 'up' ? idea.votes + 1 : idea.votes - 1,
          };
        }
        return idea;
      })
    );

    const newVotedIdeas = { ...votedIdeas, [ideaId]: voteType };
    localStorage.setItem('votedIdeas', JSON.stringify(newVotedIdeas));
    setVotedIdeas(newVotedIdeas);
  }, [votedIdeas]);

  const handleAddIdea = useCallback(
    (ideaData: Omit<Idea, 'id' | 'votes' | 'createdAt'>) => {
      const newIdea: Idea = {
        id: Date.now(),
        ...ideaData,
        votes: 0,
        createdAt: new Date(),
      };
      setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);
    },
    []
  );

  const filteredAndSortedIdeas = useMemo(() => {
    return ideas
      .filter(idea => {
        const themeMatch = themeFilter === 'All' || idea.themes.includes(themeFilter);
        const categoryMatch = categoryFilter === 'All' || idea.category === categoryFilter;
        return themeMatch && categoryMatch;
      })
      .sort((a, b) => {
        if (sortOption === SortOption.POPULARITY) {
          return b.votes - a.votes;
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }, [ideas, sortOption, themeFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <AddIdeaForm onAddIdea={handleAddIdea} />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
             <h2 className="text-2xl font-bold text-gray-800">Ideas</h2>
             <div className="flex items-center gap-4">
               <FilterControls
                  onThemeChange={setThemeFilter}
                  onCategoryChange={setCategoryFilter}
                  currentTheme={themeFilter}
                  currentCategory={categoryFilter}
               />
               <ExportButton ideas={filteredAndSortedIdeas} />
             </div>
          </div>
          <SortControl currentSort={sortOption} onSortChange={setSortOption} />
          <IdeaList
            ideas={filteredAndSortedIdeas}
            onVote={handleVote}
            votedIdeas={votedIdeas}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
