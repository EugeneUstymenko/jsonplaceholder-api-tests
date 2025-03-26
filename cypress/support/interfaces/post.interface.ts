export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Type for creating a new post (without id)
export type CreatePostRequest = Omit<Post, 'id'>;

// Type for updating a post (all fields are optional)
export type UpdatePostRequest = Partial<Post>;
