import React, {useState} from 'react'
import GoogleButton from 'react-google-button'
import {makeStyles} from '@material-ui/core/styles'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {CreateAccount} from './signUp.js'
import {Login} from './signIn.js'

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    },
    show: {
        display: 'block'
    },
    hide: {
        display: 'none'
    },
    form: {
        margin: theme.spacing(2)
    },
    input: {
      margin: theme.spacing(1),
      width: '25ch'
    },
}));

export function LandingComponent() {
    const classes = useStyles()
    const [alignment, setAlignment] = useState(false) // false is sign up; true is sign in
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <div className={classes.root}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
            >
                <ToggleButton value={false}>Sign Up</ToggleButton>
                <ToggleButton value={true}>Sign In</ToggleButton>
            </ToggleButtonGroup>
            <div className={`${alignment ? classes.hide : classes.show}`}>
                <CreateAccount/>
            </div>
            <div className={`${alignment ? classes.show : classes.hide}`}>
                <Login/>
            </div>
            <div>
                <h2>OR</h2>
                <GoogleButton/>
            </div>
        </div>
        
    )
}