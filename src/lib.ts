export interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

export const KEY = "streak";

export function formattedDate(date: Date): string {
  return date.toLocaleString("en-US").split(",")[0];
}

export function buildStreak(
  date: Date,
  overrideDefaults?: Partial<Streak>
): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  return {
    ...defaultStreak,
    ...overrideDefaults,
  };
}

export const datediff = (first: number, second: number): "increment" | "reset" | "none" => {
  const diff = Math.round((second - first) / (1000 * 60 * 60 * 24));
  return diff === 1 ? "increment" : diff > 1 ? "reset" : "none";
}

export const saveStreak = (streak: Streak, date: Date, storage: Storage) => {
  streak.lastLoginDate = formattedDate(date);
  storage.setItem("streak", JSON.stringify(streak));
}