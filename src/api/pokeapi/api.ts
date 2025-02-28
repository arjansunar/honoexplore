import type { Pokemon } from "./index.js";

const baseURL = process.env.POKEAPI!;

export async function fetchPokemon(name: string) {
  const res = await fetch(`${baseURL}/pokemon/${name}`);
  return (await res.json()) as Pokemon;
}
