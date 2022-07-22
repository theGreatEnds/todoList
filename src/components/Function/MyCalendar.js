import React,{useState} from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
const CssCalendar=styled.div`
.react-calendar { 
    width: 400px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
   }
   .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
   }
   .react-calendar__navigation button:enabled:hover,
   .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
   }
   .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
   }
   abbr[title] {
    text-decoration: none;
   }
   /* .react-calendar__month-view__days__day--weekend {
    color: #d10000;
   } */
   .react-calendar__tile:enabled:hover,
   .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
   }
   .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
   }
   .react-calendar__tile--now:enabled:hover,
   .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
   }
   .react-calendar__tile--hasActive:enabled:hover,
   .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
   }
   .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
   }
   .react-calendar__tile--active:enabled:hover,
   .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
   }
   .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
   }
   .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
   }
   .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
   }
   .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
   }
`

const MyCalendar=()=>{

    const [value,setValue]=useState(new Date())
    const translate=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const [day,setDay]=useState(`${moment(value).format("MMDDYYYY")}`)
    const [DataList,setDataList]=useState([
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
        }
    ])
    const [pick,setPick]=useState([{
        date:'mmddyyyy',
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
    }])
    
    const onClickDay=(e)=>{
        const str = String(e)
        let words =str.split(' ').slice(1,4)
        let k = translate.indexOf(words[0])+1
        if (String(k).length===1){
            k=String('0'+k)
        }
        words= String(k+words[1]+words[2])
        setDay(words)
        setDataList(DataList.concat({
            date:`${day}`,
            data:[{
                id: 1,
                text: '밥d먹기',
                done: true
            },
            {
                id: 2,
                text: '공부하기',
                done: true
            }]
        }))
        setPick(DataList.filter(x=>x.date===day))
        console.log('설정날',day)
        console.log('추출데이터',pick)
    }
    

    //유경님이 수정하실곳
    const add = ()=>{
        setDataList(...DataList)
    }
    //

    return(
        <>
        <CssCalendar>
            <Calendar onChange={setValue} value={value} formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                onClickDay={onClickDay}/>
        </CssCalendar>
        <div className="text-gray-500 mt-4">
            {moment(value).format("MMDDYYYY")}
        </div>
        <div>
            {day}
        </div>
        <button onClick={add}>수정하실곳</button>
        </>)
}

export default MyCalendar