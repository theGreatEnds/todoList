import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useTodoState, useTodoDispatch } from "../../Data";
import {useTodoDay} from "./MyCalendar";
import moment from "moment";


const TodoList = () => {
  
  //add & delete
  const DataList = [...(useTodoState())];
  const day=useTodoDay()
  const datas = DataList.filter((x) => x.date === day);
  const [input, setInput] = useState("");
  const [mInput, setMInput] = useState("");
  const dispatch = useTodoDispatch();  
  const onChange = (e) => setInput(e.target.value);
  const onMChange = (e) => setMInput(e.target.value);
  const onDelete  = (e) => {dispatch({ type: 'REMOVE', date: day, id:e.target.id});}
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
  const onDone = (e) => { dispatch({ type: 'DONE_CHANGE', date: day, id:e.target.id});}
  const [inputText, setText] =useState(99999);  
  const onsetText = (e) => { setText(e.target.id); setMInput("");}
  const onModify = (e) => {e.preventDefault(); dispatch({ type: 'MODIFY', date: day, id:e.target.id, text: mInput}); setText(99999);}
  
  //draggable
  const [ grab, setGrab ] = useState(null);  
  const onDragOver = e => {e.preventDefault();}
  const onDragStart = e => {setGrab(e.target);} 
  const onDrop = e => {
      let grabPosition = Number(grab.dataset.position);
      let targetPosition = Number(e.target.dataset.position);
      let changedlist = [ ...datas[0].data ];   
    changedlist[grabPosition] = changedlist.splice(targetPosition, 1, changedlist[grabPosition])[0];  //실패
    dispatch({ type: 'LIST_CHANGE', date: day, list:changedlist});
  }


  
  
  return (
    
    <> 
      <div>{day}</div>           
      {datas[0].data.map((ele, index) => (
      <div key={index} style={{display:'flex', color:ele.done ? 'red' : 'black'}}>
       { inputText==index
        ? <form  id={ele.id} onSubmit={onModify}><input onChange={onMChange} autoFocus/></form>
        :  
        <>
        <div onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop}
         id={ele.id}  data-position={index} onClick={onDone} draggable >{ele.text} </div> 

        <button id={ele.id} onClick={onDelete} >삭제</button>
        <button id={index} onClick={onsetText} > 수정</button>
        </>
        }       
       </div>
        ))} 

      <form onSubmit={onCreate}> 
          <input onChange={onChange} value={input} autoFocus placeholder="입력 후 enter" />
      </form>
    </>
  );
};

export default TodoList;