import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as messageService from "./db/message.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
