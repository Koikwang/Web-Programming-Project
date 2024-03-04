import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginWarning from "./loginWarning.js";
import auth from "./jwtTokenDecode";

class Home extends React.Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            customers: [],
            products: [],
            jwtToken: cookies.get('jwtToken') || null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4309/product')
        .then(res => {
            const products = res.data;
            this.setState({ products })
        })

        axios.get('http://localhost:4309/customer')
        .then(res => {
            const customers = res.data.customer;
            this.setState({ customers })
        })
    }

    render() {
        const profileSection = {
            width: '50%',
            height: '100px',
            border: '5px green solid',
            marginTop: '35px',
            marginBottom: '35px',
            background: 'white',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center'
        }
        
        const dataSection = {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '1000px',
            // border: '2px red solid',
            background: 'white',
            padding: '50px',
            borderRadius: '25px',
            border: '7.5px green solid',
            marginBottom: '50px'
        }
        
        const user = auth(this.state.jwtToken);
        if(user) {
            if(user.role == 'user') {
                return (
                    <LoginWarning role='user'/>
                );
            }
            return (
                <div className="container">
                    <div className="container" style={profileSection}>
                        <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png" id="profile-icon" alt="..."/>
                        <div style={{marginLeft: '20px'}}>
                            id: {user.id}<br/>
                            username: {user.username}<br/>
                            role: {user.role}
                        </div>
                    </div>
                    <div className="container" style={dataSection}>
                        <h3>Current promotion</h3>
                        <div id="promo" className="container"> 
                            <div>
                                <img className="promo-img" src={require("./image-1/promo_1.png")} alt="..."/>
                            </div>
                            <div>
                                <img className="promo-img" src={require("./image-1/promo_2.png")} alt="..."/>
                            </div>
                            <div>
                                <img className="promo-img" src={require("./image-1/promo_3.png")} alt="..."/>
                            </div>
                        </div>
                        <div className="container" style={{display: 'flex', flexDirection: 'column', padding: '20px', height: '70%'}}>
                            <h3>Overview user</h3>
                            <a href="http://localhost:5309/userPanel"><button>edit user</button></a>
                            <div className="data-table">    
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer_ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Firstname</th>
                                            <th scope="col">Lastname</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Date_Of_Birth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.customers
                                            .map(customer => 
                                                <tr key={customer.Customer_ID}>
                                                    <th scope="row">{customer.Customer_ID}</th>
                                                    <td>{customer.Title}</td>
                                                    <td>{customer.Firstname}</td>
                                                    <td>{customer.Lastname}</td>
                                                    <td>{customer.Phone}</td>
                                                    <td>{customer.Email}</td>
                                                    <td>{customer.Date_Of_Birth}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <h3>Overview product</h3>
                            <a href="http://localhost:5309/adminPanel"><button>edit product</button></a>
                            <div className="data-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product_ID</th>
                                            <th scope="col">Name_Of_Product</th>
                                            <th scope="col">Member_Point</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Product_Type</th>
                                            <th scope="col">Information</th>
                                            <th scope="col">Img</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.products
                                            .map(product =>
                                                <tr key={product.Product_ID}>
                                                    <th scope="row">{product.Product_ID}</th>
                                                    <td>{product.Name_Of_Product}</td>
                                                    <td>{product.Member_Point}</td>
                                                    <td>{product.Price}</td>
                                                    <td>{product.Product_Type}</td>
                                                    <td>{product.Information}</td>
                                                    <td>{product.Img}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <LoginWarning role='none'/>
            );
        }
    }
}

export default withCookies(Home);