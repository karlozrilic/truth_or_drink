import React, {useState, useEffect} from 'react';
import { Navbar as NavbarBoot, Nav } from 'react-bootstrap';

function Navbar(props) {

    return (
        <>
        <NavbarBoot className="fixed-top text-center" variant="dark" bg="dark" expand="lg">
            <NavbarBoot.Brand href="/" className="navbar-logo">
                <img src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> Bootstrap
            </NavbarBoot.Brand>
            <NavbarBoot.Toggle aria-controls="basic-navbar-nav" />
            <NavbarBoot.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto" className="justify-content-end">
                    <Nav.Link href="/">Home</Nav.Link>
                    {!props.valid ?
                        <Nav.Link href="/login">Login</Nav.Link>
                    :
                    <>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/logout">Log Out</Nav.Link>
                    </>
                    }
                    <Nav.Link href="/help">Help</Nav.Link>
                </Nav>
            </NavbarBoot.Collapse>
        </NavbarBoot>
        </>
    )

}

export default Navbar