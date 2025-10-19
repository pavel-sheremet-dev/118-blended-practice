import { Note, Tag } from "@/types/note";
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export interface FetchNotesProps {
  searchText: string;
  page: number;
  tag: "" | Tag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface SessionResponse {
  success: boolean;
}
