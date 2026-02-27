export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string | null
          image_url: string | null
          demo_url: string | null
          github_url: string | null
          technologies: string[]
          featured: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          long_description?: string | null
          image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          technologies?: string[]
          featured?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          long_description?: string | null
          image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          technologies?: string[]
          featured?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image: string | null
          published: boolean
          tags: string[]
          reading_time: number | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          cover_image?: string | null
          published?: boolean
          tags?: string[]
          reading_time?: number | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          cover_image?: string | null
          published?: boolean
          tags?: string[]
          reading_time?: number | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      experience: {
        Row: {
          id: string
          company: string
          position: string
          description: string | null
          start_date: string
          end_date: string | null
          current: boolean
          location: string | null
          technologies: string[]
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company: string
          position: string
          description?: string | null
          start_date: string
          end_date?: string | null
          current?: boolean
          location?: string | null
          technologies?: string[]
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company?: string
          position?: string
          description?: string | null
          start_date?: string
          end_date?: string | null
          current?: boolean
          location?: string | null
          technologies?: string[]
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      tech_stack: {
        Row: {
          id: string
          name: string
          icon: string
          category: string | null
          order_index: number
          visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          category?: string | null
          order_index?: number
          visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          category?: string | null
          order_index?: number
          visible?: boolean
          created_at?: string
        }
      }
    }
  }
}
