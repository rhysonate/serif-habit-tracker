import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { habits, habitEntries } from "@db/schema";
import { eq, and } from "drizzle-orm";
import { format, parseISO } from "date-fns";

export function registerRoutes(app: Express): Server {
  // Get all habits with their entries
  app.get("/api/habits", async (_req, res) => {
    try {
      const habitsData = await db.query.habits.findMany({
        with: {
          entries: true,
        },
      });
      res.json(habitsData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch habits" });
    }
  });

  // Create a new habit
  app.post("/api/habits", async (req, res) => {
    try {
      const { name, emoji } = req.body;
      const [habit] = await db.insert(habits).values({
        name,
        emoji,
      }).returning();
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ error: "Failed to create habit" });
    }
  });

  // Toggle habit entry for a specific date
  app.post("/api/habits/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const { date } = req.body;
      const parsedDate = parseISO(date);

      // Check if entry exists
      const existingEntry = await db.query.habitEntries.findFirst({
        where: and(
          eq(habitEntries.habitId, parseInt(id)),
          eq(habitEntries.date, parsedDate)
        ),
      });

      if (existingEntry) {
        // Toggle existing entry
        const [updated] = await db
          .update(habitEntries)
          .set({ completed: !existingEntry.completed })
          .where(eq(habitEntries.id, existingEntry.id))
          .returning();
        res.json(updated);
      } else {
        // Create new entry
        const [entry] = await db
          .insert(habitEntries)
          .values({
            habitId: parseInt(id),
            date: parsedDate,
            completed: true,
          })
          .returning();
        res.json(entry);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle habit entry" });
    }
  });

  // Delete a habit
  app.delete("/api/habits/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(habitEntries).where(eq(habitEntries.habitId, parseInt(id)));
      await db.delete(habits).where(eq(habits.id, parseInt(id)));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete habit" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}