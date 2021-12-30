import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './pokemon.scss';
import logo from './pokemon-logo.png';



export default function Pokemon() {

  const [pokemon, setPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');
  const [pokemonType, setPokemonType] = useState('');
  // const [cardColor, setCardColor] = useState('red');


  


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
        setPokemonType(results.map((res) => res.data.types[0].type.name));
      })

  }, [])

  return (
    <div className="pokemon-component-container">
      
      <img className="logo-style"src={logo} alt="" />

      <div className="search-bar-container">
        <input 
          className="search-bar"
          type="text"
          placeholder="SEARCH POKEMON"
          onChange={event => {setSearchPokemon(event.target.value)}}
        />
      </div> 
      
      <div className="pokemon-list-container">
        
        { pokemon.filter((val) => {
          if (searchPokemon === "") {
            //if input value is empty, return all pokemon.
            return val;
          }else if (val.name.toLowerCase().includes(searchPokemon.toLowerCase())){
            //searches through the list POKEAPI containing any string characters placed in the input field.
            return val;
          } //returning false to avoid .filter() warning.
           return false;
        }).map(p => ( 

          <div className="poke-card-container" key={p.name}>
            <img src={p.sprites.front_default} alt="" />
            <h1>{p.name}</h1>
            <h1>{pokemonType[p.id-1]}</h1>
          </div>
        ))}

        
      </div>

    </div>

    
  )
}
