import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

function Dashboard(props) {

    const [userAuthenticated, setUserAuthenticated] = useState({
        auth: false
    });
    const [loading, setLoading] = useState(true);

    const links = [
        {
            "className": "dashboard-sidebar-link",
            "content": "User information",
            "href": "/dashboard/user-info"
        },
        {
            "className": "dashboard-sidebar-link",
            "content": "Suggest question",
            "href": "/dashboard/suggest-question"
        },
        {
            "className": "dashboard-sidebar-link",
            "content": "Treći link",
            "href": "/dashboard/3"
        },
        {
            "className": "dashboard-sidebar-link",
            "content": "Četvrti link",
            "href": "/dashboard/4"
        }
    ]

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const data = {
            "token": localStorage.token,
        }
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        const result = await axios.post(
            'https://zrilich.pythonanywhere.com/api/v1/authenticate-user', data, config
        );
        
        setUserAuthenticated({
            auth: jwt_decode(result.data).authentication
        });
        localStorage.auth = jwt_decode(result.data).authentication;
        setLoading(false);
    };

    if (loading) {
        return (
            <>
                <div className="dashboard-loading">
                    <ReactLoading type={"spin"} color={"grey"} />
                    <h6>Authenticating...</h6>
                </div>
            </>
        )
    } else {
        if (userAuthenticated.auth) {
            return (
                <>
                    <div className="dashboard">
                        <div className="dashboard-sidebar">
                        {links.map((link, index) => 
                            <>
                            {props.current === index ? <a className={`${link.className} current`} aria-current="page">{link.content}</a> : <a className={link.className} href={link.href}>{link.content}</a>}
                            </>
                        )}
                        </div>
                        <props.comp></props.comp>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Redirect to="/login" />
                </>
            )
        }
    }

}

export default Dashboard