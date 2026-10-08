export type AppRole = 'student' | 'admin' | 'moderator';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: AppRole;
  avatar_url?: string;
  created_at: string;
}