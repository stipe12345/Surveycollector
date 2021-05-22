import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Button from "@material-ui/core/Button";
import Footer from '../layout/Footer'
import NotLoggedHome from "../layout/MainNotLogged";
import LoggedHome from "../layout/MainLogged";
function Home () {
    const {userData} = useContext(UserContext);
    return (
        <div>
            {userData.user ? (
                <LoggedHome/>
            ) : (
                <>
                   <NotLoggedHome/>
                </>
            )}
            <Footer/>
        </div>
    );
}
 
export default Home;