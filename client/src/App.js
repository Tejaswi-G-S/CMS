import './App.css';
import './css/HRMSstyle.scss'
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from './components/common/login';
import { CreateUser } from './components/admin/createUser'
import { Dashboard } from './components/common/dashboard'
import { RegisterComplaint } from './components/common/registerComplaint';

function App() {
    const [loginDetails, updateLoginDetails] = useState({})

    //Lifting State Up from child to parent - Receiving props from child
    const logInSet = (userName, levelid) => {
        console.log(userName, levelid)
        updateLoginDetails({...loginDetails, loginUser : userName, levelid : levelid})
    }

    return (
        <div className="App">
            <Routes>
                {/* {loginDetails.loginUser === undefined ? */}
                  <Route exact path="/" element={<Dashboard/>}/>
                  <Route exact path="/login" element={<Login logInSet={logInSet}/>}/>
                  <Route exact path="/registerComplaint" element={<RegisterComplaint/>}/>
                {/* : */}
                  <Route exact path="/createUser" element={<CreateUser/>}/>
                {/* } */}
            </Routes>
        </div>
    );
}

export default App;
