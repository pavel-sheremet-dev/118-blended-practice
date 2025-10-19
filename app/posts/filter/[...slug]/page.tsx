// import { fetchPosts } from '@/lib/api';

import { fetchPosts } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;

  const searchText = '';
  const page = 1;
  const userId = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', searchText, page, userId],
    queryFn: () => fetchPosts({ page, searchText, ...(userId !== 'All' ? { userId } : {}) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient />
    </HydrationBoundary>
  );
}
