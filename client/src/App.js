import './App.css';
import './css/CMSstyle.scss'
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from './components/common/login';
import { CreateAdmin } from './components/admin/createUser'
import { Dashboard } from './components/common/dashboard'
import { RegisterComplaint } from './components/common/registerComplaint';
import { ComplaintsList } from './components/common/complaints';
import { ComplaintDetails } from './components/common/complaintDetails';

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
                    <Route exact path="/complaints" element={<ComplaintsList/>}/>
                    <Route exact path="/complaintsDetails/:complaintID" element={<ComplaintDetails/>}/>
                {/* : */}
                    <Route exact path="/createUser" element={<CreateAdmin/>}/>
                {/* } */}
            </Routes>
        </div>
    );
}

export default App;
