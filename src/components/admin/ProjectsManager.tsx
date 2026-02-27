import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<ProjectInsert>>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProject.id) {
      await supabase
        .from('projects')
        .update(currentProject)
        .eq('id', currentProject.id);
    } else {
      await supabase
        .from('projects')
        .insert([currentProject as ProjectInsert]);
    }
    
    setIsEditing(false);
    setCurrentProject({});
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleNew = () => {
    setCurrentProject({
      technologies: [],
      featured: false,
      order_index: 0,
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-text">Projects</h2>
        <button
          onClick={handleNew}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/80"
        >
          Add New Project
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-card-surface border border-borders rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-primary-text mb-4">
            {currentProject.id ? 'Edit Project' : 'New Project'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Title</label>
              <input
                type="text"
                value={currentProject.title || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Description</label>
              <textarea
                value={currentProject.description || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Long Description</label>
              <textarea
                value={currentProject.long_description || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, long_description: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Image URL</label>
                <input
                  type="url"
                  value={currentProject.image_url || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Demo URL</label>
                <input
                  type="url"
                  value={currentProject.demo_url || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, demo_url: e.target.value })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={currentProject.github_url || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, github_url: e.target.value })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Order Index</label>
                <input
                  type="number"
                  value={currentProject.order_index || 0}
                  onChange={(e) => setCurrentProject({ ...currentProject, order_index: parseInt(e.target.value) })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={currentProject.technologies?.join(', ') || ''}
                onChange={(e) => setCurrentProject({ 
                  ...currentProject, 
                  technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={currentProject.featured || false}
                onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-primary-text">Featured Project</label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/80"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentProject({});
              }}
              className="bg-transparent border border-borders text-primary-text px-4 py-2 rounded-lg hover:bg-card-surface"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-card-surface border border-borders rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary-text">{project.title}</h3>
                <p className="text-sm text-secondary-text mt-1">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-primary-blue/10 text-primary-blue px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.featured && (
                  <span className="inline-block mt-2 text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-primary-blue hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
