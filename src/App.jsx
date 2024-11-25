import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setdata] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=> setdata(data)
    )
  })

  const handleForm =(e)=>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const gmail = form.gmail.value;
    const user = {name, gmail}
    console.log(user);

    //client site send data via post

    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }
      
    )
    .then(res=>res.json())
    .then(data=> {
      console.log(data)
      const newUser = [...users, data ]
      setdata(newUser)
      form.reset()
    })
    
  }

  return (
    <>

    <p>data length is {users.length}</p>

    <h1>fill the form</h1>
    <form onSubmit={handleForm}>
      <input type="text" name='name' placeholder='name' /><br />
      <input type="text" name='gmail' placeholder='gmail' /><br />
      <button type="submit">submit</button>
    </form>

    {
      users.map(item=><p key={item.id}>{item.id} : {item.name} : {item.gmail}</p>)
    }
      
    </>
  )
}

export default App
