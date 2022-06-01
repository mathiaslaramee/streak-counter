import { Streak, datediff, saveStreak, formattedDate } from "./lib";

export const streakCounter = (storage: Storage, date: Date): Streak => {
  const exists = storage.getItem("streak");

  if (exists) {
    const streak = JSON.parse(exists) as Streak;

    const last = new Date(streak.lastLoginDate).valueOf();
    const now = new Date(date).valueOf();
    const diff = datediff(last, now);

    switch (diff) {
      case "increment": {
        streak.currentCount = streak.currentCount + 1;
        break;
      }
      case "reset": {
        streak.currentCount = 1;
        break;
      }
    }

    saveStreak(streak, date, storage);
    return streak;
  } else {
    return {
      currentCount: 1,
      startDate: formattedDate(date),
      lastLoginDate: formattedDate(date)
    };
  }
}