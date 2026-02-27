import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type TechStack = Database['public']['Tables']['tech_stack']['Row'];
type TechStackInsert = Database['public']['Tables']['tech_stack']['Insert'];

export default function TechStackManager() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTech, setCurrentTech] = useState<Partial<TechStackInsert>>({});

  useEffect(() => {
    fetchTechStack();
  }, []);

  const fetchTechStack = async () => {
    const { data } = await supabase
      .from('tech_stack')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setTechStack(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentTech.id) {
      await supabase
        .from('tech_stack')
        .update(currentTech)
        .eq('id', currentTech.id);
    } else {
      await supabase
        .from('tech_stack')
        .insert([currentTech as TechStackInsert]);
    }
    
    setIsEditing(false);
    setCurrentTech({});
    fetchTechStack();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      await supabase.from('tech_stack').delete().eq('id', id);
      fetchTechStack();
    }
  };

  const handleEdit = (tech: TechStack) => {
    setCurrentTech(tech);
    setIsEditing(true);
  };

  const handleNew = () => {
    setCurrentTech({
      visible: true,
      order_index: 0,
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-text">Tech Stack</h2>
        <button
          onClick={handleNew}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/80"
        >
          Add New Technology
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-card-surface border border-borders rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-primary-text mb-4">
            {currentTech.id ? 'Edit Technology' : 'New Technology'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Name</label>
              <input
                type="text"
                value={currentTech.name || ''}
                onChange={(e) => setCurrentTech({ ...currentTech, name: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">
                Icon Name (from astro-icon)
              </label>
              <input
                type="text"
                value={currentTech.icon || ''}
                onChange={(e) => setCurrentTech({ ...currentTech, icon: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                placeholder="tabler:brand-react"
                required
              />
              <p className="text-xs text-secondary-text mt-1">
                Use format: iconset:icon-name (e.g., tabler:brand-react, mdi:nodejs)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Category</label>
                <input
                  type="text"
                  value={currentTech.category || ''}
                  onChange={(e) => setCurrentTech({ ...currentTech, category: e.target.value })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                  placeholder="Frontend, Backend, Database, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Order Index</label>
                <input
                  type="number"
                  value={currentTech.order_index || 0}
                  onChange={(e) => setCurrentTech({ ...currentTech, order_index: parseInt(e.target.value) })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={currentTech.visible !== false}
                onChange={(e) => setCurrentTech({ ...currentTech, visible: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-primary-text">Visible</label>
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
                setCurrentTech({});
              }}
              className="bg-transparent border border-borders text-primary-text px-4 py-2 rounded-lg hover:bg-card-surface"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {techStack.map((tech) => (
          <div key={tech.id} className="bg-card-surface border border-borders rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-primary-text">{tech.name}</h3>
              {!tech.visible && (
                <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">
                  Hidden
                </span>
              )}
            </div>
            <p className="text-xs text-secondary-text mb-3">Icon: {tech.icon}</p>
            {tech.category && (
              <p className="text-xs text-secondary-text mb-3">Category: {tech.category}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(tech)}
                className="text-primary-blue hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tech.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
