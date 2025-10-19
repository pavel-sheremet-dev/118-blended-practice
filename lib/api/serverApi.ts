import {
  api,
  FetchNotesProps,
  FetchNotesResponse,
  SessionResponse,
} from "@/lib/api/api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const checkSession = async () => {
  const cookiStore = await cookies();

  const response = await api.get<SessionResponse>("auth/session", {
    headers: {
      Cookie: cookiStore.toString(),
    },
  });

  return response;
};

export const getUser = async () => {
  const cookiStore = await cookies();

  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookiStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async ({
  page,
  searchText,
  tag,
}: FetchNotesProps) => {
  const cookiStore = await cookies();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchText,
      page,
      perPage: 12,
      ...(tag !== "" ? { tag } : {}),
    },
    headers: {
      Cookie: cookiStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const cookiStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookiStore.toString(),
    },
  });
  return response.data;
};
