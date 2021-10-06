import React from 'react'
import './Button.css'

function Button(props){
    return(
        <button 
            className={props.className} 
            style={{float:props.align_data}}
            onClick={props.callback}
            
            >
            {props.has_icon == "true" &&  <i className={props.icon_class }></i>}
            {props.btn_text}
        </button>
    )
}
export default Button