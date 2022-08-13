import React, {useReducer,useState, createContext, useContext } from "react";
const init = [
  {
      date:'08022022',
      data:[{
              id: 1,
              text: '밥먹기',
              done: true
          },
          {
              id: 2,
              text: '운동하기',
              done: true
          }]
  },
  {
      date:'08032022',
      data:[{
              id: 1,
              text: '밥먹기',
              done: true
          },
          {
              id: 2,
              text: '공부하기',
              done: true
          }]
  },
  {
      date:'08132022',
      data:[{
              id: 1,
              text: '감자먹기',
              done: true
          },
         {
            id: 2,
            text: '감자',
            done: true
          },
         {
          id: 3,
          text: '감자감자',
          done: true
         },
        {
         id: 4,
         text: '고구마',
         done: true
         },
        {
          id: 5,
          text: '감자캐기',
          done: true
         }]
  }
]

function todoReducer(state, action) { 
  switch (action.type) {
    case "MAKE":
    let OriginState=[...state]
    let newState =  OriginState.concat({date:action.date, data:[]})
    console.log(newState)
      return newState 
    case "CREATE":         
    let CREATEState=[...state];
    CREATEState.filter((x)=>x.date===action.date)[0].data=
    CREATEState.filter((x)=>x.date===action.date)[0].data.concat(action.todo);
    console.log(CREATEState.filter((x)=>x.date===action.date)[0].data);
      return CREATEState;
    case "REMOVE":
    let REMOVEState=[...state];
    REMOVEState.filter((x)=>x.date===action.date)[0].data=
    REMOVEState.filter((x)=>x.date===action.date)[0].data.filter((todo) => todo.id !== Number(action.id));    
    console.log(REMOVEState.filter((x)=>x.date===action.date)[0].data);
      return REMOVEState;    
    case "MODIFY": //일정 내용 수정
      let MODIFYState=[...state];
      MODIFYState.filter((x)=>x.date===action.date)[0].data[action.id-1].text= action.text;
      console.log(MODIFYState.filter((x)=>x.date===action.date)[0].data);
        return MODIFYState;
    case "LIST_CHANGE"://일정 순서 이동
    let CHANGEState=[...state];
    CHANGEState.filter((x)=>x.date===action.date)[0].data=action.list;  
    console.log(CHANGEState.filter((x)=>x.date===action.date)[0].data);
      return CHANGEState;
    case "DONE_CHANGE"://한 일 체크
    let DONEState=[...state];    
    DONEState.filter((x)=>x.date===action.date)[0].data[action.id-1].done=
    !(DONEState.filter((x)=>x.date===action.date)[0].data[action.id-1].done);
      return DONEState;  
    case "MOVE"://할 일 이동
      let MOVEState=[...state];
      const object={...state.filter((x)=>x.date===action.date)[0].data.filter((todo) => todo.id === Number(action.id))[0]};     
      if(action.date===action.moveday) return MOVEState; 
    MOVEState.filter((x)=>x.date===action.moveday)[0].data=MOVEState.filter((x)=>x.date===action.moveday)[0].data.concat(object);
    MOVEState.filter((x)=>x.date===action.date)[0].data=MOVEState.filter((x)=>x.date===action.date)[0].data.filter((todo) => todo.id !== Number(action.id))   
    MOVEState.filter((x)=>x.date===action.moveday)[0].data[MOVEState.filter((x)=>x.date===action.moveday)[0].data.length-1].id=
    MOVEState.filter((x)=>x.date===action.moveday)[0].data.length===1 ? 1 : Math.max.apply(null,MOVEState.filter((x)=>x.date===action.moveday)[0].data.map((e)=>Number(e.id)))+1;
    return MOVEState;
    default: 
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const State = createContext();
const Dispatch = createContext();
const Show = createContext();
const SetShow = createContext();
export function TodoProvider({ children }) {  
  const [state, dispatch] = useReducer(todoReducer, init);
  const [show, setShow] = useState(1);
  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>
      <Show.Provider value={show}>
       <SetShow.Provider value={setShow}>
          {children}
       </SetShow.Provider>  
      </Show.Provider>  
      </Dispatch.Provider>  
     </State.Provider>
  );
}

export function useTodoState() {
  const context = useContext(State);  
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}
export function useTodoDispatch() {
  const context = useContext(Dispatch);
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}
export function useShowState() {
  const context = useContext(Show);  
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}
export function useSetShow() {
  const context = useContext(SetShow);
  if (!context) throw new Error("Cannot find TodoProvider");
  return context;
}