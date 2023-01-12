import React from "react";
import '../salon/salon.css';
import { HeaderSalon } from "../../components/header";
import { userName } from "../../contexts/api";
import { useNavigate } from 'react-router-dom';

export const Kitchen = () => {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login');
  }

  return (
    <section className="menu">
      <HeaderSalon role={'Cozinheiro(a)'} nameRole={userName()} handleOnClick={handleLogout}></HeaderSalon>
    </section>
  );
}
