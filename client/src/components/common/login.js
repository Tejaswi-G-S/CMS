import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import { Avatar, Box, TextField, Button} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import { RetrieveData } from '../api/apiCall'
import { useNavigate  } from 'react-router-dom';

export const Login = ({logInSet}) => {
    const history = useNavigate();
    const [loginDetails, setLogin] = useState ({})
    const loginEvent = (e) => {
        e.preventDefault()
        //Getting login details 
        RetrieveData(`login|${loginDetails.userId}|${loginDetails.password}`, (response) => {
            console.log(response)
            //Lifting State Up from child to parent - Sending props to parent 
            if (response.data.success === true){
                logInSet(response.data.result[0].adminid, response.data.result[0].levelid);
                history('/createUser');
            }
        })
    }
    const onChangeEvent = (e) => {
        const {name, value} = e.target;
        setLogin({...loginDetails, [name] : value})
    }
    return (
        <Container maxWidth="lg">
            <Box maxWidth="400px" id="LR" sx={{m: '40px auto', p : '60px 40px', boxShadow: '0 0 7px 2px rgba(0,0,0,0.07)', textAlign:"center"}} >
                <Avatar id="avatarIcon">
                    <LockOutlinedIcon />
                </Avatar>
                <h1 style={{margin : '10px 0 40px'}}>Sign In</h1>
                <Box component="form" onSubmit={(e) => loginEvent(e)}>
                    <TextField fullWidth
                        required
                        id="outlined-required"
                        label="User Name"
                        autoFocus
                        sx = {{mb : 5}}
                        name = "userId"
                        onChange = {onChangeEvent}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        fullWidth
                        sx = {{mb : 5}}
                        name = "password"
                        onChange = {onChangeEvent}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx = {{mb : 7}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs sx={{textAlign:'left'}}>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}