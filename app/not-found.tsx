import Section from "@/components/Section/Section";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Section>
      <h1>Not Found Page</h1>
      <Link href="/">Go home</Link>
    </Section>
  );
};

export default NotFoundPage;
