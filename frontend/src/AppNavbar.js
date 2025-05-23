import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavLink, NavItem, Nav, NavbarText, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import tokenService from './services/token.service';
import jwt_decode from "jwt-decode";
import './static/css/westernTheme.css';


function AppNavbar() {
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const jwt = tokenService.getLocalAccessToken();
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (jwt) {
            setRoles(jwt_decode(jwt).authorities);
            setUsername(jwt_decode(jwt).sub);
        }
    }, [jwt])

    let adminLinks = <></>;
    let ownerLinks = <></>;
    let userLinks = <></>;
    let userLogout = <></>;
    let publicLinks = <></>;

    roles.forEach((role) => {
        if (role === "ADMIN") {
            adminLinks = (
                <>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/players">Players</NavLink>
                    </NavItem >
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/allMatches">Matches</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/achievementsEdit">Achievements</NavLink>
                    </NavItem>
                </>
            )
        }
        if (role === "PLAYER") {
            ownerLinks = (
                <>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/myMatches">My matches</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/statistics">Statistics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/players">Players</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/myFriends">Friends</NavLink>

                    </NavItem>
                </>
            )
        }
        if (role === "VET") {
            ownerLinks = (
                <>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/consultations">Consultations</NavLink>
                    </NavItem>
                </>
            )
        }

        if (role === "CLINIC_OWNER") {
            ownerLinks = (
                <>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/clinics">Clinics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/owners">Owners</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/consultations">Consultations</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to="/vets">Vets</NavLink>
                        <NavLink className='western-navlink' tag={Link} to="/myMatches">My matches</NavLink>
                    </NavItem>
                </>
            )
        }
    })

    if (!jwt) {
        publicLinks = (
            <>
                <NavItem>
                    <NavLink className='western-navlink' id="register" tag={Link} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='western-navlink' id="login" tag={Link} to="/login">Login</NavLink>
                </NavItem>
            </>
        )
    } else {
        userLinks = (<>
        </>
        )
        userLogout = (
            <>
                {!roles.includes('ADMIN') ?
                    <NavItem>
                        <NavLink className='western-navlink' tag={Link} to={`/myProfile/${username}`}>{username}</NavLink>
                    </NavItem>
                    :
                    <NavbarText className='western-navbar-text'>{username}</NavbarText>
                }
                <NavItem className="d-flex">
                    <NavLink className='western-navlink' id="logout" tag={Link} to="/logout">Logout</NavLink>
                </NavItem>
            </>
        )

    }

    return (
        <div>
            <Navbar expand="md" dark className='western-navbar'>
                <NavbarBrand href="/">
                    <img alt="logo" src="/logo-gunfighter.png" style={{ height: 40, width: 200 }} />
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="ms-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="me-auto mb-2 mb-lg-0" navbar>
                        {userLinks}
                        {adminLinks}
                        {ownerLinks}
                    </Nav>
                    <Nav className="ms-auto mb-2 mb-lg-0" navbar>
                        {publicLinks}
                        {userLogout}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavbar;