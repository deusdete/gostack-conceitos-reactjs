import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    api.post('/repositories', {
      "title": `Umbriel ${Date.now()}`,
      "url": "https://github.com/Rocketseat/umbriel",
      "techs": ["Node", "Express", "TypeScript"]
    }).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      console.log(response.data)
    })

    const rep = repositories.filter(element => element.id !== id);
    setRepositories(rep)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, key) => (
          
          <li key={key}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
