export interface CreatePostHandler {
  userId: number;
  photo: string;
  subtitle: string;
}

export interface UpdatePostHandler {
  userId: number;
  postId: number;
  photo?: string;
  subtitle?: string;
}
export interface DeletePostHandler {
  userId: number;
  postId: number;
}