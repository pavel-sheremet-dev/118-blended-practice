import axios from "axios";
import { NewPost, Post } from "../types/post";

axios.defaults.baseURL = "https://dummyjson.com";

interface FetchPostsResponseData {
  limit: number;
  posts: Post[];
  skip: number;
  total: number;
}

const PER_PAGE = 10;

export const fetchPosts = async (searchText: string, page: number) => {
  const { data } = await axios.get<FetchPostsResponseData>("/posts/search", {
    params: {
      q: searchText,
      limit: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    },
  });

  const totalPages = Math.ceil(data.total / PER_PAGE);

  return {
    ...data,
    totalPages,
  };
};

export const createPost = async (newPost: NewPost) => {
  const { data } = await axios.post<Post>("/posts/add", { userId: 1, ...newPost });
  return data;
};

// export const editPost = async (newDataPost) => {};

export const deletePost = async (postId: number) => {
  const { data } = await axios.delete<Post>(`/posts/${postId}`);
  return data;
};
