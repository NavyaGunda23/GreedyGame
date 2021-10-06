import React, { useEffect, useState } from 'react';
import './Setting.css'
import Button from './Button'

function Setting(props){

    const [ visibility, setVisibility ] = useState(false)
//    const [list_data, setList_data ] = useState()
    const [ header, setHeader] = useState(props.order.slice())

    const [ list , setList] = useState([])

    const toggleVisibility = () => {

        setHeader(props.order)

        header.map((x => {
            list.map(y => {
                if(y.name == x.column_name){
                    x.active = y.active != "on" ? true : false
                }
            })
            if( list?.indexOf(x?.column_name) > -1 ){
                x.active = true
            }
        }))
        // setHeader({...header})
        setVisibility(!visibility)
        // setHeader(...props.order)
    }

    const cancel_action = () => {
      console.log(list)
      setHeader(props.order)
        setVisibility(!visibility)
    }

    const save_changes = (e) => {
        let order1 = []
        console.log("save cahnged")
        setVisibility(!visibility)
        var slected_order = header;
        [...e.target.closest(".setting-section").querySelectorAll(".setting-item.active")].map(x => order1.push(x.innerText))
       
        props.callBack(slected_order,order1,header)
        list.length = 0
        setList(list)
    }

    const active_column = (e) => {
        
        e.target.classList.toggle("active")
        header.map(x => {
            if(x.column_name == e.target.innerText){
                x.active = !x.active
            }
        })
        if(e.target.classList.contains("active")){
            list.push({name:e.target.innerText,active:"on"})
        }else{
            list.push({name:e.target.innerText,active:"off"})
        }
       

        setList(list)
        
       
    }

    useEffect(() => {
       
    },[header])
 
    var draggedItem;
    var items;

    const onDragStart = (e, index) => {
        draggedItem = header[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
        e.dataTransfer.setDragImage(e.target, 20, 20);
    };

    const onDragOver = (index) => {
        const draggedOverItem = header[index];
      
        // if the item is dragged over itself, ignore
        if (draggedItem === draggedOverItem) {
          return;
        }
    
        items = header.filter((item) => item !== draggedItem)
    
       
        items.splice(index, 0, draggedItem)
      
       
       
      };
    
   
    
      const onDragEnd = (e) => {
        setHeader([ ...items ])
        // e.preventDefault()

        
      };

    return(
        <div>
            <Button 
                btn_text="settings"
                icon_class="icon-setting"
                align_data="right"
                callback={toggleVisibility}
                has_icon="true"
                className="primary"
            />
           
           {visibility && 
           <div className="setting-parent">
                <div className="setting-section">
                    <div className="setting-list" 
                    
                    >
                        {console.log("header",header)}
                        { header.map( (x,i) => (
                          
                            <div className={x?.active == true ? "setting-item active" : "setting-item"} key = {i} onClick={e => active_column(e)}
                            draggable='true'
                            onDragEnd={e => onDragEnd(e)}
                             onDragStart={e => onDragStart(e,i)}
                             onDragOver={e => onDragOver(i)}
                             
                            >
                              {x?.column_name}
                            </div>
                        ))}
                    </div>
                    <div className="action-section" >
                        <Button 
                            btn_text="cancel"
                            icon_class=""
                            align_data="left"
                            callback={cancel_action}
                            has_icon="false"
                            className="primary"
                        />
                         <Button 
                            btn_text="Apply Chnages"
                            icon_class=""
                            align_data="left"
                            callback={e => save_changes(e)}
                            has_icon="false"
                            className="secondary"
                        />

                    </div>
                        
                </div>
            </div>
           }
           
        </div>
    )
}

export default Setting