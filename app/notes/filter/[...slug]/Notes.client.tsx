"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

import { useParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Tag } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const tag = slug[0] === "All" ? "" : (slug[0] as Tag);

  const onChangeQuery = useDebouncedCallback((query) => {
    setQuery(query);
    setPage(1);
  }, 500);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () =>
      fetchNotes({
        searchText: query,
        page,
        tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <>
      <input onChange={(e) => onChangeQuery(e.target.value)} />
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isError && <div>OOOPS</div>}
    </>
  );
}
