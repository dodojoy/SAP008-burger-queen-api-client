import React from "react";
import { menu } from "../../contexts/api";

export const Salon = () => {
  menu()
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => error);
  return (
    <div>Salon</div>
  );
}

