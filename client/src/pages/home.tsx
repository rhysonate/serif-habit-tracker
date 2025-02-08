import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import HabitRow from '../components/habit-row';
import { useHabits, useCreateHabit, useDeleteHabit, getWeekDates } from '../lib/habits';
import { format } from 'date-fns';

// Map habit keywords to appropriate emojis
const HABIT_EMOJI_MAP: Record<string, string> = {
  workout: '🏋️',
  exercise: '🏋️',
  gym: '🏋️',
  yoga: '🧘',
  meditate: '🧘',
  meditation: '🧘',
  water: '💧',
  drink: '💧',
  hydrate: '💧',
  journal: '📝',
  write: '📝',
  diary: '📝',
  walk: '🚶',
  dog: '🐕',
  plant: '🌱',
  garden: '🌱',
  skincare: '🧴',
  skin: '🧴',
  read: '📚',
  book: '📚',
  sleep: '💤',
  rest: '💤',
};

const DEFAULT_EMOJIS = ['📝', '🏋️', '🧘', '💧', '🐕', '🌱', '🧴', '📚', '💤'];

export default function Home() {
  const [newHabitName, setNewHabitName] = useState('');
  const [view, setView] = useState('week');
  const dates = getWeekDates();

  const { data: habits = [], isLoading } = useHabits();
  const createHabit = useCreateHabit();
  const deleteHabit = useDeleteHabit();

  const getEmojiForHabit = (habitName: string) => {
    const lowercaseName = habitName.toLowerCase();
    // Check if any keyword matches the habit name
    for (const [keyword, emoji] of Object.entries(HABIT_EMOJI_MAP)) {
      if (lowercaseName.includes(keyword)) {
        return emoji;
      }
    }
    // If no match found, return a random default emoji
    return DEFAULT_EMOJIS[Math.floor(Math.random() * DEFAULT_EMOJIS.length)];
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    createHabit.mutate({
      name: newHabitName,
      emoji: getEmojiForHabit(newHabitName),
    }, {
      onSuccess: () => {
        setNewHabitName('');
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6 font-serif">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8">Good afternoon ☁️</h1>

        <div className="flex justify-between items-center mb-8">
          <Tabs defaultValue="week" onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Input
              placeholder="Add new habit..."
              value={newHabitName}
              onChange={e => setNewHabitName(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addHabit()}
              className="w-60"
            />
            <Button onClick={addHabit} className="bg-slate-900 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add habit
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-[8rem_1fr] gap-4">
            <div className="pl-12" />
            <div className="grid grid-cols-7 gap-2">
              {dates.map(date => (
                <div 
                  key={date.toString()} 
                  className="text-center text-sm text-muted-foreground flex items-center justify-center h-10 px-4"
                >
                  {format(date, 'EEE')}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {habits.map(habit => (
            <HabitRow
              key={habit.id}
              habit={habit}
              view={view}
              onUpdate={() => {}}
              onDelete={() => deleteHabit.mutate(habit.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}