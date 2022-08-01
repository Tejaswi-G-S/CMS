import React, { useEffect, useState } from "react";
import {Avatar, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid } from "@mui/material";
import Container from '@mui/material/Container'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RetrieveData, StoreData } from '../api/apiCall';
import { FetchLevels, FetchLevelsUI } from "../reUsable/levelData";
import { useStateWithCallbackLazy } from 'use-state-with-callback';

export const CreateUser = () => {
    const [user, updateUserDetails] = useState([])
    const [levelOneData, updateLevelOneData] = useState ([])
    const [levelTwoData, updateLevelTwoData] = useState ([])
    const [levelThreeData, updateLevelThreeData] = useState ([])
    const [levelFourData, updatelevelFourData] = useState ([])
    const [levelFiveData, updatelevelFiveData] = useState ([])
    const [details, updateDetail] = useStateWithCallbackLazy ({
        underUser:'',
        levelOne:'',
        levelTwo:'',
        levelThree:'',
        levelFour:'',
        levelFive:''
    })
    
    useEffect(() => {
        RetrieveData(`fetchAdminDetails`, (response) => {
            updateUserDetails(response.data.result)
        })
        RetrieveData(`fetchLevelOneDetails`, (response) => {
            updateLevelOneData(response.data.result)
        })
    },[])

    const onChangeEvent = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        // if(name === 'underUser' && value !== '') {
        //     console.log(user)
        //     let id = user[value].id
        //     RetrieveData(`fetchAdminDetailsSelected|${id}`, (response) => {
        //         console.log(response.data.result[0])
        //         let {levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid} = response.data.result[0];
        //         console.log(details);
        //         updateDetail({...details, [name] : value, levelOne:levelonemid, levelTwo:leveltwomid, levelThree:levelthreemid, levelFour:levelfourmid, levelFive:levelfivemid})
        //     })
        // }else if(name === 'underUser' && value === ''){
        //     updateDetail({...details, [name] : value, levelOne:'', levelTwo:'', levelThree:'', levelFour:'', levelFive:''})
        // }else{
        //     updateDetail({...details, [name] : value})
        // }
        updateDetail({...details, [name] : value})
        FetchLevels(name, value, updateLevelTwoData, updateLevelThreeData, updatelevelFourData, updatelevelFiveData)
    }

    // console.log("user------------------------------------", user)
    // console.log("details---------------------------------", details)
    const create = (e) => {
        e.preventDefault()
        const {userName, underUser} = details;

        // Create user under existing user 
        const createUserFn = (details) => {
            console.log(details)
            let min = 1, max = 1000, value = underUser;
        
            if(value !== ''){
                min = Number(user[value].levelid);
                if (user[value+1] !== undefined)  
                    max = user[value+1].levelid
                else 
                    max = Number(user[value].levelid) + 10 
            }

            function getRandomNumber(min, max) {
                return Math.random() * (max - min) + min
            }

            let levelid = getRandomNumber(min, max)
            console.log(userName, levelid)
            // return false;
            StoreData(`createUser|${levelid}|${JSON.stringify(details)}`, (response) => {
                // Updating state with new value
                if(response.data.success===true){
                    const insert = function(user, index, item) {
                        return [
                            ...user.slice(0, index),     
                            item,                       
                            ...user.slice(index)      
                        ]
                    }
                    const item = {'adminid':userName, 'levelid':levelid}, index = value+1
                    let newUser = insert(user, index, item)
                    updateUserDetails([...newUser])
                }
            })
        }

        if(user[underUser] !== undefined) {
            let id = user[underUser].id;
            RetrieveData(`fetchAdminDetailsSelected|${id}`, (response) => {
                console.log(response.data.result[0])
                let {levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid} = response.data.result[0]; 
                updateDetail({...details, levelOne:levelonemid, levelTwo:leveltwomid, levelThree:levelthreemid, levelFour:levelfourmid, levelFive:levelfivemid}, (details) => {
                    console.log(details);
                    createUserFn(details)
                })
            })
        }else{
            createUserFn(details)
        }
    }

    return(
        <Container maxWidth="lg">
            <Box id="LR" sx={{m: '40px auto', p : '60px 40px', textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <AccountCircleIcon/>
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Create User</h1>
                <Box component="form" onSubmit={(e) => create(e)}>
                    <Grid container columnSpacing={{ xs: 0, sm: 3}} rowSpacing={{xs : 3}} sx={{mb:'50px'}}>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField fullWidth
                                required
                                id="outlined-required"
                                label="User Name"
                                autoFocus
                                name = "userName"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>    
                            <FormControl fullWidth sx = {{textAlign:"left"}}>
                                <InputLabel id="underUser">Under User</InputLabel>
                                <Select
                                    labelId="underUser"
                                    id="demo-simple-select"
                                    label="Under User"
                                    value={details.underUser}
                                    name = "underUser"
                                    onChange={onChangeEvent}
                                    fullWidth
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {user.map((value, index) => (<MenuItem value={index} key={index}>{value.adminid}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {(details.underUser === '') && <FetchLevelsUI onChangeEventProp={onChangeEvent} detailsProp={details} levelOneDataProp={levelOneData} levelTwoDataProp={levelTwoData} levelThreeDataProp={levelThreeData} levelFourDataProp={levelFourData} levelFiveDataProp={levelFiveData}/>}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Create User
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}


