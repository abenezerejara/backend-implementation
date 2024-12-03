import { Button, Table, Input, Switch } from 'antd'
import './App.css'
import { useState, useEffect } from 'react';
import { createStudent, fetchStudents } from './apiService';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [webSocket, setWebSocket] = useState(null);

  //state for  saving the firstname
  const [firstname, setfirstname] = useState('')
  //state for saving the lastname
  const [lastname, setlastname] = useState('');

  //state for saving the fullname because the backend takes it as an array.
  const [fullname, setfullname] = useState({firstname: '', lastname: ''});

  //state to save the list of names in the database
  const [students, setStudents] = useState([]);
  
  const handleSave = async () => {
    //update the fullname state
    setfullname({firstname, lastname});
    //send the data to the backend using apiService, which will then send it to the database
    const createStu = await createStudent({firstname, lastname});
    console.log(createStu);
     //Update the students state with the new student
    setStudents((prevstudents) => [...prevstudents, createStu]);
  }
  
  //setState is an asynchronous function.
  //the state update is not immediately reflected after calling setState.
  //to hand and log the update state, useEffect hook to log the state whenever it changes.
  useEffect(() => {
    console.log('Updated fullname:', fullname);
  }, [fullname]);

   // Fetch students from the database when the component mounts
   useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };
    fetchData();
  }, []);

  //TOGGLE FEATURE:
  const sendToTarget =  async (data) => {
    console.log('Sending to target:', data);
    // Add logic to send the data to the target application
    await createStudent(data);
  };

  useEffect(() => {
    let ws;

    if (isListening) {
        // Connect to the WebSocket server
        ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Data received from WebSocket:', data);

            // Call the sendToTarget function
            sendToTarget(data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWebSocket(ws);
    }

     // Cleanup WebSocket on component unmount or when listening is turned off
    return () => {
      if (ws) {
        ws.close();
      }
      setWebSocket(null);
    };
  }, [isListening]);

  const handleToggle = (checked) => {
    setIsListening(checked);
  };

  function handleDelete() {
    console.log('Deleted!!');
  }
  
  const columns = [
    {title:'First Name', dataIndex:'firstname', width:150, align:'center'},
    {title:'Last Name', dataIndex:'lastname', width:150, align:'center'},
  ];


  return (
    <>
      <div>
        <h1>Webhook Listener</h1>
        <Switch
          checked={isListening}
          onChange={handleToggle}
          checkedChildren="Listening"
          unCheckedChildren="Stopped"
        />
      </div>

     <div className='input-buttons'>
     <h3>Enter Student first and last name.</h3>
      <Input className='firstname' placeholder='Input First Name' onChange={(e) => setfirstname(e.target.value)}/>
      <Input className='lastname'placeholder='Input Last Name'onChange={(e) => setlastname(e.target.value)}/>
      <Button className='save-button' onClick={handleSave}>SAVE</Button>
      <Button className='delete-button' onClick={handleDelete}>DELETE</Button>
     </div>

     <Table className='table' columns={columns} dataSource={students}/>
    </>
  )
}

export default App
