import { useNavigate } from "@tanstack/react-router";
import { addDays, format, isToday } from "date-fns";
import { sv } from "date-fns/locale";
import { useState } from "react";

function DayBooker() { 
  const [startDayOffset, setStartDayOffset] = useState(0);
  const getDays = () => {
    return Array.from({ length: 7 }, (_, i) => i + startDayOffset);
  };
  const handlePrev = () => {
    setStartDayOffset((prev) => prev - 7);
  };
  const handleNext = () => {
    setStartDayOffset((prev) => prev + 7);
  };

  return (
    <div className="bg-[#666] rounded-lg p-4 my-24">
      <div className="flex flex-col">
        <span className="text-2xl text-white font-bold uppercase">
          Välj dag du vill gå på bio
        </span>
        <div className="flex items-center justify-between mt-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={startDayOffset <= 0}
            style={{
              marginRight: "20px",
              fontSize: "24px",
            }}
          >
            &#8592;
          </button>

          {/* Dates */}
          <div className="flex flex-wrap gap-3">
            {getDays().map((dayOffset) => (
              <DayCard key={dayOffset} dayOffset={dayOffset} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            style={{
              marginLeft: "20px",
              fontSize: "24px",
            }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayBooker;

const DayCard = ({ dayOffset }: { dayOffset: number }) => {
  const navigate = useNavigate();

  const getFormattedDay = (dayOffset: number) => {
    const targetDate = addDays(new Date(), dayOffset);
    const dayName = isToday(targetDate)
      ? "Idag"
      : format(targetDate, "EEE", { locale: sv });
    const date = format(targetDate, "d MMMM", { locale: sv });
    return { dayName, date, targetDate };
  };

  const { dayName, date, targetDate } = getFormattedDay(dayOffset);

  const handleClick = () => {
    const dateString = format(targetDate, "yyyy-MM-dd");
    navigate({ to: "/search", search: { date: dateString } });
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col justify-center items-center rounded-md shadow-md ${isToday(targetDate)
          ? "border border-2 bg-zinc-900 border-green-500 text-white"
          : "bg-zinc-900 text-white"
        } hover:bg-white hover:text-black hover:cursor-pointer`}
      style={{
        width: "100px", // Fast bredd
        height: "100px", // Fast höjd
        textAlign: "center", // Säkerställer centrerad text
      }}
    >
      <span className="capitalize text-sm font-semibold">{dayName}</span>
      <span className="capitalize text-xs">{date}</span>
    </div>
  );
};
