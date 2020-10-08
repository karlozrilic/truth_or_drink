import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';

function Logout() {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.token = '';
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <>
                <div className="question">
                    <ReactLoading type={"spin"} color={"grey"} />
                    <h6>Logging out...</h6>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Redirect to="/" />
            </>
        )
    }
};

export default Logout