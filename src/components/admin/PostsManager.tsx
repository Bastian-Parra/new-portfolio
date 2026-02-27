import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<PostInsert>>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...currentPost,
      slug: currentPost.slug || generateSlug(currentPost.title || ''),
      published_at: currentPost.published ? new Date().toISOString() : null,
    };

    if (currentPost.id) {
      await supabase
        .from('posts')
        .update(postData)
        .eq('id', currentPost.id);
    } else {
      await supabase
        .from('posts')
        .insert([postData as PostInsert]);
    }
    
    setIsEditing(false);
    setCurrentPost({});
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await supabase.from('posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleNew = () => {
    setCurrentPost({
      tags: [],
      published: false,
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-text">Blog Posts</h2>
        <button
          onClick={handleNew}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/80"
        >
          Add New Post
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-card-surface border border-borders rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-primary-text mb-4">
            {currentPost.id ? 'Edit Post' : 'New Post'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Title</label>
              <input
                type="text"
                value={currentPost.title || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Slug</label>
              <input
                type="text"
                value={currentPost.slug || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                placeholder="Auto-generated from title"
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Excerpt</label>
              <textarea
                value={currentPost.excerpt || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">Content (Markdown)</label>
              <textarea
                value={currentPost.content || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text font-mono text-sm"
                rows={15}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={currentPost.cover_image || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, cover_image: e.target.value })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-1">Reading Time (minutes)</label>
                <input
                  type="number"
                  value={currentPost.reading_time || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, reading_time: parseInt(e.target.value) })}
                  className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={currentPost.tags?.join(', ') || ''}
                onChange={(e) => setCurrentPost({ 
                  ...currentPost, 
                  tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full bg-background border border-borders rounded px-3 py-2 text-primary-text"
                placeholder="javascript, web-development, tutorial"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={currentPost.published || false}
                onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-primary-text">Published</label>
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
                setCurrentPost({});
              }}
              className="bg-transparent border border-borders text-primary-text px-4 py-2 rounded-lg hover:bg-card-surface"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-card-surface border border-borders rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary-text">{post.title}</h3>
                <p className="text-sm text-secondary-text mt-1">{post.excerpt}</p>
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-primary-blue/10 text-primary-blue px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-2 text-xs text-secondary-text">
                  <span>Slug: {post.slug}</span>
                  {post.published ? (
                    <span className="text-green-500">Published</span>
                  ) : (
                    <span className="text-yellow-500">Draft</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-primary-blue hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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
