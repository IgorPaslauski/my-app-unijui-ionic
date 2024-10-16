import React, { useState, useEffect } from "react";
import { Aula } from "./models/Aula";
import CardTurma from "./cardTurma/CardTurma";

const ListaCardTurma: React.FC = () => {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://igorpaslauski.github.io/portifolio/data/aulas.json"
        );
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }

        const aulasJson = await data.json();

        // Simula 3 segundos de carregamento
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setAulas(aulasJson);
      } catch (error) {
        alert("Erro ao buscar as aulas," + error);
        console.error("Erro ao buscar as aulas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="card-container">
      {aulas.map((aula: Aula) => (
        <CardTurma key={aula.id} id={aula.id} />
      ))}
    </div>
  );
};

export default ListaCardTurma;
