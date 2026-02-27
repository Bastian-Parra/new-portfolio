import { useState } from 'react';
import ProjectsManager from './ProjectsManager';
import PostsManager from './PostsManager';
import TechStackManager from './TechStackManager';

type Tab = 'projects' | 'posts' | 'tech-stack';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'posts', label: 'Posts' },
    { id: 'tech-stack', label: 'Tech Stack' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary-text mb-8">Admin Dashboard</h1>
      
      <div className="flex gap-4 mb-8 border-b border-borders">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-secondary-text hover:text-primary-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'posts' && <PostsManager />}
        {activeTab === 'tech-stack' && <TechStackManager />}
      </div>
    </div>
  );
}
