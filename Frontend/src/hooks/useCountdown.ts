import { useEffect, useState } from "react";
import dayjs from "../lib/dayjs";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getTimeLeft(target: string): TimeLeft {
  const now = dayjs();
  const end = dayjs(target);
  const diffMs = end.diff(now);

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const dur = dayjs.duration(diffMs);

  return {
    days: Math.floor(dur.asDays()), // total hari (bukan cuma dur.days() yang max 30-an)
    hours: dur.hours(),
    minutes: dur.minutes(),
    seconds: dur.seconds(),
    isExpired: false,
  };
}

export default function useCountdown(target: string) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
}
