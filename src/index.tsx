import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import * as pokeService from "./api/pokeapi/api.js";
import * as messageService from "./db/message.js";
import { Index, PokemonDetails } from "./pages/index.js";

const app = new Hono();

app.get("/", (c) => {
  return c.html(<Index />);
});

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
