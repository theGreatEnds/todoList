import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useTodoState, useTodoDispatch } from "../../Data";
import {useTodoDay} from "./MyCalendar";


const AddDelete = () => {
  
  //add & delete
  const DataList = [...(useTodoState())];
  const day=useTodoDay()
  const datas = DataList.filter((x) => x.date === day);
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

export default AddDelete;
