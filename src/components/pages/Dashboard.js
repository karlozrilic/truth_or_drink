import React from 'react';

function Dashboard(props) {

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

}

export default Dashboard