import axios from "axios";
import { Note, NewNote, Tag } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  searchText: string;
  page: number;
  tag: "" | Tag;
}

export const fetchNotes = async ({
  page,
  searchText,
  tag,
}: FetchNotesProps) => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchText,
      page,
      perPage: 12,
      ...(tag !== "" ? { tag } : {}),
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
};
