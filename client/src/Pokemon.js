import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './pokemon.scss';

export default function Pokemon() {

  const [pokemon, setPokemon] = useState([]);
  // const [pokeSprite, setPokeSprites] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })
      .then((results) => {
        setPokemon(results.map((res) => res.data));
        console.log(results);
      });

  }, [])


  return (
    <div className="pokemon-list-container">
        {pokemon.map(p => (
          <div className="pokemon-list-container" key={p.name}>
            <div className="poke-card-container">
              <img src={p.sprites.front_default} alt="" />
              <h1>{p.name}</h1>
            </div>
          </div>
        ))}
    </div>
  )
}
