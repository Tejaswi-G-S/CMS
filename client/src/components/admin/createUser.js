import React, { useEffect, useState } from "react";
import {Avatar, Box, TextField, Button, Grid } from "@mui/material";
import Container from '@mui/material/Container'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RetrieveData, StoreData } from '../api/apiCall';
import { FetchLevels, FetchLevelsUI } from "../reUsable/levelData";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { FetchAdminData, AdminDataUI } from '../reUsable/adminData'

export const CreateAdmin = () => {
    const [admin, updateAdminDetails] = useState([])
    const [levelOneData, updateLevelOneData] = useState ([])
    const [levelTwoData, updateLevelTwoData] = useState ([])
    const [levelThreeData, updateLevelThreeData] = useState ([])
    const [levelFourData, updatelevelFourData] = useState ([])
    const [levelFiveData, updatelevelFiveData] = useState ([])
    const [details, updateDetail] = useStateWithCallbackLazy ({
        underAdmin:'',
        levelOne:'',
        levelTwo:'',
        levelThree:'',
        levelFour:'',
        levelFive:''
    })
    
    useEffect(() => {
        FetchAdminData(updateAdminDetails);
        RetrieveData(`fetchLevelOneDetails`, (response) => {
            updateLevelOneData(response.data.result)
        })
    },[])

    const onChangeEvent = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        FetchLevels(name, value, updateDetail, updateLevelTwoData, updateLevelThreeData, updatelevelFourData, updatelevelFiveData)
        updateDetail({...details, [name] : value})
    }

    console.log(details)
    const create = (e) => {
        e.preventDefault()
        const {adminName, underAdmin} = details;

        // Create admin under existing admin 
        const createAdminFn = (details) => {
            console.log(details)
            let min = 1, max = 1000, value = underAdmin;
        
            if(value !== ''){
                min = Number(admin[value].levelid);
                if (admin[value+1] !== undefined)  
                    max = admin[value+1].levelid
                else 
                    max = Number(admin[value].levelid) + 10 
            }

            function getRandomNumber(min, max) {
                return Math.random() * (max - min) + min
            }

            let levelid = getRandomNumber(min, max)
            console.log(adminName, levelid)
            // return false;
            StoreData(`createAdmin|${levelid}|${JSON.stringify(details)}`, (response) => {
                // Updating state with new value
                if(response.data.success===true){
                    const insert = function(admin, index, item) {
                        return [
                            ...admin.slice(0, index),     
                            item,                       
                            ...admin.slice(index)      
                        ]
                    }
                    const item = {'adminid':adminName, 'levelid':levelid}, index = value+1
                    let newAdminList = insert(admin, index, item)
                    updateAdminDetails([...newAdminList])
                }
            })
        }

        if(admin[underAdmin] !== undefined) {
            let id = admin[underAdmin].id;
            RetrieveData(`fetchAdminDetailsSelected|${id}`, (response) => {
                console.log(response.data.result[0])
                let {levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid} = response.data.result[0]; 
                updateDetail({...details, levelOne:levelonemid, levelTwo:leveltwomid, levelThree:levelthreemid, levelFour:levelfourmid, levelFive:levelfivemid}, (details) => {
                    console.log(details);
                    createAdminFn(details)
                })
            })
        }else{
            createAdminFn(details)
        }
    }

    return(
        <Container maxWidth="lg">
            <Box id="LR" sx={{m: '40px auto', p : '60px 40px', textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <AccountCircleIcon/>
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Create Admin</h1>
                <Box component="form" onSubmit={(e) => create(e)}>
                    <Grid container columnSpacing={{ xs: 0, sm: 3}} rowSpacing={{xs : 3}} sx={{mb:'50px'}}>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField fullWidth
                                required
                                id="outlined-required"
                                label="Admin Name"
                                autoFocus
                                name = "adminName"
                                onChange = {onChangeEvent}
                            />
                        </Grid>
                        <AdminDataUI adminDataProp={admin} onChangeEventProp={onChangeEvent}  detailsProp={details}/>
                        {(details.underAdmin === '') && <FetchLevelsUI onChangeEventProp={onChangeEvent} detailsProp={details} levelOneDataProp={levelOneData} levelTwoDataProp={levelTwoData} levelThreeDataProp={levelThreeData} levelFourDataProp={levelFourData} levelFiveDataProp={levelFiveData}/>}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Create Admin
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}


