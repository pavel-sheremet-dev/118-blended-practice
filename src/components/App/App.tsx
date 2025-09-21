import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { fetchPosts } from "../../services/postService";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

export default function App() {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [totalPages, setTotalPages] = useState(0);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
  }, 1000);

  const changePage = (page: number) => {
    setPage(page);
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["posts", query, page],
    queryFn: () => fetchPosts(query, page),
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       setIsError(false);
  //       const results = await fetchPosts(query, page);
  //       setPosts(results.posts);
  //       setTotalPages(results.totalPages);
  //     } catch (error) {
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [page, query]);

  const onModalClose = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={changeQuery} />

        <Pagination
          currentPage={page}
          totalPages={data?.totalPages ?? 1}
          onPageChange={changePage}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create post
        </button>
      </header>
      {isLoading && <div>...loading</div>}
      {isModalOpen && (
        <Modal>
          <CreatePostForm onClose={onModalClose} />
        </Modal>
      )}
      {isSuccess && data.posts.length > 0 && <PostList posts={data.posts} />}

      <div>
        {/* <Section
        title="About us"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis quasi error explicabo
          ad corrupti, veniam recusandae, culpa, reiciendis quod incidunt fuga quos ut reprehenderit
          consequuntur rerum ea eos a aliquam?"
      />
      <Section title="Contat us">
        <form>
          <label>
            EMAIL
            <input type="text" />
          </label>
          <label>
            Message
            <textarea />
          </label>
        </form>
      </Section>
      <Section
        title="Advantages"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
      >
        <ul>
          <li>POINT 1</li>
          <li>POINT 2</li>
          <li>POINT 3</li>
        </ul>
      </Section> */}
      </div>
    </div>
  );
}

// interface SectionProps {
//   title: string;
//   description?: string;
//   children?: React.ReactNode;
// }

// const Section = ({ title, description, children }: SectionProps) => {
//   return (
//     <section>
//       <div>
//         <h2>{title}</h2>
//         <hr />
//         {description && <p>{description}</p>}
//         {children && <div>{children}</div>}
//       </div>
//     </section>
//   );
// };
