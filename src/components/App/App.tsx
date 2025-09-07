import Section from "../Section/Section";
import Container from "../Container/Container";
import { useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface ListProps {
  items: Post[];
  deletePost: (post: number) => void;
}

interface ListItemProps {
  item: Post;
  deletePost: (post: number) => void;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState("");

  const getPostsByQuery = async (query: string) => {
    const singleParamObject = userId !== "" ? { userId } : {};

    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        params: {
          q: query,
          ...singleParamObject,
        },
      }
    );
    setQuery(query);
    setPosts(data);
  };

  const getPostsByUserID = async (userId: string) => {
    const singleParamObject = userId !== "" ? { userId } : {};
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        params: {
          q: query,
          ...singleParamObject,
        },
      }
    );
    setUserId(userId);
    setPosts(data);
  };

  // const addPost = async (newPost) => {
  //   // http request POST, body: newPost
  //   const { data: createdPost } = await axios.post("", newPost);
  //   setPosts((prevPosts) => [...prevPosts, createdPost]);
  // };

  const deletePost = (postId: number) => {
    // http request DELETE, body: newPost
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== Number(postId))
    );
  };

  return (
    <>
      <Section>
        <Container>
          {/* <CreatePostForm addPost={addPost} />  // { title: "", body: "" } */}
          <Form getQuery={getPostsByQuery} />
          <div>QUERY :{query}</div>
          <Filter getUserId={getPostsByUserID} />
          <div>User ID :{userId}</div>
          <List items={posts} deletePost={deletePost} />
        </Container>
      </Section>
    </>
  );
}

const ListItem = ({ item, deletePost }: ListItemProps) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <div>USER ID: {item.userId}</div>
      <button onClick={() => deletePost(item.id)}>DELETE POST</button>
    </div>
  );
};

const List = ({ items, deletePost }: ListProps) => {
  return (
    <ul>
      LIST
      {items.map((item) => (
        <li key={item.id}>
          <ListItem item={item} deletePost={deletePost} />
        </li>
      ))}
    </ul>
  );
};

// q

interface FormProps {
  getQuery: (querty: string) => void;
}

const Form = ({ getQuery }: FormProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.elements.namedItem(
      "query"
    ) as HTMLInputElement;
    const value = input.value;

    getQuery(value);

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      QUERY
      <input type="text" name="query" />
      <button type="submit">SUBMIT</button>
    </form>
  );
};

// userID

interface FilterProps {
  getUserId: (userId: string) => void;
}

const Filter = ({ getUserId }: FilterProps) => {
  const handleSubmit = (formData: FormData) => {
    const userId = formData.get("userId") as string;
    getUserId(userId);
  };

  return (
    <form action={handleSubmit}>
      USER ID
      <input type="text" name="userId" />
      <button>SUBMIT</button>
    </form>
  );
};
