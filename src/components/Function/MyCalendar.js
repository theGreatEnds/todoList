import React, { useState, useContext, createContext } from "react";
import Calendar from "react-calendar";
import CssCalendar from '../Style/CssCalender';
import moment from "moment";

// Day Context
const Day = createContext();
export function useTodoDay() {
  const context = useContext(Day);  
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}

//Calendar
const MyCalendar = ({ children }) => {
  const [value, setValue] = useState(new Date());
  const translate = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug",  "Sep", "Oct", "Nov", "Dec"];
  const [day, setDay] = useState(`${moment(value).format("MMDDYYYY")}`);

  const onClickDay = (e) => {
    const str = String(e);
    let [m, d, y] = str.split(" ").slice(1, 4);
    let month = translate.indexOf(m) + 1;
    if (String(month).length === 1) month = String("0" + month);
    const words = String(month + d + y);
    setDay(words);
  };
  
  return (
    <>
      <CssCalendar>
        <Calendar onClickDay={onClickDay} onChange={setValue} value={value}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })} />
      </CssCalendar>

      <Day.Provider value={day}>{children}</Day.Provider>
    </>
  );
};


export default MyCalendar;
