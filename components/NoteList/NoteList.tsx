import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";

import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.text}>
            <h3 className={css.title}>{note.title}</h3>
            <p>{note.content}</p>
          </div>

          <button
            type="button"
            className={css.button}
            onClick={() => deleteMutation.mutate(note.id)}
          >
            {deleteMutation.isPending && deleteMutation.variables === note.id
              ? "Deleting"
              : "Delete"}
          </button>
          <Link className={css.button} href={`/notes/${note.id}`}>
            Details
          </Link>
        </li>
      ))}
    </ul>
  );
}
