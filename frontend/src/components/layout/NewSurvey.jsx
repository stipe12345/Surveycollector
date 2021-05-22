import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Button from "@material-ui/core/Button";
import Footer from '../layout/Footer'
import NotLoggedHome from "../layout/MainNotLogged";
import LoggedHome from "../layout/MainLogged";
import Radio from '../questions/RadioQuestion';
function NewSurvey () {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    useEffect(()=>{
        if(!userData.user)
        {
            alert("you need to login to use this page!");
            history.push("/");
        }
    })
    return (
        <form>
           <Radio number="5"/>
        </form>
    );
}
 
export default NewSurvey;