import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './pokemon.scss';

export default function Pokemon() {

  const [pokemon, setPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');
  


  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")

      .then((res) => {
        return res.data.results;
      })

      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })

      .then((results) => {
        setPokemon(results.map((res) => res.data));
      });


  }, [])

  console.log(searchPokemon);

  return (
    <div className="pokemon-list-container">
      <input 
        type="text"
        placeholder="Search Pokemon"
        onChange={event => {setSearchPokemon(event.target.value)}}
      />

        {pokemon.filter((val) => {
          if (searchPokemon === "") {
            //if input value is empty, return all pokemon.
            return val;
          }else if (val.name.toLowerCase().includes(searchPokemon.toLowerCase())){
            //searches through list of pokemon containing string characters (all lowercase).
            return val;
          } //returning false to avoid .filter() warning.
           return false;
        }).map(p => ( 
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
