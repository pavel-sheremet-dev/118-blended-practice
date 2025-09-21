import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["posts"],
    // mutationFn: (id: number) => deletePost(id),
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return (
    <ul className={css.list}>
      {/* список постів, кожен з яких створює наступну розмітку */}
      {posts.map((post) => (
        <li className={css.listItem} key={post.id}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit}>Edit</button>
            <button className={css.delete} onClick={() => mutate(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
