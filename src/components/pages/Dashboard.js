import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';

const TITLE = "Dashboard";

function Dashboard(props) {

    const [data, setData] = useState([])
    const [state, setState] = useState({
        isLoading: true
    })

    useEffect(() => {
        document.title = TITLE;
        const loginSubmit = async (e) => {
            const data = {
                "token": localStorage.token,
            }
            const config = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            const res = await axios.post(
                'https://zrilich.pythonanywhere.com/api/v1/get-user-details', data, config
            );
            setData(res.data)
            setState({
                isLoading: false
            })
        
        }
        loginSubmit();
    }, []);
        

    if (state.isLoading) {
        return (
            <>
            <div className="question">
                <ReactLoading type={"spin"} color={"grey"} />
                <h6>Loading dashboard...</h6>
            </div>
            </>
        )
    } else {
        return (
            <>
                <div className="loginForm">
                    <h1 className="pb-3">Dashboard</h1>
                </div>
            </>
        )
    }

}

export default Dashboard