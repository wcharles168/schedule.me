import React, {useState} from 'react'
import {Button, FormControl, Input, InputLabel} from '@material-ui/core'
import {useStyles} from './landing.js'

export function Login() {
    const classes = useStyles()
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    })
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }
    async function signIn() {
        const response = await fetch('http://localhost:8000/getLoginUrl')
        const url = response.url 
    }
    return (
        <div>
            <form className={classes.form} autoComplete="off">
                <FormControl className={classes.input}>
                    <InputLabel htmlFor="standard-adornment-username">Username</InputLabel>
                    <Input
                        id="standard-adornment-username" 
                        value={values.username}
                        onChange={handleChange("username")}
                    />
                </FormControl>
                <FormControl className={classes.input}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password" 
                        type="password"
                        value={values.password}
                        onChange={handleChange("password")}
                    />
                </FormControl>
            </form>
            <Button variant="contained" onClick={signIn}>Sign In</Button>
        </div>
    ) 
}