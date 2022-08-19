import React from "react";
import MyCalendar from "../Function/MyCalendar";
import { TodoProvider } from "../../Data";
import TodoList from "../Function/TodoList";
import Create from "../Function/Create";
import styled from "styled-components";
import theme from "../Style/Theme"
import flexMode from '../Style/OftenStyle'


const Main = ({children})=>{

    return(
    <>
        <TodoProvider>
            <MainStyle>
            <MyCalendar  >
            <TodoList  />
            <Create/>
            </MyCalendar>
            </MainStyle>
        </TodoProvider>

    </>)
}

const MainStyle = styled.div`
    ${theme.device.pc}{
        ${flexMode.divCenter}
    }
    ${theme.device.mobile}{
        
    }
`

export default Main