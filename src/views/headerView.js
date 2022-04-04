import React from 'react';
import '../css/header.css'

function HeaderView(props) {
    return <div className="header">
        <span className="h1">Wordle</span>
        <span className="sup">(SWE)</span>
    </div>
}

export default HeaderView;