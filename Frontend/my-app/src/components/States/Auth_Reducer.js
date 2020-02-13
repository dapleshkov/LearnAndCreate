import {getCurrentUser} from "../ServerAPI/serverAPI";

let loginuser = {
    name: '',
    username: '',
    email: '',
    usernameOrEmail: '',
    password: '',
    isAuthenticated: false
};
 export function loadUser(user) {
     getCurrentUser().then(response => {
         debugger;
         user.isAuthenticated = true;
         user.username = response.username;
     });
 }
export default loginuser;