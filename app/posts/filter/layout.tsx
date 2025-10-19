import css from './layout.module.css';

type LayoutPostsProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function LayoutPosts({ children, sidebar }: LayoutPostsProps) {
  return (
    <main className={css.container}>
      <div className={css.postsWrapper}>
        <aside>{sidebar}</aside>
        {children}
      </div>
    </main>
  );
}
