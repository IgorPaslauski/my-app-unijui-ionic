import React, { useState, useEffect } from "react";
import { Nav } from "../entities/nav";
import { Aula } from "../models/Aula";
import "./MenuTurma.css";

const retornarDadosTurma = async (id: number) => {
  const data = await fetch("http://192.168.137.1:8080/aula/" + id);
  const aula = await data.json();
  return aula;
};

interface MenuTurmaProps {
  nav: Nav;
}

const MenuTurma: React.FC<MenuTurmaProps> = ({ nav }) => {
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAula = async () => {
      try {
        const aulaData = await retornarDadosTurma(nav.TurmaId);
        setAula(aulaData);
      } catch (error) {
        console.error("Erro ao buscar os dados da turma:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAula();
  }, [nav.TurmaId]);

  if (loading) {
    return <li className="nav-turma">Carregando...</li>;
  }

  if (!aula) {
    return <li className="nav-turma">Erro ao carregar a turma</li>;
  }

  const primeiraLetra = aula.titulo.charAt(0).toUpperCase();

  return (
    <li className="nav-turma">
      <div
        className="nav-turma-cor"
        style={{ backgroundColor: aula.cor_fundo_nav }}
      >
        {primeiraLetra}
      </div>
      <div className="dotted">
        <div className="nav-turma-label dotted">{aula.titulo}</div>
        <div className="nav-turma-description dotted">{aula.conteudo}</div>
      </div>
    </li>
  );
};

export default MenuTurma;
