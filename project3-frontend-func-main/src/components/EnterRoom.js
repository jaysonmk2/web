import React from 'react'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

const EnterRoom = (props) => {
    const history = useHistory()

    return (
       <div>
          <Link to={{pathname:`http://project2.fdtw.tech/?roomId=${props.name}`}} target="_blank"> {props.name}</Link> 

       </div>   
    )
}

export default EnterRoom
