import { useCallback, useState } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

const Main = () => {
  const [newRepo, SetNewRepo] = useState("");
  const [repositorys, setRepositorys] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true)

      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = { name: response.data.full_name };
      } 
      catch(error) {
        console.log(error)
      } 
      finally {
        setLoading(false)
      }
      

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
        <SubmitButton loading={loading ? 1 : 0}>
          {
            loading ? (
              <FaSpinner color="#fff" size={14}/>
             ) :  (
              <FaPlus color="#fff" size={14} />
             )
          }
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Main;
