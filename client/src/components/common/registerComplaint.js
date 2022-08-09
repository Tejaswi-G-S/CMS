import React, {useEffect, useState} from "react";
import Container from '@mui/material/Container'
import { Avatar, Box, TextField, Button, Grid} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { RetrieveData, StoreData } from '../api/apiCall'
import { FetchLevels, FetchLevelsUI } from "../reUsable/levelData";
import { AdminDataUI } from '../reUsable/adminData'
import { useNavigate  } from 'react-router-dom';


export const RegisterComplaint = () => {
    const history = useNavigate();
    const [admin, updateAdminDetails] = useStateWithCallbackLazy([])
    const [levelOneData, updateLevelOneData] = useState ([])
    const [levelTwoData, updateLevelTwoData] = useState ([])
    const [levelThreeData, updateLevelThreeData] = useState ([])
    const [levelFourData, updatelevelFourData] = useState ([])
    const [levelFiveData, updatelevelFiveData] = useState ([])
    const [details, updateDetail] = useStateWithCallbackLazy ({
        complaintId:'',
        levelOne:'',
        levelTwo:'',
        levelThree:'',
        levelFour:'',
        levelFive:'',
        underAdmin: '',
        underAdminId: ''
    })

    useEffect(() => {
        // FetchAdminData(updateAdminDetails);
        RetrieveData(`fetchLevelOneDetails`, (response) => {
            updateLevelOneData(response.data.result)
        })
    },[])

    const onChangeEvent = (e) => {
        const {name, value} = e.target;
        updateDetail({...details, 'underAdmin': ''}, (details) => {
            updateDetail({...details, [name] : value})
            console.log(admin);
        })
        FetchLevels(name, value, updateDetail, updateLevelTwoData, updateLevelThreeData, updatelevelFourData, updatelevelFiveData)
        if(name === 'levelOne' || name === 'levelTwo' || name === 'levelThree' || name === 'levelFour' || name === 'levelFive'){
            RetrieveData(`fetchAdminByLevels|${name}|${value}`, (response) => {
                console.log(response)
                if(response.data.success === true){
                    updateAdminDetails(response.data.result)
                }else{
                    updateAdminDetails([])
                }
            })
        }
    }

    console.log(admin)
    const submitComplaintFn = (details) => {
        StoreData(`submitComplaint|${JSON.stringify(details)}`, (response) => {
            alert("Complaint Registered")
            history('/');
        })
    }

    const submitComplaint = (e) => {
        e.preventDefault();
        if (details.underAdmin !== ''){
            let adminFetchId = admin[details.underAdmin].id;
            RetrieveData(`fetchAdminDetailsSelected|${adminFetchId}`, (response) => {
                console.log(response.data.result[0])
                let {levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid, id, levelid} = response.data.result[0]; 
                updateDetail({...details, levelOne:levelonemid, levelTwo:leveltwomid, levelThree:levelthreemid, levelFour:levelfourmid, levelFive:levelfivemid, underAdminId:id, levelId:levelid}, (details) => {
                    console.log(details);
                    submitComplaintFn(details);
                })
            })
        } else {
            submitComplaintFn(details);
        }
    }
    // console.log(details);
    return(
        <Container maxWidth="lg">
            <Box id="LR" sx={{m: '40px auto', p : '20px 40px',  textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <AdbIcon />
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Raise Your Complaints</h1>
                <Box component="form" onSubmit={(e) => submitComplaint(e)}>
                    <Grid container columnSpacing={{ xs: 0, sm: 3}} rowSpacing={{xs : 3}} sx={{mb:'25px'}}>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField 
                                fullWidth
                                required
                                id="outlined-required"
                                label="Name"
                                autoFocus
                                name = "nameOfCP"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Unique Id Number"
                                fullWidth
                                name = "uid"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth rows={2} 
                                multiline
                                required
                                label="Address"
                                id="outlined-required"
                                name="address"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField 
                                fullWidth
                                required
                                id="outlined-required"
                                label="Phone Number"
                                autoFocus
                                name = "phoneNumber"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField 
                                fullWidth
                                id="outlined-required"
                                label="Email ID"
                                autoFocus
                                name = "email"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth rows={2} 
                                multiline
                                required
                                label="Complaint Subject"
                                id="outlined-required"
                                name="subject"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth rows={5} 
                                multiline
                                required
                                label="Complaint Description"
                                id="outlined-required"
                                name="description"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <FetchLevelsUI onChangeEventProp={onChangeEvent} detailsProp={details} levelOneDataProp={levelOneData} levelTwoDataProp={levelTwoData} levelThreeDataProp={levelThreeData} levelFourDataProp={levelFourData} levelFiveDataProp={levelFiveData}/>
                    </Grid> 
                    <Grid container columnSpacing={{ xs: 0, sm: 3}} rowSpacing={{xs : 3}} sx={{mb:'10px'}}>
                        {(admin.length) > 0 && <AdminDataUI adminDataProp={admin} onChangeEventProp={onChangeEvent} detailsProp={details}/> }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx = {{mt : 5, mb : 5}}
                    >
                        Submit Complaint
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}