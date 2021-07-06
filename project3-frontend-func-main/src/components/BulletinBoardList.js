import React from 'react'



const BulletinBoardList = () =>{
    return(
        <div className="bulletin-board-list">
            <h4 className="title-bullet">Event</h4>
            <div className="field">
                <div className="bullet-titles">
                    <p className="time">Start</p>
                    <p className="time">Start</p>
                </div>
                <div className="bullet-description"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quas doloribus sint! Magnam aspernatur odio distinctio dolorum adipisci, maiores totam repellendus ipsam dolor nesciunt rerum.</p></div>
            </div>
            <button className="delete-btn">Remove</button>
        </div>
    )
}
export default BulletinBoardList;
