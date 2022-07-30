import React, {useReducer, createContext, useContext } from "react";
const init = [
  {
      date:'07232022',
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
      date:'07242022',
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
      date:'07302022',
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
    case "CREATE":         
    let CREATEState=[...state];
    CREATEState.filter((x)=>x.date===action.date)[0].data=
    CREATEState.filter((x)=>x.date===action.date)[0].data.concat(action.todo);
      return CREATEState;
     case "REMOVE":
      let REMOVEState=[...state];
      REMOVEState.filter((x)=>x.date===action.date)[0].data=
      REMOVEState.filter((x)=>x.date===action.date)[0].data.filter((todo) => todo.id !== Number(action.id));    
      return REMOVEState;
    default: 
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const State = createContext();
const Dispatch = createContext();
export function TodoProvider({ children }) {  
  const [state, dispatch] = useReducer(todoReducer, init);
  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>
          {children}
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