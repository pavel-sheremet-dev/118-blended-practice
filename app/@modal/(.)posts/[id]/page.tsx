import { fetchPostById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostPreviewClient from './PostPreview.client';

interface PostPreviewProps {
  params: Promise<{ id: string }>;
}

export default async function PostPreview({ params }: PostPreviewProps) {
  const queryClient = new QueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
