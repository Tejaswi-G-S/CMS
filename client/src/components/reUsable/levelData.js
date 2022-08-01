// Higher Order Component

import React, {Fragment} from 'react';
import { RetrieveData } from '../api/apiCall';
import { Grid, Select, MenuItem, InputLabel, FormControl} from "@mui/material";

export const FetchLevels = (name, value, updateLevelTwoData, updateLevelThreeData, updatelevelFourData, updatelevelFiveData) => {
    switch (name) {
        case "levelOne": 
            RetrieveData(`fetchLevelTwoDetails|${value}`, (response) => {
                console.log(response)
                updateLevelTwoData([])
                updateLevelThreeData([])
                updatelevelFourData([])
                updatelevelFiveData([])
                if (response.data.success === true)
                    updateLevelTwoData(response.data.result)
            })
            break;
        case "levelTwo":
            RetrieveData(`fetchLevelThreeDetails|${value}`, (response) => {
                console.log(response)
                updateLevelThreeData([])
                updatelevelFourData([])
                updatelevelFiveData([])
                if (response.data.success === true)
                    updateLevelThreeData(response.data.result)
            })
            break;
        case "levelThree": 
            RetrieveData(`fetchLevelFourDetails|${value}`, (response) => {
                console.log(response)
                updatelevelFourData([])
                updatelevelFiveData([])
                if (response.data.success === true)  
                    updatelevelFourData(response.data.result)
            })
            break;
        case "levelFour": 
            RetrieveData(`fetchLevelFiveDetails|${value}`, (response) => {
                console.log(response)
                updatelevelFiveData([])
                if (response.data.success === true) 
                    updatelevelFiveData(response.data.result)
            })
            break;
        default:
            //console.log("Doesnot match with any Level")
            break;
    }
}

export const FetchLevelsUI = (props) => {
    const {onChangeEventProp, detailsProp, levelOneDataProp, levelTwoDataProp, levelThreeDataProp, levelFourDataProp, levelFiveDataProp} = props;
    return(
        <Fragment>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth sx = {{textAlign:"left"}}>
                    <InputLabel id="levelone">Under</InputLabel>
                    <Select
                        labelId="levelone"
                        id="demo-simple-select"
                        label="Under"
                        value={detailsProp.levelOne}
                        name="levelOne"
                        onChange={onChangeEventProp}
                        fullWidth
                    >
                        {levelOneDataProp.map((value, index) => (<MenuItem value={value.levelid} key={index}>{value.levelname}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            {   
                (levelTwoDataProp.length > 0) &&
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx = {{textAlign:"left"}}>
                        <InputLabel id="levelTwo">Under</InputLabel>
                        <Select
                            labelId="levelTwo"
                            id="demo-simple-select"
                            label="Under"
                            value={detailsProp.levelTwo}
                            name="levelTwo"
                            onChange={onChangeEventProp}
                            fullWidth
                        >
                            {levelTwoDataProp.map((value, index) => (<MenuItem value={value.levelid} key={index}>{value.levelname}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
            }{
                (levelThreeDataProp.length > 0) &&
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx = {{textAlign:"left"}}>
                        <InputLabel id="levelThree">Under</InputLabel>
                        <Select
                            labelId="levelThree"
                            id="demo-simple-select"
                            label="Under"
                            value={detailsProp.levelThree}
                            name = "levelThree"
                            onChange={onChangeEventProp}
                            fullWidth
                        >
                            {levelThreeDataProp.map((value, index) => (<MenuItem value={value.levelid} key={index}>{value.levelname}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
            }{
                (levelFourDataProp.length > 0) &&
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx = {{textAlign:"left"}}>
                        <InputLabel id="levelFour">Under</InputLabel>
                        <Select
                            labelId="levelFour"
                            id="demo-simple-select"
                            label="Under"
                            value={detailsProp.levelFour}
                            name = "levelFour"
                            onChange={onChangeEventProp}
                            fullWidth
                        >
                            {levelFourDataProp.map((value, index) => (<MenuItem value={value.levelid} key={index}>{value.levelname}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
            }{
                (levelFiveDataProp.length > 0) &&
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx = {{textAlign:"left"}}>
                        <InputLabel id="levelFive">Under</InputLabel>
                        <Select
                            labelId="levelFive"
                            id="demo-simple-select"
                            label="Under"
                            value={detailsProp.levelFive}
                            name = "levelFive"
                            onChange={onChangeEventProp}
                            fullWidth
                        >
                            {levelFiveDataProp.map((value, index) => (<MenuItem value={value.levelid} key={index}>{value.levelname}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
            } 
        </Fragment>
    )
}
