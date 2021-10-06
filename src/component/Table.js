import React, { useEffect, useState } from 'react'

import './Table.css';

import Filters from './Filters'

function Table(props){

    // {console.log(props)}

    const [ rows_data, setRows_data ] = useState(props.columnData)

    const filter_action = (e) => {
        [...e.target.closest("table").querySelectorAll(".filter-parenr")].map(x => x.classList.contains("d-none") && x.classList.add("d-none"))
        e.target.closest("th").querySelector(".filter-parenr").classList.toggle("d-none")
        // setFilter_vis(!filter_vis)
    }

  
  const handle_filtered_data = (data) => {
    console.log(data)
    setRows_data(data)
    
  }
  useEffect(() => {
    // setRows_data(props.columnData)
   
  },[rows_data])

 

    return(
        <div className="table-container">
            <table className="table-border" cellSpacing='0' cellPadding='0' width="100%">
                <thead>
                    <tr>

                        {props?.columnOrder.map((x,i) => {
                            
                            return (props?.setting_data[i]?.active && 
                            <th head_name={x}>
                                <a onClick={e => filter_action(e,e.target.closest('th').getAttribute('head_name'))}>
                                    <i className="icon-filter"></i>
                                </a>
                                {x}
                               
                                    <div className="filter-parenr d-none" >
                                        <Filters app_data={props.columnData} col_name={x}  callback_data={handle_filtered_data}/>
                                    </div>
                               
                                
                            </th>)
                           
                        })}
                    </tr>
                   
                </thead>
            <tbody>
               
                {rows_data.map((x,i) => {

                    return (<tr>
                       {  props.setting_data.map(y => {
                        return ( <td>
                            {y.column_name == "date" && y.active == true && x.date}
                            {y.column_name == "app_id" && y.active == true && x.app_id}
                            {y.column_name == "requests" && y.active == true && x.requests}
                           { y.column_name == "responses" && y.active == true && x.responses}
                           { y.column_name == "impressions" && y.active == true && x.impressions}
                           { y.column_name == "clicks" && y.active == true && x.clicks}
                           { y.column_name == "revenue" && y.active == true && x.revenue}
                           </td>
                        )
                     
                      
                    })}
                    </tr>

                    )
                    
                    
                    })}
            </tbody>
            </table>
        </div>
    )
}

export default Table