import React from 'react';
import { Navbar as NavbarBoot, Nav, NavDropdown } from 'react-bootstrap';

function Navbar(props) {

    return (
        <div className="fixed-top">
        <NavbarBoot className="text-center" variant="light" bg="warning" expand="lg">
            <NavbarBoot.Brand href="/" className="navbar-logo">
                <img src={process.env.PUBLIC_URL + '/logo-dark.webp'} /*src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg"*/ width="150" height="45" className="d-inline-block align-top" alt="" loading="lazy" />
            </NavbarBoot.Brand>
            <NavbarBoot.Toggle aria-controls="basic-navbar-nav" />
            <NavbarBoot.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto" className="justify-content-end">
                    <Nav.Link href="/" >Home</Nav.Link>
                    <Nav.Link href="/how-to-play">How to play</Nav.Link>
                    <Nav.Link href="/categories">Categories</Nav.Link>
                    {!props.valid ?
                        <Nav.Link href="/login" >Login</Nav.Link>
                    :
                    <>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/dashboard/user-info">User info</a>
                                <a className="dropdown-item" href="/dashboard/suggest-question">Suggest question</a>
                                <a className="dropdown-item" href="/dashboard/my-suggestions">My suggestions</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/logout">Logout</a>
                            </div>
                        </li>
                    </>
                    }
                </Nav>
            </NavbarBoot.Collapse>
        </NavbarBoot>
        </div>
    )

}

export default Navbar