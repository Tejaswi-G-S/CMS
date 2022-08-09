import React, {Fragment} from 'react';
import { RetrieveData } from '../api/apiCall';
import { Grid, Select, MenuItem, InputLabel, FormControl} from "@mui/material";

export const FetchAdminData = (updateAdminDetails) => {
    RetrieveData(`fetchAdminDetails`, (response) => {
        updateAdminDetails(response.data.result)
    }) 
}

export const AdminDataUI = ({adminDataProp, onChangeEventProp, detailsProp}) => {
    return (
        <Fragment>
            <Grid item xs={12} sm={6} md={6}>    
                <FormControl fullWidth sx = {{textAlign:"left"}}>
                    <InputLabel id="underAdmin">Under Admin</InputLabel>
                    <Select
                        labelId="underAdmin"
                        id="demo-simple-select"
                        label="Under Admin"
                        value={detailsProp.underAdmin}
                        name = "underAdmin"
                        onChange={onChangeEventProp}
                        fullWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {adminDataProp.map((value, index) => (<MenuItem value={index} key={index}>{value.adminid}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
        </Fragment>
    )
}