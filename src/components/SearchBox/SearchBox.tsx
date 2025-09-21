import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (q: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="Search posts"
    />
  );
}
