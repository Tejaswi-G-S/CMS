import React, {useEffect, useState} from "react";
import Container from '@mui/material/Container'
import { Avatar, Box, TextField, Button, Grid} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import { RetrieveData, StoreData } from '../api/apiCall'
import { FetchLevels, FetchLevelsUI } from "../reUsable/levelData";

export const RegisterComplaint = () => {
    const [levelOneData, updateLevelOneData] = useState ([])
    const [levelTwoData, updateLevelTwoData] = useState ([])
    const [levelThreeData, updateLevelThreeData] = useState ([])
    const [levelFourData, updatelevelFourData] = useState ([])
    const [levelFiveData, updatelevelFiveData] = useState ([])
    const [details, updateDetail] = useState ({
        levelOne:'',
        levelTwo:'',
        levelThree:'',
        levelFour:'',
        levelFive:''
    })

    useEffect(() => {
        RetrieveData(`fetchLevelOneDetails`, (response) => {
            console.log(response)
            updateLevelOneData(response.data.result)
        })
    },[])

    const onChangeEvent = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        updateDetail({...details, [name] : value})
        FetchLevels(name, value, updateLevelTwoData, updateLevelThreeData, updatelevelFourData, updatelevelFiveData)
    }
    
    const submitComplaint = () => {

    }

    console.log(details)
    return(
        <Container maxWidth="lg">
            <Box id="LR" sx={{m: '40px auto', p : '20px 40px',  textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <AdbIcon />
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Raise Your Complaints</h1>
                <Box component="form" onSubmit={(e) => submitComplaint(e)}>
                    <Grid container columnSpacing={{ xs: 0, sm: 3}} rowSpacing={{xs : 3}} sx={{mb:'10px'}}>
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