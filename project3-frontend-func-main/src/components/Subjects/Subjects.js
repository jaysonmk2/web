
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import AddSubject from './AddSubject';
import decode from 'jwt-decode'
import EditSubject from './EditSubject';
import Classroom from '../Classroom';


const Subjects = (props) => {
const [user,setUser] = useState() 
const [userid,setUserId] = useState(user?.id)
const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem('user')))
const [subjects,setSubjects]= useState([])

async function getSubject(){
    let response = await axios.get('http://localhost:3333/subjects/');
    return response.data
}


useEffect(()=>{
    getSubject().then((data)=>{
        setSubjects(data)
    })

    const token = currentUser?.token;
    if(token){
        const decodedToken = decode(token)
        setUser(decodedToken)
    }
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
    setUserId(user?.id)

},[])

const handleDelete = (subjectId)=>{
    axios.patch('http://localhost:3333/subjects/delete',{subjectid:subjectId}).then((resp)=>{
        if(resp.data.message ==='deleted'){
            alert('Subject deleted.')
            setTimeout(()=>{
                window.location.reload()
            },5000)

        }
    })
}

    return (
        <div>
            <div>
                <table>
                        <tr>
                        <th className="table-header">id</th>
                        <th className="table-header">subject name</th>
                        <th className="table-header">subject description </th>
                        </tr>
         {subjects.map((subject)=>{
               if(user?.id == subject.UserId || user?.usertype ===3 || user?.usertype === 2){
                return (
                    <tr key={subject.id}>
                        <td className="table-header">
                        {subject.id} 
                        </td> 
                        <td className="table-header">
                          {subject.name}
                        </td>
                        <td className="table-header">
                            {subject.description}
                        </td>
                        
                        <td className="table-header">
                          <button onClick={()=>{handleDelete(subject.id)}}> delete</button>
                        </td>
                        <td>
                        <Classroom name={subject.name} SubjectId={subject.id} description={subject.description}/>
                        </td>
                        </tr>
                    
                )    
               }else{
                return (
                    <tr key={subject.id}>
                        <td className="table-header">
                        {subject.id} 
                        </td> 
                        <td className="table-header">
                            {subject.name}
                        </td>
                        <td className="table-header">
                            {subject.description}
                        </td>        
                        </tr>
                )
               }
               
            })}
            </table>
            <AddSubject/>

            <EditSubject/>
            </div>
                
           
        </div>
    )
}

export default Subjects
