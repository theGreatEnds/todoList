import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MyCalendar from "../Function/MyCalendar";
import { TodoProvider } from "../../Data";
import TodoList from "../Function/TodoList";
import Create from "../Function/Create";

const Main = ({children})=>{

    return(
    <>
        <Header/>
        <TodoProvider>
        <MyCalendar  >
        <TodoList  />
        <Create/>
        </MyCalendar>
        </TodoProvider>
        <Footer/>
    </>)
}
export default Main