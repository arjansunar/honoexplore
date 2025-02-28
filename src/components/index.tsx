import type { FC } from "hono/jsx";
import type { Pokemon } from "../api/pokeapi/index.js";

export const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};
