import React,{useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom';
import decode from 'jwt-decode'
const Header = (history) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user,setUser] = useState()
    const hist = useHistory()
    useEffect(() => {
        const token = currentUser?.token;
        if(token){
            const decodedToken = decode(token)
            setUser(decodedToken)
        }
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
    },[history])

    const handleLogout =()=>{
        localStorage.removeItem('user')
        setUser(null)
        setCurrentUser(null)
        hist.push('/')
    }

    return (
        <div className="Container">
        <div className="nav">
            <label >&#9776;</label>
            <input type="checkbox" id="toggle"/>
            {currentUser && user?.usertype === 3 ?(
            <div className="menu">
                <Link to="/" className="menu-links">Home</Link>                      
                <Link to="/Register" className="menu-links">Register</Link>   
                <Link to="Profile" className="menu-links">Profile </Link>
                <Link to="/Videos" className="menu-links">Recordings</Link>   
                <Link to="/Classroom" className="menu-links">Rooms</Link>
                <Link to="/Writeboard" className="menu-links">Writeboard</Link>
                <Link to="/Subjects" className="menu-links">Subjects</Link>
                <Link className="menu-links" onClick={handleLogout}>Logout</Link>
                <Link to="/BulletinBoard" className="menu-links">BulletinBoard</Link>
            </div>
             ) :(
                
                <div className="menu">
              
                 
                {!currentUser ? (
                    <div className="menu">
                <Link to="/" className="menu-links">Home</Link>                     
                <Link to="/Login" className="menu-links">Login</Link>   
                         </div>
                ): (
                <div className="menu"> 
                <Link to="/" className="menu-links">Home</Link>        
                <Link to="Profile" className="menu-links">Profile </Link>             
                <Link to="/Classroom" className="menu-links">Rooms</Link>
                <Link to="/Writeboard" className="menu-links">Writeboard</Link>
                <Link to="/Subjects" className="menu-links">Subjects</Link>

                <button className="menu-links" onClick={handleLogout}>Logout</button>
                </div>)}
                
            </div>
             )}
        </div>
      </div>
    )
}

export default Header
