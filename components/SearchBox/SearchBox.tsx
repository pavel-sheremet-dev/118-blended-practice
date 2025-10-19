"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <label>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className={css.searchInput}
      />
    </label>
  );
}
