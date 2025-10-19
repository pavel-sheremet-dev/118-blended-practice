import Link from "next/link";
import Section from "@/components/Section/Section";

export default async function Profile() {
  // 1. запит за юзером і рендер
  // 2. рендер користувача
  // 3. Редагування

  return (
    <>
      <Section>
        <h1>Profile Page</h1>
        <Link href="/profile/edit">Edit</Link>
      </Section>
    </>
  );
}
