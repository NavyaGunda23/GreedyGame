import React, { useEffect, useState } from 'react'
import Button from './Button'
import ReactSlider from 'react-slider'
import './Slider.css'

function Filters(props){

   const [ column_data, setColumn_data] = useState(props.app_data)
   var iltes = []
   const [ sliderValues, setSliderValues] = useState({
        min_val:0,
        max_val:0
   })

    const filter_data = (e) => {
          iltes = props.app_data.slice()?.filter(x => 
            (props.col_name == "date" && x.date.indexOf(e.target.value) > -1 ||
        props.col_name == "app_id" && x.app_id.indexOf(e.target.value) > -1 ||
        props.col_name == "requests" && x.requests.toString().includes(e.target.value) == true ||
        props.col_name == "responses" && x.responses.toString().indexOf(e.target.value) > -1 ||
        props.col_name == "impressions" && x.impressions.toString().indexOf(e.target.value) > -1 ||
        props.col_name == "clicks" && x.clicks.toString().indexOf(e.target.value) > -1 ||
        props.col_name == "revenue" && x.revenue.toString().indexOf(e.target.value) > -1 )

        
        )
       
        setColumn_data(iltes)
       
    }


    const applychanges = (e) =>{
        props.callback_data(column_data)
        setColumn_data(column_data)
        e.target.closest(".filter-parenr").classList.add("d-none")
    }
    useEffect(() => {
       
    },[column_data])

   const handleSlider = (data) => {
       
       sliderValues.min_val = data[0]
       sliderValues.max_val = data[1]
       setSliderValues({...sliderValues})
       
       
   }
   const applychangesSlider = (e) => {
    var test = props.app_data.slice().filter(x => x.requests > sliderValues.min_val && x.requests < sliderValues.max_val)
   
    setColumn_data(test)
    props.callback_data(test)
    e.target.closest(".filter-parenr").classList.add("d-none")
   }

    return(
        <div>
            { props.col_name == "date" &&
                    <div className="filter-parent">
                     <input type="text"  onChange={e => filter_data(e) } />
                        <ul className="filter-section" >
                            {column_data.map(x => (
                                <li>{x.date}</li>
                            ))}
                        </ul>
                       <Button 
                             btn_text="Apply"
                             icon_class=""
                             align_data="right"
                             callback={e => applychanges(e)}
                             has_icon="false"
                             className="secondary"
                       />
                     </div>
            }
             { props.col_name == "app_id" &&
                    <div className="filter-parent">
                     <input type="text" onChange={e => filter_data(e) } />
                        <ul className="filter-section" >
                            {column_data.map(x => (
                                <li>{x.app_id}</li>
                            ))}
                        </ul>
                        <Button 
                             btn_text="Apply"
                             icon_class=""
                             align_data="right"
                             callback={e => applychanges(e)}
                             has_icon="false"
                             className="secondary"
                       />
                     </div>
            }
             { props.col_name == "requests" &&
                    <div className="filter-parent" style={{width:'200px'}}>
                    
                      
                       <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            max={Math.max(...column_data.map(item => item.requests))}
                            min={Math.min(...column_data.map(item => item.requests))}
                            defaultValue={[Math.min(...column_data.map(item => item.requests)),Math.max(...column_data.map(item => item.requests)) ]}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow} </div>}
                            pearling
                            minDistance={10}
                            onChange={e => handleSlider(e)}
                        />
                        <Button 
                             btn_text="Apply"
                             icon_class=""
                             align_data="right"
                             callback={e => applychangesSlider(e)}
                             has_icon="false"
                             className="secondary"
                       />
                     </div>
            }
             { props.col_name == "responses" &&
                    <div className="filter-parent">
                     <input type="text" onChange={e => filter_data(e) } />
                        <ul className="filter-section" >
                            {column_data.map(x => (
                                <li>{x.responses}</li>
                            ))}
                        </ul>
                        <Button 
                             btn_text="Apply"
                             icon_class=""
                             align_data="right"
                             callback={e => applychanges(e)}
                             has_icon="false"
                             className="secondary"
                       />
                     </div>
            }
             { props.col_name == "impressions" &&
                    <div className="filter-parent">
                     <input type="text" onChange={e => filter_data(e) } />
                        <ul className="filter-section" >
                            {column_data.map(x => (
                                <li>{x.impressions}</li>
                            ))}
                        </ul>
                        <Button 
                             btn_text="Apply"
                             icon_class=""
                             align_data="right"
                             callback={e => applychanges(e)}
                             has_icon="false"
                             className="secondary"
                       />
                     </div>
            }
             { props.col_name == "clicks" &&
                    <div className="filter-parent">
                     <input type="text" onChange={e => filter_data(e) } />
                        <ul className="filter-section" >
                            {column_data.map(x => (
                                <li>{x.clicks}</li>
                            ))}
                        </ul>
                        <Button 
                             btn_text="Apply"
                             icon_class=""
                             align_data="right"
                             callback={e => applychanges(e)}
                             has_icon="false"
                             className="secondary"
                       />
                     </div>
            }

            { props.col_name == "revenue" &&
                                <div className="filter-parent">
                                <input type="text" onChange={e => filter_data(e) } />
                                    <ul className="filter-section" >
                                        {column_data.map(x => (
                                            <li>{x.revenue}</li>
                                        ))}
                                    </ul>
                                    <Button 
                                            btn_text="Apply"
                                            icon_class=""
                                            align_data="right"
                                            callback={e => applychanges(e)}
                                            has_icon="false"
                                            className="secondary"
                                    />
                                </div>
                        }


                   
            

           
        </div>
    )
}

export default Filters