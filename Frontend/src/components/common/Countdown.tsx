import { useEffect, type Dispatch, type SetStateAction } from "react";
import useCountdown from "@/hooks/useCountdown";

interface CountdownProps {
  endTime: string;
  setIsExpired: Dispatch<SetStateAction<boolean>>;
}

function TimeBadge({ value }: { value: string }) {
  return (
    <span className="px-2 py-1 min-w-10 text-center rounded-xl bg-red-500 text-white text-md">
      {value}
    </span>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown({ endTime, setIsExpired }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endTime);

  useEffect(() => {
    if (isExpired) {
      setIsExpired(true)
    }
  }, [isExpired, setIsExpired])

  return (
    <div className="flex items-center gap-1.5">
      <TimeBadge value={`${pad(days)} Days`} />
      <span>:</span>
      <TimeBadge value={pad(hours)} />
      <span>:</span>
      <TimeBadge value={pad(minutes)} />
      <span>:</span>
      <TimeBadge value={pad(seconds)} />
    </div>
  )
}