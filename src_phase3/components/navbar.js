import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';

const Nav = styled.nav`
    display: flex;
    background: aliceblue;
`;

class AdminNav extends React.Component {
    
    render() {
        const navContainer = {
            display: 'flex',
            flexDirection: 'row'
        }
        
        return (
            <Nav>
                <article className='container' style={navContainer}>
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/login">Login</Link></div>
                    <div><Link to="/adminPanel">Admin Panel</Link></div> 
                    <div><Link to="/userPanel">User Panel</Link></div>
                </article>
            </Nav>
        );
    }
}

export default AdminNav;