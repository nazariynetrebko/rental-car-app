import { useState, useRef, useEffect } from "react";
import css from "./Calendar.module.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Calendar({ selectedDate, onDateSelect, onClose }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    selectedDate ? new Date(selectedDate) : today
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay() || 7;
  const totalDays = lastDay.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day) => {
    const chosen = new Date(year, month, day);
    onDateSelect(chosen);
    onClose(); // закриваємо після вибору
  };

  const days = [];
  for (let i = 1; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return (
    <div className={css.calendar}>
      <div className={css.header}>
        <button className={css.arrow} onClick={prevMonth}>
          &#8249;
        </button>
        <span>
          {currentDate.toLocaleString("en-US", { month: "long" })} {year}
        </span>
        <button className={css.arrow} onClick={nextMonth}>
          &#8250;
        </button>
      </div>

      <div className={css.daysRow}>
        {daysOfWeek.map((day) => (
          <div key={day} className={css.dayName}>
            {day}
          </div>
        ))}
      </div>

      <div className={css.grid}>
        {days.map((day, index) => {
          if (!day) return <div key={index} className={css.empty}></div>;

          const isSelected =
            selectedDate &&
            new Date(selectedDate).toDateString() ===
              new Date(year, month, day).toDateString();

          return (
            <div
              key={index}
              className={`${css.day} ${isSelected ? css.selected : ""}`}
              onClick={() => handleDateClick(day)}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
