import Section from "@/components/Section/Section";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Section>
      <h1>Note Details Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </Section>
  );
}
