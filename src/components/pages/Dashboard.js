import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';
import moment from 'moment';

const TITLE = "Dashboard";

function Dashboard(props) {

    const [data, setData] = useState([])
    const [dates, setDates] = useState({
        created_at: "",
        updated_at: ""
    })
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
            setData(jwt_decode(res.data))
            setDates({
                created_at: jwt_decode(res.data).created_at,
                updated_at: jwt_decode(res.data).updated_at
            })
            setState({
                isLoading: false
            })
        }
        loginSubmit();
    }, []);
        

    if (state.isLoading) {
        return (
            <>
            <div className="dashboard-loading">
                <ReactLoading type={"spin"} color={"grey"} />
                <h6>Loading dashboard...</h6>
            </div>
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard">
                    <div className="dashboard-sidebar">
                        <a className="dashboard-sidebar-link current" aria-current="page" href="#">General</a>
                        <a className="dashboard-sidebar-link" href="#">Drugi link</a>
                        <a className="dashboard-sidebar-link" href="#">Treći link</a>
                        <a className="dashboard-sidebar-link" href="#">Četvrti link</a>
                    </div>
                    <div className="dashboard-component">
                        <h1 className="pb-3">Dashboard</h1>
                        <p>First Name: {data.first_name}</p>
                        <p>Last Name: {data.last_name}</p>
                        <p>Email: {data.email}</p>
                        <small>Created at: {moment(dates.created_at).format('DD/MM/YYYY, HH:mm:ss')}</small>
                        <small>Updated at: {moment(dates.updated_at).format('DD/MM/YYYY, HH:mm:ss')}</small>
                    </div>
                </div>
            </>
        )
    }

}

export default Dashboard