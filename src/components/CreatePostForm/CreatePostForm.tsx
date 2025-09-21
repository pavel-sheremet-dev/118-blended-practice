// import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { NewPost } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";

const initalValues: NewPost = {
  title: "",
  body: "",
};

interface CreatePostFormProps {
  onClose: () => void;
}

export default function CreatePostForm({ onClose }: CreatePostFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      onClose();
    },
  });

  const onSubmit = (values: NewPost, actions: FormikHelpers<NewPost>) => {
    createMutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initalValues}
      onSubmit={onSubmit}
      // validationSchema={{}}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={createMutation.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
