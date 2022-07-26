import React,{useState} from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const MyCalendar=()=>{

    const [value,setValue]=useState(new Date())
    const translate=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const [day,setDay]=useState(`${moment(value).format("MMDDYYYY")}`)
    const DataList=[
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
            date:'07262022',
            data:[{
                    id: 1,
                    text: '감자먹기',
                    done: true
                },
                {
                    id: 2,
                    text: '공부하기',
                    done: true
                },
                {
                    id: 3,
                    text: '잠자기',
                    done: true
                }]
        }
    ]
    
    const onClickDay=(e)=>{
        const str = String(e)
        let [m,d,y]=str.split(' ').slice(1,4)
        let month = translate.indexOf(m)+1
        if (String(month).length===1){
            month=String('0'+month)
        }
        const words= String(month+d+y)
        setDay(words)
    }
    const datas = DataList.filter((x)=>x.date===day)
    
    

    return(
    <>
        {/* 달력 */}
        <CssCalendar>
            <Calendar onChange={setValue} value={value} formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                onClickDay={onClickDay}/>
        </CssCalendar>
        
        {/* 날짜(조정가능) + 하는일 */}
        <div>{day}</div>
        {datas[0].data.map(ele=>
            <div key={ele.id}>{ele.text}</div>
        )}

        {/* 23,24,26일만 데이터 넣어져있는 상태임! => 다른날짜누르면 안나옴 => 누르자마자 할일 비어있는 상태로 만들
            https://velog.io/@tjdgus0528/React-Native-5x048oii
            윗글 useState비동기글인데 한번 보면 좋을거같음
            이상한거나 궁금한거 있으면 얘기해주세요
        */}

    </>)
}

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



export default MyCalendar

