import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Input from './Input';
import {  Router, useHistory } from 'react-router-dom';


const initialState = {email: '', password: '' };
const Login = (history) => {
   

const hist = useHistory()
useEffect(()=>{
    if(localStorage.getItem('user')){
        hist.push('/')
    }
},[history])

    const [form, setForm] = useState(initialState);
    const [showPassword,setShowPassword]= useState(false);
    const handleChange =(e) => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = (e)=>{
        e.preventDefault();
        

        const config = {
            header:{
                "Content-Type":"application/json"
            },
        };
        axios.post('http://localhost:3333/auth/login',form).then((response)=>{
            if (response.data.token) {
              
                localStorage.setItem('user',JSON.stringify(response.data))
                hist.push('/')
                window.location.reload()
            }
            return response.data;
        }).catch((err)=>{
            if(err) return console.error(err)
        })
    }

    const handleShowPassword =() =>{
        setShowPassword(!showPassword)
    }

    return (
        <div class="loginform loginform-container">
                
                   <form onSubmit={handleSubmit}>
                   <h1> Login</h1>
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" className="inputfield"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ?'text':'password'} handleShowPassword={handleShowPassword}/>  
                    <button type="submit" className="button button-register">Login</button>
                   </form>
                    
                    
               
            </div>
    )
}

export default Login;
