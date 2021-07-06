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
        <div className="container" >
            <div className="profile">
                <h1>Welcome back {user?.firstname+ " "+ user?.lastname}  </h1>
                <p className="details"><strong>Details:</strong></p>
                
                <p className="details"><strong>address:</strong> {user?.address}</p>
                <p className="details"><strong>phonenumber:</strong> {user?.phonenumber} </p>
              <div className="link-cont">
                  
                  <Link className="routLink first" to={{pathname:'/EditProfile', state:{userid:user?.id, address:user?.address,phonenumber:user?.phonenumber }}} >edit profile</Link> <br/>
                  <Link className="routLink second" to="/Changepassword"> change password</Link>
              </div>
            </div>  
        </div>
    )
}

export default Profile
