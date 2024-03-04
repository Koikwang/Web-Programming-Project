import React from 'react'
import styled from 'styled-components';
import './signin.css';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginWarning from "./loginWarning.js";
import auth from "./jwtTokenDecode";

import { BrowserRouter } from 'react-router-dom';

const MyP = styled.p`
    font-size: 22px;
    color: white; 
`;
const MyInput = styled.input`
    height: 30px;
    width: 250px;
    font-size: 16px;
    border-radius: 100px;
    border-color: #ffffff;
    margin-bottom: 10px;
`;
const Submit = styled.button`
    height: 35px;
    width: 100px;
    font-size: 20px;
    margin-top: 10px;
    border-radius: 80px;
    border-color: #ffffff;
    color: green;
`;
const Myhr = styled.hr`
    background: white;
`;

class Signin extends React.Component 
{
    render() 
    {
        return (
        <div class="out">
            <div className="login-container"> 
                <form action='http://localhost:4309/login-submit' method="post">
                    <label>
                        <div className="brandlogo"></div>
                        <div className="brandname">7-Eleven</div> 
                        <div className="name">Sign In</div>
                        <Myhr/>
                            <MyP>Username : </MyP>
                            <MyInput type="text" placeholder="Your Username" name="username" required title="Please fill out this field." />

                            <MyP>User Password :</MyP>
                            <MyInput type="User_Password" placeholder="Your Password" name="password" required title="Must contain at least one number 
                                and one uppercase and lowercase letter, and at least 8 or more characters" />
                        <Myhr/>    
                    </label>
                    <Submit type="submit" value="submit">Sign-in</Submit>
                </form>
            </div>
        </div>    
        );
    }
}

export default Signin;

    