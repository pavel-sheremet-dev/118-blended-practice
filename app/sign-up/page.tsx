"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";

import Section from "@/components/Section/Section";

interface AuthUserData {
  email: string;
  password: string;
}

const initialValues: AuthUserData = {
  email: "",
  password: "",
};

export default function SignUp() {
  // 1. register
  // 2. оновлення стану аутентифікації
  // 3. редірект

  const onSubmit = async (
    values: AuthUserData,
    actions: FormikHelpers<AuthUserData>
  ) => {
    console.log("values", values);
    actions.resetForm();
  };

  return (
    <Section>
      <h1>Register page</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form style={{ display: "grid", gap: 12, maxWidth: 300 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" required />
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" required />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>
    </Section>
  );
}
