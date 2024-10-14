import { useState } from "react";
import './ToggleButton.css'

export function Toggle({ label, toggled, onClick }){
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className="toggle-container">
            <strong className="toggle-title">{label}</strong>
            <input className="toggle-switch__input" type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className="toggle-switch__span" />
        </label>
    )
};