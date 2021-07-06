import React, {useState,useEffect} from 'react'
import decode from 'jwt-decode';
import ChangePassword from './ChangePassword';
import {Link} from 'react-router-dom';

const Profile = () => {
    
   
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user,setUser] = useState()

    useEffect(() => {
        const token = currentUser?.token;
        if(token){
            const decodedToken = decode(token)
            setUser(decodedToken)
        }
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
     
    }, [])

    return (
        <div >
            <p>Welcome back {user?.firstname+ " "+ user?.lastname}  </p>
            <p><strong>Details:</strong></p>
            <br/>
            <p>address: {user?.address}</p>
            <p>phonenumber: {user?.phonenumber} </p>
            <Link to={{pathname:'/EditProfile', state:{userid:user?.id, address:user?.address,phonenumber:user?.phonenumber }}} >edit profile</Link> <br/>
            <Link to="/Changepassword"> change password</Link>        
        </div>
    )
}

export default Profile
