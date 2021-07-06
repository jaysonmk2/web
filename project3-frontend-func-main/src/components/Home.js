import React, {Component, useEffect, useState} from 'react'
import webrtcimg from '../media/images/webrtc.jpg'
import decode from 'jwt-decode'


const Home = (history) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user,setUser] = useState()

    useEffect(() => {
        const token = currentUser?.token;
        if(token){
            const decodedToken = decode(token)
            setUser(decodedToken)
        }
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        
    },[history])



    return (
        <main>
        <section className="section1">
          <div className="container">
              <div className="row">
                  <div className="text-container space">
                      <h1>Welcome {currentUser && user ? user?.firstname +" "+user?.lastname : " to UoCLearn."}</h1>
                      <p>This platform is used for the classes to be fully digital. The students can join into the class rooms as they are enrolled in the subjects.</p>
                  </div>
              </div>
              <div className="image-container space">
                      <img src={webrtcimg} alt="webrtc"/>
                  </div>
          </div>
        </section>
              {/* gotta change stuff here. the containers will have to receive new text got to check to make them to send you to a new link maybe? not sure.*/}
        <section className="section2">
          <div className="container">
              <div className="h2-container">
                  <h2>Here at webrtc you can create rooms and make calls with a click of a button.</h2>
              </div>
              <div className="row">
                  <div className="col space">
                      <h3>Join ROoms</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <hr></hr>
                  </div>
                  <div className="col space">
                      <h3>Chat</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <hr></hr>
                  </div>
                  <div className="col space">
                      <h3>Account</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      <hr></hr>
                  </div>

              </div>
          </div>
        </section>
    </main>
    )
}

export default Home
