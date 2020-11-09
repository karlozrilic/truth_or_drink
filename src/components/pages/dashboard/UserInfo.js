import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';
import moment from 'moment';
import { Alert, Fade } from 'react-bootstrap';

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
    const [enableSave, setEnableSave] = useState(false);
    const [edit, setEdit]= useState(true);
    const [editData, setEditData] = useState({
        first_name: null,
        last_name: null
    });
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    useEffect(() => {
        document.title = TITLE;
        const loginSubmit = async () => {
            const data = {
                "token": localStorage.token,
            };
            const config = {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            };
            const res = await axios.post(
                "https://zrilich.pythonanywhere.com/api/v1/get-user-details", data, config
            );
            setData(jwt_decode(res.data));
            setDates({
                created_at: jwt_decode(res.data).created_at,
                updated_at: jwt_decode(res.data).updated_at
            });
            setState({
                isLoading: false
            });
        }
        loginSubmit();
    }, [sent]);

    const checkIfWithin24hrs = (timesString) => {
        const timestampOld = Math.floor(new Date(timesString) / 1000);
        const date = new Date();
        const currentTime = Math.floor(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())/1000);
        const timestamp24hrsAgoFromNow = currentTime - (24 * 3600);
        const within24hrsAgo = timestamp24hrsAgoFromNow <= timestampOld;
        return within24hrsAgo;
    };

    const toggleEdit = () => {
        if (edit) {
            setEdit(false);
        } else {
            setEditData({
                first_name: null,
                last_name: null
            });
            setEdit(true);
            setEnableSave(false);
        }
    };

    const firstNameChange = (event) => {
        setEditData({
            first_name: event.target.value,
            last_name: editData.last_name
        });
        setEnableSave(true);
    };

    const lastNameChange = (event) => {
        setEditData({
            first_name: editData.first_name,
            last_name: event.target.value
        });
        setEnableSave(true);
    };

    const saveUserInfo = async () => {
        if (!sent) {
            setState({
                isLoading: true
            });
            const data = {
                "token": localStorage.token,
                "first_name": editData.first_name,
                "last_name": editData.last_name
            };
            const config = {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            };
            const res = await axios.post(
                "https://zrilich.pythonanywhere.com/api/v1/update-user-info", data, config
            );
            if (jwt_decode(res.data).error) {
                setMessage(jwt_decode(res.data));
            } else {
                setMessage(jwt_decode(res.data));
                setEditData({
                    first_name: null,
                    last_name: null
                });
                setData(jwt_decode(res.data));
                setDates({
                    created_at: jwt_decode(res.data).created_at,
                    updated_at: jwt_decode(res.data).updated_at
                });
                setState({
                    isLoading: false
                });
            }
            setEnableSave(false);
            setEdit(true);
            setSent(true);
        }
    };

    if (state.isLoading) {
        return (
            <>
                <div className="dashboard-component">
                    <h1 className="text-left">User information</h1>
                    <hr />
                    <div className="dashboard-component-loading">
                        <ReactLoading type={"spin"} color={"grey"} />
                        <h6>Loading user information...</h6>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-component text-center">
                    <h1 className="text-left">User information</h1>
                    <hr />
                    {sent &&
                    <>
                        {message.message ?
                            <Alert variant="success" onClose={() => setSent(false)} dismissible transition={Fade}>
                            {message.message}
                        </Alert>
                    :
                        <Alert variant="danger" onClose={() => setSent(false)} dismissible transition={Fade}>
                            {message.error}
                        </Alert>
                        }
                    </>
                    }
                    
                    <p>First Name: <input value={editData.first_name != null ? editData.first_name:data.first_name} disabled={edit} onChange={firstNameChange} /></p>
                    <p>Last Name: <input value={editData.last_name != null ? editData.last_name:data.last_name} disabled={edit} onChange={lastNameChange} /></p>
                    <p>Email: {data.email}</p>
                    {checkIfWithin24hrs(dates.created_at) ?
                        <>
                            <small className="text-muted">Profile created {moment(dates.created_at).fromNow()}</small>
                        </>
                    :
                        <>
                            <small className="text-muted">Profile created at: {moment(dates.created_at).format('DD/MM/YYYY, HH:mm:ss')}</small>
                        </>
                    }
                    {checkIfWithin24hrs(dates.updated_at) ?
                        <>
                            <small className="text-muted">Profile last updated {moment(dates.updated_at).fromNow()}</small>
                        </>
                    :
                        <>
                            <small className="text-muted">Profile last updated at: {moment(dates.updated_at).format('DD/MM/YYYY, HH:mm:ss')}</small>
                        </>
                    }
                    <div className="btn-row">
                        <button className="btn btn-outline-primary m-3" onClick={toggleEdit}>{edit ? "Edit":"Cancel"}</button>
                        <button className="btn btn-outline-success m-3" disabled={!enableSave} onClick={saveUserInfo}>Save</button>
                    </div>
                </div>

            </>
        )
    }

}

export default UserInfo