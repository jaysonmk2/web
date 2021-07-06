import axios from 'axios'
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Input from './Input'
const EditProfile = (props) => {
    const [form,setForm] = useState()
    console.log(props)
    
    const history = useHistory()

    const userid = props.location.state.userid
    const handleChange = (e) => setForm({...form,[e.target.name]:e.target.value})
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.patch('http://localhost:3333/auth/editdetails',{
            userid: userid,
            address:form.address,
            phonenumber: form.phonenumber,
            password: form.password
        }).then((resp)=>{
            if(resp.data.message==='success'){
                alert('Your profile information has been edited, to see the changes please re-login')
                setTimeout(()=>{
                    history.push('/Profile')
                },2500)
            }
        })
    }
    return (

       
        <div className="container">
            <form onSubmit={handleSubmit}>
                <Input  name="address" label="address" required handleChange={handleChange} type="text" defaultValue={props.location.state.address} />
                <Input  name="phonenumber" label="phonenumber" required handleChange={handleChange}  type="text" defaultValue={props.location.state.phonenumber}/>
                <Input  name="password" label="password" required handleChange={handleChange}  type="password"/>
                
                <button type="submit" className="button">submit</button>
            </form>
        </div>
    )
}

export default EditProfile
