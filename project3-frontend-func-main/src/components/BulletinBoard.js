import React from "react";


import BulletinBoardList from "./BulletinBoardList";

const BulletinBoard = () => {
  return (
    <div className="container">
      <h1 className="BulletinBoard-title">BulletinBoard</h1>

      <div className="inputfields-bullet">
        <div className="bullet-board-row">
          <h6 className="bullet">Event</h6>
          <input className="input-fields-bulletin" type="text" />

          <h6 className="bullet">Start Time</h6>
          <input className="input-fields-bulletin" type="time" name="" id="" />

          <h6 className="bullet">End Time</h6>
          <input className="input-fields-bulletin" type="time" name="" id="" />

          <button className="button btn1">Add Event</button>
        </div>

        <div className="bullet-board-row1">
          <textarea className="textArea" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>



      <BulletinBoardList/>
      <BulletinBoardList/>
      <BulletinBoardList/>
      <BulletinBoardList/>
      <BulletinBoardList/>
      <BulletinBoardList/>
      <BulletinBoardList/>
    </div>
  );
};

export default BulletinBoard;
