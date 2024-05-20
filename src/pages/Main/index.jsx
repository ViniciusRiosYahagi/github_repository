import { useCallback, useState } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";
import api from "../../services/api";

const Main = () => {
  const [newRepo, SetNewRepo] = useState("");
  const [repositorys, setRepositorys] = useState([]);

  const handleSubmit = useCallback((e) => {
    async function submit() {
      e.preventDefault();

      const response = await api.get(`repos/${newRepo}`);
      const data = { name: response.data.full_name };

      setRepositorys([...repositorys, data]);
      SetNewRepo("");
    }

		submit()

  }, [newRepo, repositorys]);

  function handleInputChange(e) {
    SetNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={30} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Main;
