import { useEffect, useState, ChangeEvent } from "react";
import { PokeCard } from "./Components/PokeCard";
import './style.css'
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  category: string;
  image_url: string;
  created_at?: string;
  background_image_url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("https://dev-api-teste.mandarin.com.br/pokemons")
      .then((response) => {
        setPokemons(response.data);
      });
  }, []);

  useEffect(() => {
    if (!pokemon) {
      setPokemon(pokemons[0]);
    }
  }, [pokemon, pokemons]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filterSuggestions = pokemons.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(inputValue.toLocaleLowerCase())
  );

  const handleChoosePokemon = (suggestion: Pokemon) => {
    setPokemon(suggestion);
    setInputValue(suggestion.name);
  };

  if (!pokemon) {
    return <></>;
  }

  const { category, image_url, name, background_image_url }: Pokemon = pokemon;

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Escreva o nome do Pokemon"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue.length > 0 && (      
      <ul>
        {filterSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleChoosePokemon(suggestion)}
            >
              {suggestion.name}

            </li>
          ))}
      </ul>)}
      <PokeCard
        backgroundImage={background_image_url}
        img={image_url}
        pokemonName={name}
        pokemonType={`${category} type Pokemon`} 
      />
    </div>
  );
}

export default App;
