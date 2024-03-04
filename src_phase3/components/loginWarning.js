import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './loginWarning.css';

class LoginWarning extends React.Component {
    
    constructor(props) {
        super(props);
        this.role = props.role;
    }

    render() {
        if(this.role == 'none') {
            return (
                <div className="container" style={{}}>
                    <div className="warningBox">
                        you have to login first...
                        <a href="http://localhost:5309/login" style={{marginTop: '10px'}}><button>login</button></a>
                    </div>
                </div>
            );
        } else if(this.role == 'user') {
            return (
                <div className="container" style={{}}>
                    <div className="warningBox">
                        you don't have permission to access this page...
                        <a href="http://localhost:5309/login" style={{marginTop: '10px'}}><button>login</button></a>
                    </div>
                </div>
            )
        }
    }
}

export default LoginWarning;