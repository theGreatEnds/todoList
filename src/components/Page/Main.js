import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MyCalendar from "../Function/MyCalendar";

const Main = ({children})=>{
    return(
    <>
        <Header/>
        <MyCalendar/>
        <Footer/>
    </>)
}

export default Main