import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import {Avatar, Box, Grid} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import {useParams} from "react-router-dom";
import {RetrieveData} from '../api/apiCall';
import {DateTime} from '../../config/dateFormat'

export const ComplaintDetails = () => {
    let params = useParams()
    const [ComplaintDetails, updateComplaintDetails] = useState([]);
    const [levelOneName, updatelevelOneName] = useState([]);
    const [levelTwoName, updatelevelTwoName] = useState({});
    const [levelThreeName, updatelevelThreeName] = useState({});
    const [levelFourName, updatelevelFourName] = useState({});
    const [levelFiveName, updatelevelFiveName] = useState({});
    const [underUserName, updatelevelUnderUserName] = useState();
    
    useEffect(() => {
        RetrieveData(`fetchComplaintDetails|${params.complaintID}`, (response) => {
            updateComplaintDetails(response.data.result)
        })
    },[params.complaintID])

    useEffect(() => {
        if (ComplaintDetails.length > 0) {
            if(ComplaintDetails[0].levelonemid !== ''){
                RetrieveData(`levelOneName|${ComplaintDetails[0].levelonemid}`, (response) => {
                    updatelevelOneName(response.data.result[0])
                })
            }
            if(ComplaintDetails[0].leveltwomid !== ''){
                RetrieveData(`levelTwoName|${ComplaintDetails[0].leveltwomid}`, (response) => {
                    updatelevelTwoName(response.data.result[0])
                }) 
            }
            if(ComplaintDetails[0].levelthreemid !== ''){    
                RetrieveData(`levelThreeName|${ComplaintDetails[0].levelthreemid}`, (response) => {
                    updatelevelThreeName(response.data.result[0])
                }) 
            }
            if(ComplaintDetails[0].levelfourmid !== ''){
                RetrieveData(`levelFourName|${ComplaintDetails[0].levelfourmid}`, (response) => {
                    updatelevelFourName(response.data.result[0])
                }) 
            }
            if(ComplaintDetails[0].levelfivemid !== ''){        
                RetrieveData(`levelFiveName|${ComplaintDetails[0].levelfivemid}`, (response) => {
                    updatelevelFiveName(response.data.result[0])
                }) 
            }
            if(ComplaintDetails[0].complaintunder !== null){        
                RetrieveData(`fetchAdminDetailsSelected|${ComplaintDetails[0].complaintunder}`, (response) => {
                    updatelevelUnderUserName(response.data.result[0].adminid)
                }) 
            }
        }
    },[ComplaintDetails])

    // useEffect(() => {
    //     if (ComplaintDetails.length > 0) {
    //         let levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName;
    //         const fetchLeveName = (callback) => {
    //             RetrieveData(`levelOneName|${ComplaintDetails[0].levelonemid}`, (response) => {
    //                 levelOneName = response.data.result[0].levelname;
    //                 callback(levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName)
    //             }) 
    //             RetrieveData(`levelTwoName|${ComplaintDetails[0].leveltwomid}`, (response) => {
    //                 levelTwoName = response.data.result[0].levelname;
    //                 callback(levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName)
    //             }) 
    //             RetrieveData(`levelThreeName|${ComplaintDetails[0].levelthreemid}`, (response) => {
    //                 levelThreeName = response.data.result[0].levelname;
    //                 callback(levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName)
    //             }) 
    //             RetrieveData(`levelFourName|${ComplaintDetails[0].levelfourmid}`, (response) => {
    //                 levelFourName = response.data.result[0].levelname;
    //                 callback(levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName)
    //             }) 
    //             RetrieveData(`levelFiveName|${ComplaintDetails[0].levelfivemid}`, (response) => {
    //                 levelFiveName = response.data.result[0].levelname;
    //                 callback(levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName)
    //             }) 
    //         }
    //         fetchLeveName((levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName) => {
    //             console.log(levelOneName, levelTwoName, levelThreeName, levelFourName, levelFiveName)
    //             if(ComplaintDetails[0].entered === undefined) {
    //                 updateComplaintDetails([{...ComplaintDetails[0], 'levelOneName' : levelOneName, 'levelTwoName' : levelTwoName, 'levelThreeName' : levelThreeName, 'levelFourName' : levelFourName, 'levelFiveName' : levelFiveName, 'entered' : true}])
    //             }  
    //         })
    //     }
    // },[ComplaintDetails])

    if (ComplaintDetails.length > 0) {
        var {complaintid, complaintgivenby, contactnumber, uid, address, emailid, subject, description, dateadded} = ComplaintDetails[0]
    }

    // console.log(ComplaintDetails)
    return (
        <Container maxWidth="lg">
            <Box id="LR" sx={{m: '40px auto', p : '60px 40px', textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <AdbIcon />
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Complaint Details</h1>
                <Grid className="complaintDetail" container columnSpacing={{ xs: 4, sm: 4}} rowSpacing={{xs : 1}} sx={{mb:'10px', textAlign:'left'}}>
                    <Grid item xs={12} sm={6}>
                        <label>Complaint ID</label>
                        <p>{complaintid}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>Complaint Given By</label>
                        <p>{complaintgivenby}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>Contact Number</label>
                        <p>{contactnumber}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>UID</label>
                        <p>{uid}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>Address</label>
                        <p>{address}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>Email ID</label>
                        <p>{emailid}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>Contact Number</label>
                        <p>{contactnumber}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>Date Of Complaint</label>
                        <p>{DateTime(dateadded)}</p>
                    </Grid>
                    {(underUserName !== undefined) &&
                        <Grid item xs={12} sm={6}>
                            <label>Complaint Under</label>
                            <p>{underUserName}</p>
                        </Grid>
                    }
                    <Grid item xs={12} sm={6}>
                        <label>Complaint Under Locality</label>
                        <p>{levelOneName.levelname} {(levelTwoName.levelname) &&  '>'} {levelTwoName.levelname} {(levelThreeName.levelname) &&  '>'} {levelThreeName.levelname} {(levelFourName.levelname) &&  '>'} {levelFourName.levelname} {(levelFiveName.levelname) &&  '>'} {levelFiveName.levelname}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <label>Subject</label>
                        <p>{subject}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <label>Description</label>
                        <p>{description}</p>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}