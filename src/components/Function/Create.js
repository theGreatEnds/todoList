import React, { useState } from "react";
import {useTodoState, useTodoDispatch } from "../../Data";
import {useTodoDay} from "./MyCalendar";

function Create() {
  const dispatch = useTodoDispatch();  
  const day=useTodoDay()
  const DataList = [...(useTodoState())];
  const datas = DataList.filter((x) => x.date === day);

  const onChange = (e) => setInput(e.target.value);
  const [input, setInput] = useState("");

  const onCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      date: day,
      todo: {
        id: datas[0].data.length===0 ? 1 : Math.max.apply(null,datas[0].data.map((e)=>Number(e.id)))+1,
        text: input,
        done: false,
      }});
    setInput("");
  };

  return (
    <>
       <form onSubmit={onCreate}> 
          <input onChange={onChange} value={input} autoFocus placeholder="입력 후 enter" />               
      </form>
    </>
  );
}

export default Create;