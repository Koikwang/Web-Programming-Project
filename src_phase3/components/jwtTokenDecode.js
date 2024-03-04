import jwt_decode from "jwt-decode";

const auth = function(jwtToken) {
    if(!jwtToken) return null;
    
    const user = jwt_decode(jwtToken);
    return user; 
};

export default auth;