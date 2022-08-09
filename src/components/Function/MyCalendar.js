import React, { useState, useContext, createContext } from "react";
import Calendar from "react-calendar";
import CssCalendar from '../Style/CssCalender';
import { useTodoState } from "../../Data";
import moment from "moment";
import { useTodoDispatch } from "../../Data";


// Day Context
const Day = createContext();
export function useTodoDay() {
  const context = useContext(Day);  
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}

//Calendar
const MyCalendar = ({ children }) => {
 
  const translate = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug",  "Sep", "Oct", "Nov", "Dec"];
  const [day, setDay] = useState(`${moment(new Date()).format("MMDDYYYY")}`);
 
  const dispatch = useTodoDispatch()
  const DataList = [...(useTodoState())];

  const onClickDay = (e) => {
    const str = String(e);
    let [m, d, y] = str.split(" ").slice(1, 4);
    let month = translate.indexOf(m) + 1;
    if (String(month).length === 1) month = String("0" + month);
    const words = String(month + d + y);
    setDay(words);
    if((DataList.map((e)=>e.date)).indexOf(words)===-1)dispatch({
      type:"MAKE",
      date:words,
      data:[{}]
    })
  };
  
  return (
    <>
      <CssCalendar>
        <Calendar onClickDay={onClickDay}  formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })} />
      </CssCalendar>
      
      <Day.Provider value={day}>{children}</Day.Provider>
    </>
  );
};


export default MyCalendar;
