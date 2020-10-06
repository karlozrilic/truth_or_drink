import React from 'react';
import ReactLoading from 'react-loading';

function Logout() {
    localStorage.token = '';
    return (
        <>
            <div className="question">
                <ReactLoading type={"spin"} color={"grey"} />
            </div>
        </>
    )
};

export default Logout