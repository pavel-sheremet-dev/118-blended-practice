"use client";
import { useRouter } from "next/navigation";

import Section from "@/components/Section/Section";
import { loginUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { UserCredentials } from "@/types/user";
import { Field, Form, Formik, FormikHelpers } from "formik";

const initialValues: UserCredentials = {
  email: "",
  password: "",
};

export default function SignIn() {
  // 1. login
  // 2. оновлення стану аутентифікації
  // 3. редірект (profile)

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (
    values: UserCredentials,
    actions: FormikHelpers<UserCredentials>
  ) => {
    const user = await loginUser(values);
    setUser(user);
    actions.resetForm();
    router.push("/profile");
  };

  return (
    <Section>
      <h1>Login Page</h1>
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
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </Section>
  );
}
