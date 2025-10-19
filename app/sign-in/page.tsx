"use client";

import Section from "@/components/Section/Section";
import { Field, Form, Formik } from "formik";

export default function SignIn() {
  // 1. login
  // 2. оновлення стану аутентифікації
  // 3. редірект (profile)

  return (
    <Section>
      <h1>Login Page</h1>
      <Formik initialValues={{}} onSubmit={() => {}}>
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
