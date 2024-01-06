import React from 'react'
import { useUser } from "@clerk/clerk-react";
import {useState } from 'react';
import axios from 'axios';

function Password() {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');

  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState([]);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault()
    axios.post("https://secureme.onrender.com/password", {
      title: title,
      password: password,
      email: user.emailAddresses[0].emailAddress
    })
      .then(function (response) {
        setTitle(' ');
        setPassword(' ');

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally()
    {
      setTimeout(() => {
        setLoading(false);
      }, 500)

    }
    await getPasswords();
  }
  const getPasswords = async (e) => {
    axios.get(`https://secureme.onrender.com/password/all?email=${user.emailAddresses[0].emailAddress}`)
      .then((response) => {
        setAnswer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Enter Title' required value={title} onChange={(e) => (setTitle(e.target.value))} />
        <input placeholder='Enter password' required value={password} onChange={(e) => (setPassword(e.target.value))} />
        <button type='submit'>Submit</button>
        {loading && <div>Loading</div>}
      </form>
      <button onClick={getPasswords}>Display Passwords</button>
      <br />
      {answer && answer.map((each) => {
        return (
          <div>{each.title} : {each.password}</div>
        )
      })}
    </div>
  )
}

export default Password
