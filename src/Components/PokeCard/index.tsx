import './style.css';

interface PokeCardProps {
  img: string;
  backgroundImage: string;
  pokemonName: string;
  pokemonType: string;
}

export const PokeCard = ({
  img,
  backgroundImage,
  pokemonName,
  pokemonType,
}: PokeCardProps) => {
  return (
    <div className="poke-card">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img src={img} alt={pokemonName} />
      </div>
      <div className='poke-card-text'>
        <span>{pokemonName}</span>
        <p>{pokemonType}</p>
        <div className='poke-card-text-button'>
          <button>ATTACK</button>
          <button>RUN AWAY</button>
        </div>
      </div>
    </div>
  );
};
