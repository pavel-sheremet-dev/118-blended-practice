import { Metadata } from "next";
import Section from "@/components/Section/Section";

export const metadata: Metadata = {
  title: "BC-76 | Home Page",
  description: "Home Page Description",
};

export default function HomePage() {
  return (
    <Section>
      <h1>Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias non
        architecto nemo soluta voluptatum quis itaque error vero, voluptates
        iure.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        saepe qui rem quisquam quas beatae eos fugit ducimus possimus magnam
        dolorem, odit tenetur, ratione cupiditate laboriosam animi, id ea ullam.
      </p>
    </Section>
  );
}
