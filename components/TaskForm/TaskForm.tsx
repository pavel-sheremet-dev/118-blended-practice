"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TaskForm.module.css";
import type { NewTask } from "@/types/task";
import { createNewTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Draft, useDraftStore } from "@/lib/store/draftStore";

// interface TaskFormProps {
//   onClose?: () => void;
// }

export default function TaskForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const draft = useDraftStore((state) => state.draft);
  // const setDraft = useDraftStore((state) => state.setDraft);

  const { draft, setDraft, clearDraft } = useDraftStore();

  const mutation = useMutation({
    mutationFn: (newTask: NewTask) => createNewTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      clearDraft();
      router.push(`/tasks`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const newTask: NewTask = {
      text: formData.get("text") as string,
    };

    mutation.mutate(newTask);
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const updatedDraft: Draft = {
      ...draft,
      [e.target.name]: e.target.value,
    };

    setDraft(updatedDraft);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Task text
        <textarea
          defaultValue={draft.text}
          onChange={onChange}
          name="text"
          className={css.input}
          rows={5}
        ></textarea>
      </label>

      <button type="submit" className={css.button}>
        {mutation.isPending ? "Creating new task" : "Create"}
      </button>
    </form>
  );
}
