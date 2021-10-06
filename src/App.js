import Table from './component/Table'
import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Setting from './component/Setting'
import Sidebar from './component/Sidebar'
import InfoMessage from './component/InfoMesaage'


import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, subDays } from "date-fns";
import Button from './component/Button'

function App() {

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  

const [ tabledata, setTabledata ] = useState({
    record:[],
    order:["date","app_id","requests","responses","impressions","clicks","revenue"],

    settings_data:[
      {
        column_name:"date",
        active:true
      },
      {
        column_name:"app_id",
        active:true
      },
      {
        column_name:"requests",
        active:true
      },
      {
        column_name:"responses",
        active:true
      },
      {
        column_name:"impressions",
        active:true
      },
      {
        column_name:"clicks",
        active:true
      },
      {
        column_name:"revenue",
        active:true
      }
    ],
    cal_vis:false,
    startDate:'2021-05-01',
    endDate:'2021-05-03'
})


const handleDate = (date) => {

  tabledata.startDate = date[0].startDate.toISOString().split('T')[0]
  tabledata.endDate = date[0].endDate.toISOString().split('T')[0]
  var getdta = fetchData()
  tabledata.record = getdta
  setTabledata({...tabledata})
  // fetchData();
}

const applychanged_data = (value, order,header) =>{

  tabledata.settings_data = value
  tabledata.order = order

  setTabledata({...tabledata})
}

useEffect(() => {

  fetchData();
 
}, [tabledata.settings_data,tabledata.order,tabledata.startDate,tabledata.endDate]);


const fetchData = async () => {
  const respGlobal = await axios.get(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${tabledata.startDate}&endDate=${tabledata.endDate}`)
  tabledata.record = respGlobal.data.data
  setTabledata({...tabledata})
  return respGlobal.data.data
};


const calndarAction = () =>{
  tabledata.cal_vis = !tabledata.cal_vis
  setTabledata({...tabledata})
}
return (
    <div className="greedy_game_container">
        <div className="leftpanel">
          <Sidebar />
        </div>
        <div className="rightPanel">
          <div className="calendar-section" >
            <div >
                <Button 
                    btn_text={tabledata.startDate+ "  -  "+ tabledata.endDate}
                    icon_class="icon-calendar"
                    align_data="left"
                    callback={calndarAction}
                    has_icon="true"
                    className="primary"
                    
                />
              </div>
              {tabledata.cal_vis && 
                  <DateRangePicker
                    onChange={item => {setDate([item.selection]);handleDate([item.selection])}}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={date}
                    direction="horizontal"
                    
                  />
              }
            </div>
            <Setting order = {tabledata.settings_data} callBack ={applychanged_data} />
            {tabledata.record.length > 0 ?
              <Table columnData = {tabledata.record} columnOrder={tabledata.order} setting_data={tabledata.settings_data}  />
              : <InfoMessage />
            }
        </div>
    </div>
  );
}

export default App;
