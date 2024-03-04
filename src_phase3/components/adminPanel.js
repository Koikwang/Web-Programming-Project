import React, {Component} from 'react';
import './AdminPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginWarning from "./loginWarning.js";
import auth from "./jwtTokenDecode";

class AdminPanel extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            pro_id: "",
            pro_name: "",
            pro_mm: "",
            pro_price: "",
            pro_type: "",
            pro_info: "",
            pro_img: "",
            products:[],
            click: false,
            type: "",
            jwtToken: cookies.get('jwtToken') || null
        };
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    select(e) { /* Call Web Service to select a product */
        e.preventDefault();
        if(this.state.pro_id !== ""){
            axios.get("http://localhost:4309/product/"+this.state.pro_id)
            .then((response) => { 
                console.log(response.data);
                const products = response.data;
                this.setState({products, click: true, type: "select"});
            })
        } else if(this.state.pro_name !== ""){
            axios.get("http://localhost:4309/searchProductName="+this.state.pro_name)
            .then((response) => { 
                console.log(response.data);
                const products = response.data;
                this.setState({products, click: true, type: "selectall"});
            })
        } else if(this.state.pro_type !== ""){
            axios.get("http://localhost:4309/searchProductType="+this.state.pro_type)
            .then((response) => { 
                console.log(response.data);
                const products = response.data;
                this.setState({products, click: true, type: "selectall"});
            })   
        }    
    }
    insert(e) { /* Call Web Service to insert a new product */
        e.preventDefault();
        fetch("http://localhost:4309/product", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                accept: "application/json"
            },
            "body": JSON.stringify({
                Product: {
                    Product_ID: this.state.pro_id,
                    Name_Of_Product: this.state.pro_name,
                    Member_Point: this.state.pro_mm,
                    Price: this.state.pro_price,
                    Product_Type: this.state.pro_type,
                    Information: this.state.pro_info,
                    Img: this.state.pro_img
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
    update(e) { /* Call Web Service to update a product */
        e.preventDefault();
        fetch("http://localhost:4309/product", {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                accept: "application/json"
            },
            "body": JSON.stringify({
                Product: {
                    Product_ID: this.state.pro_id,
                    Name_Of_Product: this.state.pro_name,
                    Member_Point: this.state.pro_mm,
                    Price: this.state.pro_price,
                    Product_Type: this.state.pro_type,
                    Information: this.state.pro_info,
                    Img: this.state.pro_img
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
    delete(e) { /* Call Web Service to delete a product */
        e.preventDefault();
        fetch("http://localhost:4309/product", {
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                accept: "application/json"
            },
            "body": JSON.stringify({
                Product_ID: this.state.pro_id,
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
    selectall() { /* Call Web Service to select all product */
        axios.get("http://localhost:4309/product")
        .then((response) => {
            console.log(response.data); 
            const products = response.data;
            this.setState({products, click: true, type: "selectall"});
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
                        {/* Product */}
                        <div class="box">
                            <form action="">
                                <h4><b>Product Management</b></h4>
                                <hr />
                                {/* Form */}
                                <div class="form">
                                    {/* Product ID */}
                                    <label for="pro_id">Product ID: </label>
                                    <input type="text" placeholder="Enter Product ID" class="pattern" name="pro_id" id="pro_id" value={this.setState.pro_id} onChange={(e)=>this.handleChange({pro_id: e.target.value})} /><br />
                                    {/* Product Name */}
                                    <label for="pro_name">Product Name: </label> 
                                    <input type="text" placeholder="Enter Product Name" class="pattern" name="pro_name" id="pro_name" value={this.setState.pro_name} onChange={(e)=>this.handleChange({pro_name: e.target.value})} /><br />
                                    {/* Prodeuct Member Point */}
                                    <label for="pro_mm">Member Point: </label> 
                                    <input type="text" placeholder="Enter Member Point" class="pattern" name="pro_mm" id="pro_mm" value={this.setState.pro_mm} onChange={(e)=>this.handleChange({pro_mm: e.target.value})} /><br />
                                    {/* Product pro_price */}
                                    <label for="pro_price">Product Price: </label> 
                                    <input type="text" placeholder="Enter Product Price" class="pattern" name="pro_price" id="pro_price" value={this.setState.pro_price} onChange={(e)=>this.handleChange({pro_price: e.target.value})} /><br />
                                    {/* Product Type */}
                                    <label for="pro_type">Product Type: </label> 
                                    <input type="text" placeholder="Enter Product Type" class="pattern" name="pro_type" id="pro_type" value={this.setState.pro_type} onChange={(e)=>this.handleChange({pro_type: e.target.value})} /><br />
                                    {/* Product pro_info */}
                                    <label for="pro_info">Product Information: </label> 
                                    <input type="text" placeholder="Enter Information" class="pattern" name="pro_info" id="pro_info" value={this.setState.pro_info} onChange={(e)=>this.handleChange({pro_info: e.target.value})} /><br />
                                    {/* Product Image */}
                                    <label for="pro_img">Product Image: </label> 
                                    <input type="text" placeholder="Enter Product Image" class="pattern"name="pro_img" id="pro_img" value={this.setState.pro_img} onChange={(e)=>this.handleChange({pro_img: e.target.value})} /><br />
                                </div>

                                {/* Button */}
                                <div class="button">
                                    <input type="button" value="Insert" id="pro_insert" onClick={(e)=>this.insert(e)} />
                                    <input type="button" value="Update" id="pro_update" onClick={(e)=>this.update(e)} />
                                    <input type="button" value="Select" id="pro_select" onClick={(e)=>this.select(e)} />
                                    <input type="button" value="Select All" id="pro_selecta" onClick={(e)=>this.selectall()} />
                                    <input type="button" value="Delete" id="pro_delete" onClick={(e)=>this.delete(e)} />
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <h5 id="found" class="container">{this.state.products.length} Product (s)</h5> 
                    <div>{showPattern(this.state.click, this.state.products, this.state.type)}</div>
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
function showPattern(click, products, type) {
    if(click === true && type === 'selectall'){
    return(
        <div id="pro_output">
            {
                products.map(pro =>
                    <section class="container probox">
                        <div class="one">
                        <a href={"http://localhost:4309/resultProduct/id=" + pro.Product_ID}>
                            <img src={pro.Img} class="product" />
                        </a>    
                        </div>
                        <div  class="two">
                            <p class="product">Product ID: {products[0].Product_ID}</p>
                            <p class="product">Product Name: {pro.Name_Of_Product}</p>
                            <p class="product">Member Point: {pro.Member_Point}</p>
                            <p class="product">Product ID: {pro.Product_ID}</p>
                            <p class="product">Type: {pro.Product_Type}</p>
                            </div>
                    </section>  
                )
            }
            </div>
    )
    } else if(click === true && type === 'select' && products[0] !== undefined){
        return(
            <div id="pro_output">
                <section class="container probox">     
                   <div class="one">
                        <a href={"http://localhost:4309/resultProduct/id=" + products[0].Product_ID}>
                            <img src={products[0].Img} class="product" />
                        </a>
                   </div>
                   <div  class="two">
                        <p class="product">Product ID: {products[0].Product_ID}</p>
                        <p class="product">Product Name: {products[0].Name_Of_Product}</p>
                        <p class="product">Member Point: {products[0].Member_Point}</p>
                        <p class="product">Type: {products[0].Product_Type}</p>
                   </div>         
                </section>
            </div>  
        )
    }
}

export default withCookies(AdminPanel);