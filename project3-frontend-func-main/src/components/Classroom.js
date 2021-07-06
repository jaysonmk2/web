import axios from 'axios'
import React,{useState} from 'react'
import { Router, useHistory,Link } from 'react-router-dom'
import Input from './Auth/Input'

const Classroom = (props) => {

    const data= {
        name: props.name,
        description: props.description,
       subjectid: props.SubjectId
    }
    
    const history = useHistory()
    const handleSubmit =() => {
        
        axios.post('http://localhost:3333/rooms/addroom',data).then((resp,err)=>{
            if(resp){
                console.log(resp.data)
                alert('classroom created successfully.')
                history.push('/')
            }
        })

    }

    return (
        <div className="ui segment">
         
        <button onClick={handleSubmit}>Create Room</button>
            
        </div>
    )
}

export default Classroom
