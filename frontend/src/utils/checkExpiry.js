export const checkTokenExpiry = ()=>{
    const token = localStorage.getItem('authToken');
    if(token){
        const decodeToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodeToken.exp < currentTime) {
            // Token expired, log the user out or refresh the token
            localStorage.removeItem('authToken');
            return true;
          }
    }
    return false;
}