import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useTodoState, useTodoDispatch } from "../../Data";

// Calender
const MyCalendar = () => {
  const [value, setValue] = useState(new Date());
  const translate = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug",  "Sep", "Oct", "Nov", "Dec"];
  const [day, setDay] = useState(`${moment(value).format("MMDDYYYY")}`);
  const DataList = [...(useTodoState())];


  const onClickDay = (e) => {
    const str = String(e);
    let [m, d, y] = str.split(" ").slice(1, 4);
    let month = translate.indexOf(m) + 1;
    if (String(month).length === 1) month = String("0" + month);
    const words = String(month + d + y);
    setDay(words);
  };
  const datas = DataList.filter((x) => x.date === day);


  //add 및 delete -> 완전 성공하면 분리할게요!!
  const [input, setInput] = useState("");
  const dispatch = useTodoDispatch();
  const onChange = (e) => setInput(e.target.value);
  const onDelete  = (e) => {dispatch({ type: 'REMOVE', date: day, id:e.target.id});}
  const onCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      date: day,
      todo: {
        id: datas[0].data.length === 0 ? 1 : datas[0].data[datas[0].data.length-1].id+1,
        text: input,
        done: true,
      }});
    setInput("");
  };
  
  return (
    <>
      <CssCalendar>
        <Calendar onClickDay={onClickDay} onChange={setValue} value={value}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })} />
      </CssCalendar>

      <div>{day}</div>      
      {datas[0].data.map((ele) => (
        <div key={ele.id} id={ele.id} onClick={onDelete} draggable>{ele.text} </div>
      ))}
      <form onSubmit={onCreate}> 
          <input onChange={onChange} value={input} autoFocus placeholder="입력 후 enter" />
      </form>
    </>
  );
};

const CssCalendar = styled.div`
  .react-calendar {
    width: 400px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  /* .react-calendar__month-view__days__day--weekend {
    color: #d10000;
   } */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
  }
`;
export default MyCalendar;
