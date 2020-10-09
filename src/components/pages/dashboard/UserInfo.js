import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';
import moment from 'moment';

const TITLE = "User info";

function UserInfo() {

    const [data, setData] = useState([]);
    const [dates, setDates] = useState({
        created_at: "",
        updated_at: ""
    });
    const [state, setState] = useState({
        isLoading: true
    });

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

    const checkIfWithin24hrs = (timesString) => {
        const timestampOld = Math.floor(new Date(timesString) / 1000);
        const date = new Date();
        const currentTime = Math.floor(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())/1000);
        const timestamp24hrsAgoFromNow = currentTime - (24 * 3600);
        const within24hrsAgo = timestamp24hrsAgoFromNow <= timestampOld;
        console.log(timestampOld);
        console.log(timestamp24hrsAgoFromNow);
        console.log(within24hrsAgo);
        return within24hrsAgo;
    };
        

    if (state.isLoading) {
        return (
            <>
                <div className="dashboard-component-loading">
                    <ReactLoading type={"spin"} color={"grey"} />
                    <h6>Loading user information...</h6>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-component">
                    <h1 className="pb-3">User information</h1>
                    <p>First Name: {data.first_name}</p>
                    <p>Last Name: {data.last_name}</p>
                    <p>Email: {data.email}</p>
                    {checkIfWithin24hrs(dates.created_at) ?
                        <>
                            <small className="text-muted">Created {moment(dates.created_at).fromNow()}</small>
                        </>
                    :
                        <>
                            <small className="text-muted">Created at: {moment(dates.created_at).format('DD/MM/YYYY, HH:mm:ss')}</small>
                        </>
                    }
                    {checkIfWithin24hrs(dates.updated_at) ?
                        <>
                            <small className="text-muted">Updated {moment(dates.updated_at).fromNow()}</small>
                        </>
                    :
                        <>
                            <small className="text-muted">Updated at: {moment(dates.updated_at).format('DD/MM/YYYY, HH:mm:ss')}</small>
                        </>
                    }
                </div>

            </>
        )
    }

}

export default UserInfo