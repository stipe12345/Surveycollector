import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

const FinishSurvey = (props) => {
    const history = useHistory();

    useEffect(() => {
        console.log(props)
        
    }, []);
    return (<>Your link:192.168.10.100:3000/survey/{props.location.state.props}
    <button onClick={()=>history.push({pathname:`/survey/${props.location.state.props}`,state:{props:props.location.state.props}})}>Open it!</button></> );
}
 
export default FinishSurvey;