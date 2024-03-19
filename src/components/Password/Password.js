import React from 'react'
import { useUser } from "@clerk/clerk-react";
import {useState } from 'react';
import axios from 'axios';
import {useRef} from 'react'

function Password() {
  const passwordRef=useRef(null);
  const titleRef=useRef(null);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState([]);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault()
    if(title.length>0&&password.length>0){
    axios.post("https://secureme.onrender.com/password", {
      title: title,
      password: password,
      email: user.emailAddresses[0].emailAddress
    })
      .then(function (response) {
        setTitle('');
        setPassword('');
        passwordRef.current.value='';
        titleRef.current.value='';
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally()
    {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      getPasswords();

    }
      
    }
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

  const deletePassword= async(title,e)=>{
    axios.delete(`https://secureme.onrender.com/password/?email=${user.emailAddresses[0].emailAddress}&title=${title}`)
    .then((response) => {
      console.log(`Deleted post with ID ${title}`);
      getPasswords();
      })
    .catch(error => {
      console.error(error);
    });
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Enter Title'  ref={titleRef} required value={title} onChange={(e) => (setTitle(e.target.value))} />
        <input placeholder='Enter password' ref={passwordRef} required value={password} onChange={(e) => (setPassword(e.target.value))} />
        <button type='submit'>Submit</button>
        {loading && <div>Loading</div>}
      </form>
      <button onClick={getPasswords}>Display Passwords</button>
      <br />
      {answer && answer.map((each,index) => {
        return (
          <div><span>{each.title} : {each.password}</span><button onClick={()=>{deletePassword(each.title)}}>Delete</button></div>
        )
      })}
    </div>
  )
}

export default Password

{/* <button>Update</button> */}