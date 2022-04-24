import React from 'react';
import '../css/header.css'

function HeaderView(props) {
    return <div className="header">
        <div></div>
        <div className="title">
            <span className="h1" style={{color: "rgb(0, 38, 206)"}}>S</span>
            <span className="h1" style={{color: "rgb(243, 240, 43)"}}>w</span>
            <span className="h1" style={{color: "rgb(0, 38, 206)"}}>e</span>
            <span className="h1">rdle</span>
        </div>
        <button className="statButton" onClick={props.redirect}>
            <span className="bar1"/>
            <span className="bar2"/>
            <span className="bar3"/>
        </button>

    </div>
}

export default HeaderView;