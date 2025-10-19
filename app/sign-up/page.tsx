"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";

import Section from "@/components/Section/Section";
import { UserCredentials } from "@/types/user";
import { registerUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const initialValues: UserCredentials = {
  email: "",
  password: "",
};

export default function SignUp() {
  // 1. register
  // 2. оновлення стану аутентифікації
  // 3. редірект

  const router = useRouter();

  const onSubmit = async (
    values: UserCredentials,
    actions: FormikHelpers<UserCredentials>
  ) => {
    const newUser = await registerUser(values);
    console.log("newUser", newUser);
    actions.resetForm();
    router.push("/profile");
  };

  return (
    <Section>
      <h1>Register page</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form style={{ display: "grid", gap: 12, maxWidth: 300 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" id="email" required />
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
