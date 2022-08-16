import React, { useState, useContext, createContext } from "react";
import Calendar from "react-calendar";
import CssCalendar from '../Style/CssCalender';
import {useShowState, useTodoState,useTodoDispatch,useSetShow } from "../../Data";
import moment from "moment";


// Day Context
const Day = createContext();
export function useTodoDay() {
  const context = useContext(Day);  
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}
const MoveDay = createContext();
export function useMoveDay() {
  const context = useContext(MoveDay); 
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}

//Calendar
const MyCalendar = ({ children }) => {
  const translate = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug",  "Sep", "Oct", "Nov", "Dec"];
  const [day, setDay] = useState(`${moment(new Date()).format("MMDDYYYY")}`);
  const [moveDay, setmoveDay] =useState(999);
  const dispatch = useTodoDispatch()
  const DataList = [...(useTodoState())];
  const show=useShowState();
  const SetShow=useSetShow();

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
  const onClick = (e) => {setmoveDay(e); SetShow(1);}
  const abc = ()=>{
    console.log(DataList)
    const x =DataList.map((e)=>e.data.length)
    console.log(x)
    const y =DataList.find((e)=>e.date==='08092022')
    console.log(y)
  }

  return (
    <>
      <CssCalendar>
       { show===2 ? <Calendar onClickDay={onClick}/>:<Calendar onClickDay={onClickDay}
          tileContent={({date,view})=>{
            let html=[]
            const x =moment(date).format('MMDDYYYY')
            const index = DataList.findIndex(e=>e.date===x)
            if( DataList.find((e)=>e.date===x)){
              const alldo = DataList[index].data.length
              const checkdo=DataList[index].data.filter((e)=>e.done===true).length
              html.push(<div>all:{alldo} x:{checkdo}</div>)
            }
            return(
              // <div>{html}</div> 나 에러 보기 편하려고 잠깐 지운거예요
              <></>
            )
          }}
          formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })} />
        }</CssCalendar>
      <button onClick={abc}>dd</button>

      
      <MoveDay.Provider value={moveDay}>     
       <Day.Provider value={day}>
        {children}
       </Day.Provider>
      </MoveDay.Provider>
      {DataList[0].data.length}
    </>
  );
};


export default MyCalendar;
