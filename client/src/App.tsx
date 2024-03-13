import { useState } from 'react'
import './App.css'
import axios from 'axios';


// set API for messageBoard
const API_MessageBoard = "http://localhost:3000/messageBoard";

function App() {
  const [messageBoard, setMessageBoard] = useState([])

  // useEffect to fetchData

  const additem = (list: Object) => {
    const timestamp = list.timestamp;
    try {
      const res = await axios.post(API_MessageBoard)
      const newMessage = res.text;
      setMessageBoard([...messageBoard, newMessage])
  }
}
  // TODO: render items function
  // TODO: edit item function
  // TODO: delete item function

  return (
    <>
      {/* message list and inside it the messages */}
        
    </>
  )
}

export default App
