import React, { useEffect } from 'react';

const TITLE = "404";

function NotFound() {

    useEffect(() => {
        document.title = TITLE;
    }, []);

    return (
        <>
            <div className="error404">
                <h1>Error 404</h1>
                <p>Ops! Page Not Found!</p>
                <a role="button" className="btn btn-outline-danger" href="/">Go to Home</a>
            </div>
        </>
    )
    
}

export default NotFound;