import axios from 'axios'
import React,{useState,useEffect} from 'react'
import decode from 'jwt-decode'
import EnterRoom from './EnterRoom'
const Listrooms = () => {
  
  async function getRooms(){
    let response = await axios.get('http://localhost:3333/rooms/listrooms')
    return response.data
  }
  
  const [room,setRoom] = useState([])
  const [user,setUser] = useState() 
  const [userid,setUserId] = useState(user?.id)
  const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    getRooms().then((data)=>{
        setRoom(data)
    })

    const token = currentUser?.token;
    if(token){
        const decodedToken = decode(token)
        setUser(decodedToken)
    }
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
    setUserId(user?.id)

},[])

const handleDelete=(roomid)=>{
  axios.patch('http://localhost:3333/rooms/deleteroom',{
    roomid: roomid
  }).then((resp)=>{
    if(resp.data.message==='success'){
      alert('Room deleted successfully.')
      setTimeout(()=>{
        window.location.reload()
      },3000)
    }
  })
}
  
  return (
    <div>
      <table>
        <tr>
          <th className="table-header">id</th>
          <th className="table-header">room name</th>
          <th className="table-header">room description </th>
         </tr>
      {room.map((rooms)=>{
        return(
          <tr key={rooms.id}> 
            <td className="table-header">{rooms.id}</td>
            <td className="table-header">{<EnterRoom name={rooms.name}/>}</td>
            <td className="table-header">{rooms.description}</td>
            <td><button className="btn-delete" onClick={()=>{handleDelete(rooms.id)}}>delete room</button> </td>
          </tr>
        )
      })}
      </table>      
    </div>
  )
}

export default Listrooms
