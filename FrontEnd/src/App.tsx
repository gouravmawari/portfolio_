
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/MainPage/Main';
import Register from './Components/Register';
import Signup from './Components/Signup';
import Login from './Components/LoginPage/Login';
import View from './Components/Viewer/View';
import UserForm from './Components/UserFormPage/Userform';


function App() {
  const [responseData, setResponseData] = useState<{
    name: string;
    skills: string;
    description: string;
  }>({
    name: '',
    skills: '',
    description: ''
  });

  useEffect(() => {
    const data = localStorage.getItem('responseData');
    if (data) {
      setResponseData(JSON.parse(data));
    }
  }, []);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Register setResponseData={setResponseData} />} />
        <Route path="/main" element={<Main/>} />
        <Route path="/view/:id" element={<View/>} />
        <Route path ="/form" element = {<UserForm/>}/>
        {/*  */}
        
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      
    </Router>
  );
}

export default App;


{/* <Route path="/form" element={<UserForm initialData={undefined}/>} /> */}