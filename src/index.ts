import { eq, lt } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import * as schema from "./schema";

export interface Bindings {
  DB: D1Database;
}

export interface Variables {
  db: DrizzleD1Database<typeof schema>;
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

  .use((ctx, next) => {
    const db = drizzle(ctx.env.DB, { schema });
    ctx.set("db", db);

    return next();
  })
  .post("/generate", async (ctx) => {
    const db = ctx.get("db");

    const token = crypto.randomUUID();
    const key = Math.random().toString(36).substring(2, 12);
    const email = `${key}@${process.env.DOMAIN}`;

    await db.insert(schema.addresses).values({
      token,
      email,
    });

    return ctx.json({ token, email });
  })

  .get("/", async (ctx) => {
    const db = ctx.get("db");
    const auth = ctx.req.header("Authorization");
    const token = auth?.split(" ")[1];

    if (!token) return ctx.json({ error: "Unauthorized" }, 401);

    const address = await db.query.addresses.findFirst({
      where: eq(schema.addresses.token, token),
      with: {
        emails: true,
      },
    });

    if (!address) return ctx.json({ error: "Unauthorized" }, 401);

    if (new Date().getTime() - address.createdAt.getTime() > 3600000) {
      await db
        .delete(schema.addresses)
        .where(eq(schema.addresses.email, address.email));

      return ctx.json({ error: "Email expired", expired: true }, 401);
    }

    return ctx.json({
      ...address,
      token: undefined,
    });
  })

  .post("/cleanup", async (ctx) => {
    const db = ctx.get("db");
    const auth = ctx.req.header("Authorization");
    const token = auth?.split(" ")[1];

    if (!token || token !== process.env.ADMIN_TOKEN)
      return ctx.json({ error: "Unauthorized" }, 401);

    await db
      .delete(schema.addresses)
      .where(
        lt(schema.addresses.createdAt, new Date(new Date().getTime() - 3600000))
      );

    return ctx.json({ success: true });
  });

export type App = typeof app;
export default {
  fetch: app.fetch,
  async email(message: ForwardableEmailMessage, env: Bindings) {
    const db = drizzle(env.DB, { schema });
    const address = await db.query.addresses.findFirst({
      where: eq(schema.addresses.email, message.to),
    });

    if (!address) return;

    const raw: ReadableStream<Uint8Array> = message.raw;

    const reader = raw.getReader();
    let decoder = new TextDecoder();
    let buffer = "";
    let done = false;

    while (!done) {
      const { value, done: done_ } = await reader.read();
      if (value) {
        buffer += decoder.decode(value, { stream: true });
      }
      done = done_;
    }

    buffer += decoder.decode();

    await db.insert(schema.emails).values({
      emailKey: address.email,
      title: message.headers.get("subject") ?? "No subject",
      body: buffer,
    });
  },
};
