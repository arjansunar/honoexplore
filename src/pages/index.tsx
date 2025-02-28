import type { FC } from "hono/jsx";
import type { Pokemon } from "../api/pokeapi/index.js";
import { Layout } from "../components/index.js";

export const Index = () => {
  return (
    <div>
      <h1>Add message</h1>
      <form>
        <input type="text" name="content" id="content" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export const PokemonDetails: FC<{ pokemon: Pokemon }> = (props) => {
  return (
    <Layout>
      <h1>Hello {props.pokemon.name}</h1>
      <ul>
        {props.pokemon.abilities.map((ability) => {
          return (
            <li>
              <span> Slot {ability.slot}</span>
              <span> Ability2 {ability.ability.name}</span>
            </li>
          );
        })}
      </ul>
      <h3> Images</h3>
      <img src={props.pokemon.sprites.front_default} />
    </Layout>
  );
};
