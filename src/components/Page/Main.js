import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MyCalendar from "../Function/MyCalendar";
import { TodoProvider } from "../../Data";
import AddDelete from "../Function/AddDelete";

const Main = ({children})=>{
    return(
    <>
        <Header/>
        <TodoProvider>
        <MyCalendar>
        <AddDelete/>
        </MyCalendar>
        </TodoProvider>
        <Footer/>
    </>)
}
export default Main