import { Post, PostCreationDto } from "@/types/post.types";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import * as PostService from "@/services/post.service";
export interface IPostContext {
  allPosts: Post[];
  allPostsLoading: boolean;
  postCreationError: string | undefined;
  clearErrors: () => void;
  createPost: (dto: PostCreationDto) => Promise<boolean>;
}

const PostContext = React.createContext<IPostContext | null>(null);
export const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [postCreationError, setPostCreationError] = useState<string | undefined>();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allPostsLoading, setAllPostsLoading] = useState(false);
  useEffect(() => {
    // user is logged in, fetch posts
    if (user && allPosts.length < 1) {
      const fetchPosts = async () => {
        setAllPostsLoading(true);
        try {
          const posts = await PostService.getPosts();
          setAllPosts(posts);
        } catch (e) {
        } finally {
          setAllPostsLoading(false);
        }
      };
      fetchPosts();
    }
  }, [user]);
  const clearErrors = () => setPostCreationError(undefined);

  const createPost = async (dto: PostCreationDto) => {
    try {
      setAllPostsLoading(true);
      const newPost = await PostService.newPost(dto);
      if (newPost) {
        setAllPosts([...allPosts, newPost]);
        return true;
      } else {
        throw new Error("Could not upload post, please try again later");
      }
    } catch (e: any) {
      if (typeof e === "string") {
        setPostCreationError(e);
      } else setPostCreationError(e.message);
    } finally {
      setAllPostsLoading(false);
    }
    return false;
  };

  return (
    <PostContext.Provider
      value={{
        createPost,
        clearErrors,
        postCreationError,
        allPosts,
        allPostsLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error("usePosts used outside of PostContextProvider");
  }
  return context;
};
