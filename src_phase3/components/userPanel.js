import React from 'react'
import './AdminPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginWarning from "./loginWarning.js";
import auth from "./jwtTokenDecode";

class AdminPanel extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            user_id: "",
            user_title: "Mrs",
            user_name: "",
            user_lastname: "",
            user_phone: "",
            user_email: "",
            user_birthday: "",
            user:[],
            click: false,
            type: "",
            jwtToken: cookies.get('jwtToken') || null
        };
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    select(e) { /* Call Web Service to select a Customer */
        e.preventDefault();
        if(this.state.user_id !== ""){
            axios.get("http://localhost:4309/customer/" + this.state.user_id)
            .then((response) => { 
                console.log(response.data);
                const user = response.data;
                this.setState({user, click: true, type: "select"});
            })
        } else if(this.state.user_name !== ""){
            axios.get("http://localhost:4309/searchUser="+this.state.user_name)
            .then((response) => { 
                console.log(response.data);
                const user = response.data;
                this.setState({user, click: true, type: "selectall"});
            })
        } else if(this.state.user_title !== ""){
            axios.get("http://localhost:4309/searchTitle=" + this.state.user_title)
            .then((response) => { 
                console.log(response.data);
                const user = response.data;
                this.setState({user, click: true, type: "selectall"});
            })   
        }    
    }
    insert(e) { /* Call Web Service to insert a new Customer */
        e.preventDefault();
        fetch("http://localhost:4309/customer/", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                accept: "application/json"
            },
            "body": JSON.stringify({
                customer: {
                    Customer_ID: this.state.user_id,
                    Title: this.state.user_title,
                    Firstname: this.state.user_name,
                    Lastname: this.state.user_lastname,
                    Phone: this.state.user_phone,
                    Email: this.state.user_email,
                    Date_Of_Birth: this.state.user_birthday
                }
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            this.selectall();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    update(e) { /* Call Web Service to update a Customer */
        e.preventDefault();
        fetch("http://localhost:4309/customer/", {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                accept: "application/json"
            },
            "body": JSON.stringify({
                customer: {
                    Customer_ID: this.state.user_id,
                    Title: this.state.user_title,
                    Firstname: this.state.user_name,
                    Lastname: this.state.user_lastname,
                    Phone: this.state.user_phone,
                    Email: this.state.user_email,
                    Date_Of_Birth: this.state.user_birthday
                }
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            this.selectall();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    delete(e) { /* Call Web Service to delete a Customer */
        e.preventDefault();
        fetch("http://localhost:4309/customer/", {
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                accept: "application/json"
            },
            "body": JSON.stringify({
                Customer_ID: this.state.user_id,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            this.selectall();
        })
        .catch((err) => {
            console.log(err);
        });
        
    }
    selectall() { /* Call Web Service to select all Customer */
        axios.get("http://localhost:4309/customer/")
        .then((response) => {
            console.log(response.data.customer);
            const user = response.data.customer;
            this.setState({user, click: true, type: "selectall"});
        })
    }
    handleChange(changeObject) {
        this.setState(changeObject);
    }
    render() {
        const user = auth(this.state.jwtToken);
        if(user) {
            if(user.role == 'user') {
                return (
                    <LoginWarning role='user'/>
                );
            }
            return (
                <body>
                    {/* Header */}
                    <header>
                        <div class="seven">
                            <section class="images">
                                <figure>
                                    <img src={"https://www.7eleven.co.th/static/imgs/logo.svg"} alt="logo" style={{width:"80px"}} />
                                </figure>    
                            </section>
                        </div>
                    </header> 

                    {/* Main Content */}
                    <h1>Admin Panel</h1>

                    {/* Admin Panel */}
                    <div class="container">
                        {/* Customer */}
                        <div class="box">
                            <form action="">
                                <h4><b>User Management</b></h4>
                                <hr />
                                {/* Form */}
                                <div class="form">
                                    {/* Customer ID */}
                                    <label for="user_id">User ID: </label>
                                    <input type="text" placeholder="Enter ID" class="pattern" name="user_id" id="user_id" value={this.setState.user_id} onChange={(e)=>this.handleChange({user_id: e.target.value})} /><br />
                                    
                                    {/* User Title */}
                                    <label for="user_title">User Title: </label> 
                                    <select name="user_title" id="user_title" value={this.setState.user_title} onChange={(e)=>this.handleChange({user_title: e.target.value})}>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Mr">Mr.</option>
                                    </select><br/>

                                    {/* Prodeuct User Firstname */}
                                    <label for="user_name">User Firstname: </label> 
                                    <input type="text" placeholder="Enter Firstname" class="pattern" name="user_name" id="user_name" value={this.setState.user_name} onChange={(e)=>this.handleChange({user_name: e.target.value})} /><br />
                                    
                                    {/* User User Lastname */}
                                    <label for="user_lastname">User Lastname: </label> 
                                    <input type="text" placeholder="Enter Lastname" class="pattern" name="user_lastname" id="user_lastname" value={this.setState.user_lastname} onChange={(e)=>this.handleChange({user_lastname: e.target.value})} /><br />
                                    
                                    {/* User Phone number */}
                                    <label for="user_phone">User Phone number: </label> 
                                    <input type="text" placeholder="Enter Phone number" class="pattern" name="user_phone" id="user_phone" value={this.setState.user_phone} onChange={(e)=>this.handleChange({user_phone: e.target.value})} /><br />
                                    
                                    {/* User User Email */}
                                    <label for="user_email">User Email: </label> 
                                    <input type="text" placeholder="Enter Email" class="pattern" name="user_email" id="user_email" value={this.setState.user_email} onChange={(e)=>this.handleChange({user_email: e.target.value})} /><br />
                                    
                                    {/* User Birthday */}
                                    <label for="user_birthday">User Birthday: </label> 
                                    <input type="text" placeholder="Enter Birthday" class="pattern"name="user_birthday" id="user_birthday" value={this.setState.user_birthday} onChange={(e)=>this.handleChange({user_birthday: e.target.value})} /><br />
                                </div>

                                {/* Button */}
                                <div class="button">
                                    <input type="button" value="Insert" id="adminUser_insert" onClick={(e)=>this.insert(e)} />
                                    <input type="button" value="Update" id="adminUser_update" onClick={(e)=>this.update(e)} />
                                    <input type="button" value="Select" id="adminUser_select" onClick={(e)=>this.select(e)} />
                                    <input type="button" value="Select All" id="adminUser_selecta" onClick={(e)=>this.selectall()} />
                                    <input type="button" value="Delete" id="adminUser_delete" onClick={(e)=>this.delete(e)} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <h5 id="found" class="container">{this.state.user.length} Customer (s)</h5> 
                    <div>{showPattern(this.state.click, this.state.user, this.state.type)}</div>
                </body>
            );
        } else {
            return (
                <LoginWarning role='none'/>
            );
        }
    }
}
// Show the patter of product result
function showPattern(click, user, type) {
    if(click === true && type === 'selectall'){
    return(
        <div id="user_output">
            {
                user.map(acc =>
                    <section class="container probox">
                        <div class="one" >
                        </div>
                        <div  class="double-two">
                            <p class="customer">User ID: {acc.Customer_ID}</p>
                            <p class="customer">Title: {acc.Title}</p>
                            <p class="customer">Firstname: {acc.Firstname}</p>
                            <p class="customer">Lastname: {acc.Lastname}</p>
                            <a href={"http://localhost:4309/resultUser/id=" + acc.Customer_ID}>
                                Provide More Information
                            </a> 
                        </div>
                    </section>  
                )
            }
            </div>
    )
    } else if(click === true && type === 'select' && user[0] !== undefined){
        return(
            <div id="user_output">
                <section class="container probox">     
                   <div class="one">
                   </div>
                   <div  class="double-two">
                        <p class="customer">User ID: {user[0].Customer_ID}</p>
                        <p class="customer">Title: {user[0].Title}</p>
                        <p class="customer">Firstname: {user[0].Firstname}</p>
                        <p class="customer">Lastname: {user[0].Lastname}</p>
                        <a href={"http://localhost:4309/resultUser/id=" + user[0].Customer_ID}>
                            Provide More Information
                        </a>
                   </div>         
                </section>
            </div>  
        )
    }
}
export default withCookies(AdminPanel);