import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const addresses = sqliteTable("addresses", {
  email: text("email").notNull().primaryKey(),
  token: text("token").notNull(),
  createdAt: integer("timestamp", { mode: "timestamp" }).notNull(),
});

export const addressesRelations = relations(addresses, ({ many }) => ({
  emails: many(emails),
}));

export const emails = sqliteTable("emails", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  emailKey: text("email")
    .references(() => addresses.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  createdAt: integer("timestamp", { mode: "timestamp" }).notNull(),
  sender: text("sender").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
});

export const emailsRelations = relations(emails, ({ one }) => ({
  email: one(addresses, {
    fields: [emails.emailKey],
    references: [addresses.email],
  }),
}));
