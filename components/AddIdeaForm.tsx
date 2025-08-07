import React, { useState } from 'react';
import { CategoryType, AVAILABLE_THEMES, Idea } from '../types';

interface AddIdeaFormProps {
  onAddIdea: (ideaData: Omit<Idea, 'id' | 'votes' | 'createdAt'>) => void;
}

const AddIdeaForm: React.FC<AddIdeaFormProps> = ({ onAddIdea }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>(CategoryType.AI);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorTeam, setAuthorTeam] = useState('');
  const [authorDivision, setAuthorDivision] = useState('');
  const [error, setError] = useState('');

  const handleThemeChange = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  const validateForm = () => {
    if (!title.trim() || !description.trim() || !authorName.trim() || !authorEmail.trim() || !authorTeam.trim() || !authorDivision.trim()) {
      setError('Please fill out all required fields.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (selectedThemes.length === 0) {
      setError('Please select at least one theme.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddIdea({
      title,
      description,
      category,
      themes: selectedThemes,
      authorName,
      authorEmail,
      authorTeam,
      authorDivision,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory(CategoryType.AI);
    setSelectedThemes([]);
    setAuthorName('');
    setAuthorEmail('');
    setAuthorTeam('');
    setAuthorDivision('');
  };

  const isFormValid = title.trim() && description.trim() && authorName.trim() && authorEmail.trim() && authorTeam.trim() && authorDivision.trim() && selectedThemes.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit a New Idea</h2>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="mb-6">
          <legend className="text-lg font-semibold text-gray-700 mb-3">Idea Details</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="idea-title" className="block text-gray-700 font-medium mb-2">Title</label>
              <input id="idea-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A concise title for your idea" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label htmlFor="idea-description" className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea id="idea-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Explain your idea in a few sentences." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
            </div>
            <div>
              <label htmlFor="idea-category" className="block text-gray-700 font-medium mb-2">Category</label>
              <select id="idea-category" value={category} onChange={(e) => setCategory(e.target.value as CategoryType)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                {Object.values(CategoryType).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Themes</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_THEMES.map(theme => (
                  <button key={theme} type="button" onClick={() => handleThemeChange(theme)} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedThemes.includes(theme) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </fieldset>
        
        <fieldset>
          <legend className="text-lg font-semibold text-gray-700 mb-3">Your Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author-name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input id="author-name" type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="e.g., Jane Doe" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label htmlFor="author-email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input id="author-email" type="email" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} placeholder="e.g., jane.doe@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label htmlFor="author-team" className="block text-gray-700 font-medium mb-2">Team</label>
              <input id="author-team" type="text" value={authorTeam} onChange={(e) => setAuthorTeam(e.target.value)} placeholder="e.g., Finance" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label htmlFor="author-division" className="block text-gray-700 font-medium mb-2">Division</label>
              <input id="author-division" type="text" value={authorDivision} onChange={(e) => setAuthorDivision(e.target.value)} placeholder="e.g., Commercials" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
          </div>
        </fieldset>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed mt-6" disabled={!isFormValid}>
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default AddIdeaForm;