import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { useTodoState, useTodoDispatch, useSetShow } from "../../Data";
import {useMoveDay, useTodoDay} from "./MyCalendar";
import moment from "moment";


function TodoList() {
  //add & delete & done & modify
  const DataList = [...(useTodoState())];
    
  
  const day=useTodoDay();  
  const datas = DataList.filter((x) => x.date === day);
  const setShow=useSetShow();
  
  const [mInput, setMInput] = useState("");
  const dispatch = useTodoDispatch();
  
  const onMChange = (e) => setMInput(e.target.value);
  const onDelete  = (e) => {dispatch({ type: 'REMOVE', date: day, id:e.target.id});}

  const onDone = (e) => {dispatch({ type: 'DONE_CHANGE', date: day, id:e.target.id});}
  const [inputText, setText] =useState(99999);  
  const onsetText = (e) => {setText(e.target.id); setMInput("");}
  const onModify = (e) => {e.preventDefault(); dispatch({ type: 'MODIFY', date: day, id:e.target.id, text: mInput}); setText(99999);}

  //move
  const onMoveT = (e) => { dispatch({ type: 'MOVE', date: day, moveday: `${moment(new Date()).format("MMDDYYYY")}`,id:e.target.id});}
  const onMoveO = (e) => { setShow(2); setId(e.target.id);}
  const [id, setId]=useState(0);

  const moveDay=useMoveDay();
  useEffect(()=>{
    if(moveDay===999) return
    const translate = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug",  "Sep", "Oct", "Nov", "Dec"];
    const str = String(moveDay);
    let [m, d, y] = str.split(" ").slice(1, 4);
    let month = translate.indexOf(m) + 1;
    if (String(month).length === 1) month = String("0" + month);
    const words = String(month + d + y);   
    if((DataList.map((e)=>e.date)).indexOf(words)===-1)dispatch({
      type:"MAKE",
      date:words,
      data:[{}]
    })
   dispatch({type:'MOVE', date: day, moveday: words, id:id});
  },[moveDay]);



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
       { inputText===index
        ? <form  id={ele.id} onSubmit={onModify}><input onChange={onMChange} autoFocus/></form>
        :  
        <>
        <div onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop}
         id={ele.id}  data-position={index} onClick={onDone} draggable >{ele.text} </div> 

        <button id={ele.id} onClick={onDelete} >D</button>
        <button id={index} onClick={onsetText} > M</button>
        <button id={ele.id} onClick={onMoveT} > T</button>
        <button id={ele.id} onClick={onMoveO} > O</button>
        </>
        }       
       </div>
        ))} 
    </>
  );
}

export default TodoList;