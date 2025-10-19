"use client";

import Section from "@/components/Section/Section";

export default function EditProfileClient() {
  // 1. оновлення юзеру
  // 2. оновлення стану юзера
  // 3. перенаправлення на сторінку профілю

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;

    console.log("username", username);
  };

  return (
    <Section>
      <h1>Edit Profile Page</h1>
      <form
        action={handleSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 300 }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={"Current user name"}
          />
        </div>

        <p>Email: user@email.com</p>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </Section>
  );
}
