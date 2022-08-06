import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useTodoState, useTodoDispatch } from "../../Data";
import {useTodoDay} from "./MyCalendar";


const TodoList = () => {
  
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
        id: datas[0].data.length===0 ? 1 : Math.max.apply(null,datas[0].data.map((e)=>Number(e.id)))+1,
        text: input,
        done: true,
      }});
    setInput("");
  };

  //draggable
  const [ grab, setGrab ] = useState(null);  
  const onDragOver = e => {e.preventDefault();}
  const onDragStart = e => {setGrab(e.target);} 
  const onDrop = e => {
      let grabPosition = Number(grab.dataset.position);
      let targetPosition = Number(e.target.dataset.position);
      let changedlist = [ ...datas[0].data ];   
    changedlist[grabPosition] = changedlist.splice(targetPosition, 1, changedlist[grabPosition])[0];  //실패
    dispatch({ type: 'CHANGE', date: day, list:changedlist});
  }
  

  return (
    <>
      <div>isfp는 게으르며 누워있는다</div>    
      <div>{day}</div>           
      {datas[0].data.map((ele, index) => (
        <div onDragOver={onDragOver}  onDragStart={onDragStart} onDrop={onDrop}
        key={index} id={ele.id} onClick={onDelete} data-position={index} draggable  >{ele.text} </div> ))} 

      <form onSubmit={onCreate}> 
          <input onChange={onChange} value={input} autoFocus placeholder="입력 후 enter" />
      </form>
    </>
  );
};

export default TodoList;