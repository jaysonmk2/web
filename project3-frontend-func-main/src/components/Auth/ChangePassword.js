import React,{useState, useEffect} from 'react'
import Input from './Input';
import * as Yup from 'yup';
import decode from 'jwt-decode'
import axios from 'axios';
import {Message} from 'semantic-ui-react'
import { useHistory } from 'react-router';


const ChangePassword = ( history ) => {
    //variables
    
    const [showPassword,setShowPassword]= useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user,setUser] = useState() 
    const [form,setForm] =useState({newPassword:'',confirmPassword:'',oldPassword:''})
    const [userid,setUserId] = useState(user?.id)

    const [headerMsg, setHeaderMsg] = useState('')
    const [contentMsg, setContentMsg] = useState('')
    const redirect = useHistory()

    useEffect(() => {
        const token = currentUser?.token;
        if(token){
            const decodedToken = decode(token)
            setUser(decodedToken)
        }
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        setUserId(user?.id)
    }, [history])

    const handleSubmit =(e)=>{
        e.preventDefault()
        
        if(form.newPassword==form.confirmPassword){
            console.log(user?.id)
            axios.patch("http://localhost:3333/auth/changepassword",{
                userid: user?.id,
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
                }).then((response,err)=>{
                console.log(response)
                
                if(response.data.message ==='Success.'){
                    setHeaderMsg('Password changed successfully.')
                    setContentMsg('You will be redirected in 5 seconds.')
                    console.log(response.data.message)
                    setTimeout(()=>{
                        redirect.push('/Profile')
                    },5000)
                }
                console.log(form)
                if(err) console.log(err)
            })
        }
    }

    const handleShowPassword =() =>{
        setShowPassword(!showPassword)
    }
    const handleChange =(e) => setForm({...form, [e.target.name]: e.target.value})
    return (
        <div className="container">
            <form onSubmit={handleSubmit} >
            
            <Input  name="oldPassword" label="Old Password" handleChange={handleChange} type={showPassword ?'text':'password'} handleShowPassword={handleShowPassword}/>
            <Input name="newPassword" label="New Password" handleChange={handleChange} type={showPassword ?'text':'password'} handleShowPassword={handleShowPassword}/>
            <Input name="confirmPassword" label="Confirm New Password" handleChange={handleChange} type={showPassword ?'text':'password'} handleShowPassword={handleShowPassword}/>
            <button type="submit"className="button">Change password</button>
            <Message positive header={headerMsg} content={contentMsg} />

            </form>

        </div>
    )
}

export default ChangePassword
