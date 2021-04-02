import {Checkbox, useCheckboxState} from "pretty-checkbox-react"
import React from "react";

export default function TestApp(){
    const [fired, setFired] = React.useState(false);

    // don't forget to memoize!
    const onChange = React.useCallback(e => {
        // the original event is passed as an argument
        alert("Check box state now is "+cb_state.state.toString());
        setFired(true);
    }, []);

    const cb_state = useCheckboxState({ onChange });
    return (
        <div>
            {console.log(cb_state.state)}
            <Checkbox {...cb_state} color="success">Sample checkbox state : {cb_state.state+''}</Checkbox>
        </div>
    );
};