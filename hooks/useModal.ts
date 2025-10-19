import { useState } from "react";

export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, toggleModal];
};
