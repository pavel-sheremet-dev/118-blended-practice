import Link from "next/link";
import Section from "@/components/Section/Section";
import { getUser } from "@/lib/api/serverApi";

export default async function Profile() {
  // 1. запит за юзером і рендер
  // 2. рендер користувача
  // 3. Редагування.

  const user = await getUser();

  return (
    <>
      <Section>
        <h1>Profile Page</h1>
        <p>{user.email}</p>
        <Link href="/profile/edit">Edit</Link>
      </Section>
    </>
  );
}
