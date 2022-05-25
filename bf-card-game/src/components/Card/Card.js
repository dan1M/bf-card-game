import React from "react";
import Draggable, { DraggableCore } from "react-draggable";
import yy from '../../assets/yan-yuan.png'

const Card = () => {
    return(        
        <Draggable>
            <div className="card">
                <img src={yy} alt="card"/>
            </div>
        </Draggable>        
    );
}

export default Card;