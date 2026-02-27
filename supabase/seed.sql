-- Seed data for projects
INSERT INTO projects (title, description, long_description, image_url, technologies, featured, order_index, demo_url, github_url) VALUES
('Portfolio Website', 'A modern portfolio website built with Astro and Supabase', 'A fully responsive portfolio website showcasing projects, blog posts, and professional experience. Built with Astro for optimal performance and Supabase for backend services.', null, ARRAY['Astro', 'TypeScript', 'Tailwind CSS', 'Supabase'], true, 1, 'https://example.com', 'https://github.com/example/portfolio'),
('E-commerce Platform', 'Full-stack e-commerce solution with payment integration', 'A complete e-commerce platform featuring product management, shopping cart, checkout process, and payment integration. Built with modern technologies for scalability and performance.', null, ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], true, 2, 'https://example.com/shop', 'https://github.com/example/ecommerce'),
('Task Management App', 'Collaborative task management tool for teams', 'A real-time collaborative task management application with drag-and-drop functionality, team collaboration features, and progress tracking.', null, ARRAY['Vue.js', 'Firebase', 'Vuetify'], true, 3, 'https://example.com/tasks', 'https://github.com/example/tasks');

-- Seed data for tech_stack
INSERT INTO tech_stack (name, icon, category, order_index, visible) VALUES
('JavaScript', 'tabler:brand-javascript', 'Languages', 1, true),
('TypeScript', 'tabler:brand-typescript', 'Languages', 2, true),
('React', 'tabler:brand-react', 'Frameworks', 3, true),
('Vue.js', 'tabler:brand-vue', 'Frameworks', 4, true),
('Astro', 'tabler:rocket', 'Frameworks', 5, true),
('Node.js', 'tabler:brand-nodejs', 'Backend', 6, true),
('PostgreSQL', 'tabler:database', 'Databases', 7, true),
('Supabase', 'tabler:brand-supabase', 'Backend', 8, true),
('Tailwind CSS', 'tabler:brand-tailwind', 'Styling', 9, true),
('Git', 'tabler:brand-git', 'Tools', 10, true);

-- Seed data for experience
INSERT INTO experience (company, position, description, start_date, end_date, current, location, technologies, order_index) VALUES
('Tech Company', 'Senior Full Stack Developer', 'Led development of multiple web applications using modern JavaScript frameworks. Mentored junior developers and established best practices for code quality and testing.', '2022-01-01', null, true, 'Remote', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], 1),
('Startup Inc', 'Full Stack Developer', 'Developed and maintained web applications using React and Node.js. Implemented RESTful APIs and integrated third-party services.', '2020-06-01', '2021-12-31', false, 'San Francisco, CA', ARRAY['React', 'Express', 'MongoDB'], 2),
('Web Agency', 'Frontend Developer', 'Created responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.', '2019-01-01', '2020-05-31', false, 'New York, NY', ARRAY['HTML', 'CSS', 'JavaScript', 'Vue.js'], 3);

-- Seed data for posts
INSERT INTO posts (title, slug, excerpt, content, published, tags, reading_time, published_at) VALUES
('Getting Started with Astro', 'getting-started-with-astro', 'Learn how to build fast, modern websites with Astro', '# Getting Started with Astro\n\nAstro is a modern static site builder that delivers lightning-fast performance with a modern developer experience.\n\n## Why Astro?\n\n- **Fast by default**: Astro generates static HTML with zero JavaScript by default\n- **Component islands**: Load JavaScript only for interactive components\n- **Framework agnostic**: Use React, Vue, Svelte, or any framework you prefer\n\n## Installation\n\n```bash\nnpm create astro@latest\n```\n\nFollow the prompts to create your first Astro project!', true, ARRAY['Astro', 'Web Development', 'Tutorial'], 5, NOW()),
('Building with Supabase', 'building-with-supabase', 'How to use Supabase as your backend for modern web apps', '# Building with Supabase\n\nSupabase is an open-source Firebase alternative that provides all the backend services you need.\n\n## Features\n\n- **Database**: PostgreSQL database with real-time subscriptions\n- **Authentication**: Built-in auth with multiple providers\n- **Storage**: File storage with CDN\n- **Edge Functions**: Serverless functions\n\n## Getting Started\n\nCreate a new project at [supabase.com](https://supabase.com) and start building!', true, ARRAY['Supabase', 'Backend', 'Database'], 7, NOW());
