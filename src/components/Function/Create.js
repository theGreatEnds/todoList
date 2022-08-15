import React, { useState,useEffect } from "react";
import {useTodoState, useTodoDispatch } from "../../Data";
import {useTodoDay} from "./MyCalendar";

function Create() {
  const dispatch = useTodoDispatch();  
  const day=useTodoDay();
  const [temp,setTemp]=useState(day);
 
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
  const [loops,setLoop]=useState([])
  const on =(e)=>{
    e.preventDefault();
    let tempLoop=[...loops];
    //반복주기 설정 함수
     for(let i=day.substr(2,2); i<32; i++){
      tempLoop.push(temp.replace(temp.substr(2,2),i)) 
    }   

    //날짜 저장
    setLoop(tempLoop)
    //해당 날짜 뽑아서 useState로 관리
    loops.map((loop) => {
      setTemp(loop)
      console.log(temp)
   }) 
  };

  useEffect(()=>{  
    console.log("welcome")
    if(day===temp) return
    if((DataList.map((e)=>e.date)).indexOf(temp)===-1)dispatch({
      type:"MAKE",
      date:temp,
      data:[{}]
    })
    //const tempDatas=DataList.filter((x) => x.date === temp)[0].data; id수정 안->무시하세용
    dispatch({
      type: "CREATE",
      date: temp,
      todo: {
        id: datas[0].data.length===0 ? 1 : Math.max.apply(null,datas[0].data.map((e)=>Number(e.id)))+1,
        text: input,
        done: false,
      }});
  },[temp]);








  return (
    <>
       <form onSubmit={on}> 
          <input onChange={onChange} value={input} autoFocus placeholder="입력 후 enter" />               
      </form>
    </>
  );
}

export default Create;