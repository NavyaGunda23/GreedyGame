import React from 'react'
import './NoData.css'

function InfoMessage(){
    return(
        <div className="no-data-container">
            <div>
                <i className="no-data-image"></i>
            </div>
            <div className="no-data-info">
                 <h3>Hey! Something Off!</h3>
               <h3>We couldnt display the given data</h3>
               <p>Try changing your filters or selecting different date</p>
            </div>
              
        </div>
    )
}

export default InfoMessage