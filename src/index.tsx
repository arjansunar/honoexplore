import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as messageService from "./db/message.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as pokeService from "./api/pokeapi/api.js";
import type { Pokemon } from "./api/pokeapi/index.js";
import type { FC } from "hono/jsx";

const app = new Hono();

app.post(
  "/message",
  zValidator(
    "json",
    z.object({
      content: z.string().min(4),
    }),
  ),
  async (c) => {
    const data = c.req.valid("json");
    const res = await messageService.addMessage(data.content);
    return c.json(res, 201);
  },
);

app.get("/message", async (c) => {
  return c.json(await messageService.getAllMessage());
});

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

const PokemonDetails: FC<{ pokemon: Pokemon }> = (props) => {
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

app.get("poke/find/:name", async (c) => {
  const name = c.req.param("name");
  const pokemon = await pokeService.fetchPokemon(name);
  return c.html(<PokemonDetails pokemon={pokemon} />);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
