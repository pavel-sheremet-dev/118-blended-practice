"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClickBack = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleClickBack}>Back</button>
      {note && <div>{JSON.stringify(note)}</div>}
    </div>
  );
};

export default NoteDetailsClient;
