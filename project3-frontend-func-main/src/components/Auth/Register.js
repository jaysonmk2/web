import React,{useState, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import decode from 'jwt-decode'

const Register = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user,setUser] = useState()

    useEffect(() => {
        const token = currentUser?.token;
        if(token){
            const decodedToken = decode(token)
            setUser(decodedToken)
            console.log(decodedToken)
        }
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
     
    }, [])    


    const initialValues ={
        email:"",
        password:"",
        firstname:"",
        lastname:"",
        phonenumber:"",
        address:"",
        usertype:"1",

    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).max(16).required(),
        firstname: Yup.string().min(3).max(15).required(),
        lastname: Yup.string().min(3).max(15).required(),
        phonenumber: Yup.string().min(3).max(15).required(),
    });
        
    const onSubmit = (data) =>{
        axios.post("http://localhost:3333/auth",data).then(()=>{
            console.log(data)
            alert('user registered!') 
        })

    }
    if(user?.usertype=== 3){
        return (
       
            <div className="loginform">
             
             <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                 <Form>
                   <label>Email: </label>
                   <ErrorMessage name="email" component="span"/>
                   <Field className="inputfield" name="email" placeholder="email"autoComplete="off"/>
                   <label>Password: </label>
                   <ErrorMessage name="password" component="span"/>
                   <Field className="inputfield" name="password" placeholder="password"autoComplete="off"/>
                   <label>first name: </label>
                   <ErrorMessage name="firstname" component="span"/>
                   <Field className="inputfield" name="firstname" placeholder="first name"autoComplete="off"/>
                   <label>Last name: </label>
                   <ErrorMessage name="lastname" component="span"/>
                   <Field className="inputfield" name="lastname" placeholder="last name"autoComplete="off"/>
                   <label>phone number: </label>
                   <ErrorMessage name="phonenumber" component="span"/>
                   <Field className="inputfield" name="phonenumber" placeholder="Enter a phone number..."autoComplete="off"/>
                   <label>Address: </label>
                   <ErrorMessage name="address" component="span"/>
                   <Field className="inputfield" name="address" placeholder="address"autoComplete="off"/>
                   <Field as="select" name="usertype">
                      <option value="1">Student</option>
                      <option value="2">Docent</option>
                      <option value="3">Admin</option>
                   </Field>
     
                   
                   <button type="submit"> Register</button>
     
                 </Form>
             </Formik>
          </div>
         )
    }else{
        return(
            <div>
                <h1>UNAUTHORIZED!</h1>
            </div>
        )
    }
    
}

export default Register
