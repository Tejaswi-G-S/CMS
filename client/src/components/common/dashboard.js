import React from "react";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";

export const Dashboard = () => {

    return(
        <Container maxWidth="lg">
            <header>
                <Grid container className="header" sx={{m: '40px 0'}}>
                    <Grid item xs sx={{textAlign:'left'}}>
                        CMS
                    </Grid>
                    <Grid item>
                        User
                    </Grid>
                </Grid>
            </header>
            <nav>
                <Grid container sx={{m: '40px 0'}}>
                    <Grid item xs={3}>
                        <Link to="/login">Login</Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to="/createUser">Create User</Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to="/registerComplaint">Register Complaint</Link>
                    </Grid>
                    <Grid item xs={3}>
                        User
                    </Grid>
                </Grid>
            </nav>
        </Container>
    )
}