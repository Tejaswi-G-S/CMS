import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { RetrieveData } from '../api/apiCall';
import {Avatar, Box } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";

export const ComplaintsList = () => {
    const [complaints, updateComplaintList] = useState();

    useEffect(() => {
        RetrieveData(`fetchComplaints`, (response) => {
            updateComplaintList(response.data.result)
        })
    },[])

    const columns = [
        { field: 'complaintid', headerName: 'Complaint ID', width:170},
        { field: 'complaintgivenby', headerName: 'First name', width:200},
        { field: 'contactnumber', headerName: 'Contact Number', width:130},
        { field: 'uid', headerName: 'UID', width: 150},
        { field: 'subject', headerName: 'Subject', width: 200},
        // { field: 'address', headerName: 'Address'},
        { field: 'View Complaint', 
            headerName: 'View Complaint', 
            width:200,  
            renderCell: (params) => (
                <Link to = {`/complaintsDetails/${params.row.complaintid}`}>Complaints</Link>
            ),
            sortable: false,
            filterable: false,
        }
    ];
    const rows = complaints;

    return (
        <Container maxWidth="lg">
            <Box id="LR" sx={{m: '40px auto', p : '60px 40px', textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <AdbIcon />
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Complaints</h1>
                <div style={{ height: 400, width: '100%' }}>
                    {complaints !== undefined &&
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            getRowId={(row) => row.complaintid}
                            rowsPerPageOptions={[5]}
                            // autoPageSize={true}
                            // checkboxSelection
                        />
                    }
                </div>
            </Box>
        </Container>
    );
}