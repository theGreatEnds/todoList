import React, { useState, useEffect ,useContext, createContext} from "react";
import "react-calendar/dist/Calendar.css";
import { useTodoState, useTodoDispatch, useSetShow } from "../../Data";
import {useMoveDay, useTodoDay} from "./MyCalendar";
import moment from "moment";
import Create from "../Function/Create";
import '../Style/todoCss.css';

function TodoList() {
  const DataList = [...(useTodoState())];
  const day=useTodoDay();  
  const datas = DataList.filter((x) => x.date === day);
  const setShow=useSetShow();
  const dispatch = useTodoDispatch();

  //add & delete & done & modify  
  const [mInput, setMInput] = useState("");
  const onMChange = (e) => setMInput(e.target.value);
  const [inputText, setText] =useState(99999);  
  const[add,setAdd]=useState(false); 
  const onDelete  = (e) => {dispatch({ type: 'REMOVE', date: day, id:e.target.id});}
  const onDone = (e) => {dispatch({ type: 'DONE_CHANGE', date: day, id:e.target.id});}
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
    <div className='part'>  
    <div className='day'>{day.substr(4,4)}년 {day.substr(0,2)}월 {day.substr(2,2)}일</div>           
    <div className='box'>
    {datas[0].data.map((ele, index) => (
    <div className='todo' key={index}>
     { inputText==index
      ? <form  id={ele.id} onSubmit={onModify}><input className="input" onChange={onMChange} autoFocus/></form>
      :  
      <>
      <div className="content" style={{color:ele.done ? 'rgba(0,0,0,0.2)' : 'black'}} onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop}
       id={ele.id}  data-position={index} onClick={onDone} draggable >{ele.text} </div> 
       <div style={{width:'30%'}}>
      <img className="option" src="../../img/delete.png" id={ele.id} onClick={onDelete} alt='delete'/>
      <img className="option" src="../../img/edit.png" id={index} onClick={onsetText} alt='edit' /> 
      <img className="option" src="../../img/today.png" id={ele.id} onClick={onMoveT} alt='today' />
      <img className="option" src="../../img/dateChange.png" id={ele.id} onClick={onMoveO} alt='anotherday' /> 
      </div>
      </>     
     }</div>      
      ))} 
      </div>
      <Add.Provider value={setAdd}>
       <div className="addDiv"> {add ? <Create/>: <img style={{width:'50px'}} onClick={setAdd} src="../../img/add.png"alt='add'/>}</div> 
      </Add.Provider>     
  </div>
  );
}
export default TodoList;

const Add = createContext();
export function useAdd() {
  const context = useContext(Add); 
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}