import axios from "axios";
import React, { useState, useEffect } from "react";
import Input from "../Auth/Input";
import decode from "jwt-decode";
import { Message } from "semantic-ui-react";

const Subjects = (history) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [user, setUser] = useState();
  const [userid, setUserId] = useState(user?.id);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [headerMsg, setHeaderMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");

  useEffect(() => {
    const token = currentUser?.token;
    if (token) {
      const decodedToken = decode(token);
      setUser(decodedToken);
    }
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    setUserId(user?.id);
  }, [history]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const UserId = user?.id;
    if (user?.usertype == 3 || user?.usertype == 2) {
      console.log(UserId);
      axios
        .post("http://localhost:3333/subjects/addsubject", {
          name: form.name,
          description: form.description,
          UserId: UserId,
        })
        .then((response, error) => {
          if (response.data.message === "success") {
            setHeaderMsg(form.name + " added");
            setContentMsg("Subject added successfully.");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
          if (error) console.log(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Name"
          handleChange={handleChange}
          type="text"
        />
        <Input
          name="description"
          label="Description"
          handleChange={handleChange}
          type="text"
        />
        <button className="button button-register" type="submit">
          add subject
        </button>
        <Message positive header={headerMsg} content={contentMsg} />
      </form>
    </div>
  );
};

export default Subjects;
