import { useCallback, useEffect, useState } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Main = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repositorys, setRepositorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Buscar dados salvos em localStorage
  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");
    
    if (repoStorage) {
      setRepositorys(JSON.parse(repoStorage));
    }
  }, []);

  // Salvar alterações em localStorage
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorys));
  }, [repositorys]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);
        try {
          if (newRepo === "") {
            throw new Error("Digite um Repositorio");
          }

          const response = await api.get(`repos/${newRepo}`);
          const data = { name: response.data.full_name };
          const hasRepo = repositorys.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositorio ja Selecionado");
          }

          setRepositorys([...repositorys, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorys]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorys.filter((r) => r.name !== repo);
      setRepositorys(find);
    },
    [repositorys]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={30} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorys.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`repository/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
