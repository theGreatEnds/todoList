import React, { useState} from "react";
import {useTodoState, useTodoDispatch } from "../../Data";
import {useTodoDay} from "./MyCalendar";
import {useAdd} from "./TodoList";
import '../Style/todoCss.css';

function Create() {
  const dispatch = useTodoDispatch();  
  const day=useTodoDay();
  const DataList = [...(useTodoState())];

 //Create
  const onChange = (e) => setInput(e.target.value);
  const [input, setInput] = useState("");

 function onCreate(e) {
  for(let i=0; i<array.length; i++){
  if((DataList.map((e)=>e.date)).indexOf(array[i])===-1) dispatch({
    type:"MAKE",
    date:array[i],
    data:[{}]
  })
  const tempDatas=DataList.filter((x) => x.date === day)[0].data;
  dispatch({
    type: "CREATE",
    date: array[i],
    todo: {
      id: tempDatas.length===0 ? 1 : Math.max.apply(null,tempDatas.map((e)=>Number(e.id)))+1,
      text: input,
      done: false,
    }});
}}

  //option
  const array=[]
  const [addOtpion,setAddOtpion]=useState(false);
  const [loop, setLoop]=useState("D")
  const onPeriod = (e) => setPeriod(Number(e.target.value));
  const [period, setPeriod] = useState(1);
  const onCount = (e) => setCount(e.target.value);
  const [count, setCount] = useState(1);
  const setAdd = useAdd();
  async function option (e) {
    e.preventDefault();  
   let start=(day.substr(2,2))
   let p=period;
   switch(loop){
    case "D": break;
    case "W": p*=7; break;
    case "M": start=(day.substr(0,2)); break;
    default: throw new Error(`Unhandled action type`)
    }
    for(let i= Number(start); i<Number(start)+(count*p); i++) {
      if (String(i).length === 1) i = String("0" + i);
       const tempDay=day.replace(start,i)
       array.push(tempDay)
       i=Number(i)+(p-1);
      }
     onCreate(e)
     setPeriod(1)
     setCount(1)
     setInput("")
     setAdd();
  };

  //checkbox
  const One = (one) => {
    const ones = document.getElementsByName('loop')
    for (let i = 0; i < ones.length; i++) 
       if (ones[i] !== one) ones[i].checked = false
  }  
  function Value (e) { e.target.checked ? setLoop(e.target.value) :  setLoop('D') }

  return (
    <>
      <form onSubmit={option} > 
          <input className="input" onChange={onChange} value={input} autoFocus placeholder="추가할 할 일을 입력해 주세요" />    
          <img style={{width:'40px'}} onClick={setAddOtpion} src="../../img/option.png"alt='opiton'/>   
      </form>
      {addOtpion ?
        <div style={{marginTop:'5%'}}>
            <input type={"checkbox"} name="loop" onChange={(e) => One(e.target)} value='D' onClick={(e)=>Value(e)}/>
            <span className="marginR5">매일 반복</span>
            <input type={"checkbox"} name="loop" onChange={(e) => One(e.target)} value='W' onClick={(e)=>Value(e)} />
            <span className="marginR5">매주 반복</span>
            <input type={"checkbox"} name="loop" onChange={(e) => One(e.target)} value='M' onClick={(e)=>Value(e)}/>
            <span>매월 반복</span>

            <br/>반복 횟수 : <input className="input" onChange={onCount} value={count}  autoFocus placeholder="횟수" />회 
            <br/>반복 주기 : <input className="input" onChange={onPeriod} value={period}  autoFocus placeholder="주기" />{loop}
      </div> 
      :null}
    </>
  );
}
export default Create;