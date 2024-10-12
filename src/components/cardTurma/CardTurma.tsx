import React, { useEffect, useState } from "react";
import { Aula } from "../models/Aula";
import { Usuario } from "../models/Usuario";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";
import "./CardTurma.css";

const retornarDadosUsuario = async (id: number) => {
  if (id === undefined) return {};
  const data = await fetch(`http://localhost:8080/usuario/${id}`);
  const usuario = await data.json();
  return usuario;
};

const retornarTurma = async (id: number) => {
  if (id === undefined) return {};
  const data = await fetch(`http://localhost:8080/aula/${id}`);
  const turma = await data.json();
  return turma;
};

const retornarTarefas = async (id: number) => {
  if (id === undefined) return {};
  const data = await fetch(`http://localhost:8080/tarefas/${id}`);
  const tarefas = await data.json();
  return tarefas;
};

interface CardTurmaProps {
  id: number;
}

const CardTurma: React.FC<CardTurmaProps> = ({ id }) => {
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aulaData = await retornarTurma(id);
        const professor = await retornarDadosUsuario(aulaData.professor_id);
        const tarefas = await retornarTarefas(id);

        aulaData.professor = professor as Usuario;
        aulaData.tarefas = tarefas;

        setAula(aulaData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!aula) {
    return <div>Erro ao carregar os dados da aula</div>;
  }

  const {
    conteudo: description,
    titulo: title,
    professor,
    link_img_fundo: image_fundo,
  } = aula;
  const nomeProfessor = professor?.nome ?? "";
  const image = professor?.link_img ?? "";

  return (
    <div className="card" key={id}>
      <CardHeader
        title={title}
        description={description}
        nomeProfessor={nomeProfessor}
        image={image}
        image_fundo={image_fundo}
      />
      <CardBody tarefas={aula.tarefas ?? []} />
      <CardFooter title={title} description={description} />
    </div>
  );
};

export default CardTurma;
