import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  let f5=false;
  useEffect(()=>{
    axios.get(`/api/values`)
      .then(response=>{
        console.log('response',response)
        setLists(response.data);
      })
    },[])
  const changeHandler=(event)=>{
    setValue(event.target.value);
    console.log(event.target.value)
  }
  const submitHandler=(event)=>{
    event.preventDefault();
    axios.post('/api/value',{value})
    .then(response=>{
      if(response.data.success){
          console.log('response: ',response);
          setLists([...setLists,response.data]);
          setValue("");
          console.log("hello");
      }else{
        alert("db failed!");
      }
    })
  }
  const [list,setLists]=useState([]);
  const [value,setValue]=useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a>
          Learn React
        </a>
        <div>
          {list&&list.map((list,index)=>(
            <li key={index}>{list.value} </li>
          ))}
          <form onSubmit={submitHandler}>
          <input type="text"
          placeholder="type here"
          onChange={changeHandler}
          value={value} />
          <button type="submit">confirm</button>
          </form>
          </div>
      </header>
    </div>
  );
}
  
export default App;
