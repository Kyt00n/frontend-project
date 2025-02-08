import { Comment } from './Comment';

export interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: number;
  imageUrl?: string;
  comments?: Comment[];
  likes?: number[];
}