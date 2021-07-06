
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Input from '../Auth/Input'

const EditSubject = ()=> {
    const [form,setForm] = useState({name:'',description:''})
    const handleChange = (e) => setForm({...form,[e.target.name]:e.target.value})
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:3333/subjects/edit',{
            name: form.name,
            description:form.description,
            id: form.SubjectId
        }).then((resp)=>{
            console.log(resp)
            setTimeout(()=>{
                window.location.reload()
            },3000)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        /*
        name,description,id
        */

        <div>
            <form onSubmit={handleSubmit}>
            <Input name="name" label="Name" handleChange={handleChange} type='text' required/>
            <Input name="description" label="Description" handleChange={handleChange} type='text' required/>
            <Input name="SubjectId" label="SubjectId" handleChange={handleChange} type='text' required/>
            
            <button type="submit"> edit subject</button>
            </form>
        </div>
    )
}
export default EditSubject