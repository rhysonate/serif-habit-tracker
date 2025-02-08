import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  emoji: text("emoji").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const habitEntries = pgTable("habit_entries", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id").references(() => habits.id, { onDelete: "cascade" }).notNull(),
  date: date("date").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const habitsRelations = relations(habits, ({ many }) => ({
  entries: many(habitEntries),
}));

export const habitEntriesRelations = relations(habitEntries, ({ one }) => ({
  habit: one(habits, {
    fields: [habitEntries.habitId],
    references: [habits.id],
  }),
}));

// Schema validation
export const insertHabitSchema = createInsertSchema(habits);
export const selectHabitSchema = createSelectSchema(habits);
export const insertHabitEntrySchema = createInsertSchema(habitEntries);
export const selectHabitEntrySchema = createSelectSchema(habitEntries);

// Types
export type InsertHabit = typeof habits.$inferInsert;
export type SelectHabit = typeof habits.$inferSelect;
export type InsertHabitEntry = typeof habitEntries.$inferInsert;
export type SelectHabitEntry = typeof habitEntries.$inferSelect;