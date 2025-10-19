import {
  api,
  FetchNotesProps,
  FetchNotesResponse,
  SessionResponse,
} from "@/lib/api/api";
import { NewNote, Note } from "@/types/note";
import { User, UserCredentials } from "@/types/user";

export const registerUser = async (userCredentials: UserCredentials) => {
  const { data } = await api.post<User>("/auth/register", userCredentials);

  return data;
};

export const loginUser = async (userCredentials: UserCredentials) => {
  const { data } = await api.post<User>("/auth/login", userCredentials);

  return data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get<SessionResponse>("auth/session");

  return data.success;
};

export const getUser = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const fetchNotes = async ({
  page,
  searchText,
  tag,
}: FetchNotesProps) => {
  const response = await api.get<FetchNotesResponse>("/notes", {
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
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};
