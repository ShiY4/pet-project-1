import React from "react";
import './Button.css'

export function Button({ title, className }) {

    className = `button ${className}`;
    
    return (
        <button className={className}>{title}</button>
    )
}