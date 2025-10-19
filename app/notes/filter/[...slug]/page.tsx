import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Section from "@/components/Section/Section";
import NotesClient from "./Notes.client";

import { Tag } from "@/types/note";
import { fetchNotes } from "@/lib/api";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const tag = slug[0] === "All" ? "" : (slug[0] as Tag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes({ searchText: "", page: 1, tag }),
  });

  return (
    <Section>
      <h1>Notes Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </Section>
  );
}
