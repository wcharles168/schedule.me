import React, {useState} from 'react'
import {Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from '@material-ui/core'
import {AccountCircle, Visibility, VisibilityOff} from '@material-ui/icons'
import {useStyles} from './landing.js'

export function CreateAccount() {
    const classes = useStyles()
    const defaultErr = 'At least 8 characters long'
    const [values, setValues] = useState({
        username: '',
        password: '',
        errMessage: defaultErr,
        showPassword: false,
        invalidPassword: true
    })
    const validatePassword = (event) => {
        if (event.target.value.length < 8) {
            setValues({...values, ["password"]: event.target.value, ["errMessage"]: defaultErr, ["invalidPassword"]: true})
        } else {
            setValues({...values, ["password"]: event.target.value, ["errMessage"]: '', ["invalidPassword"]: false})
        }
    }
    const handleChange = (prop) => (event) => {
        if (prop === "password") {
            validatePassword(event)
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    async function createUser() {
        // const response = await fetch('/testInsert')
        console.log(JSON.stringify(values))
        const response = await fetch('/api/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values)
        })
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
                        endAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.input}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password" 
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>{values.errMessage}</FormHelperText>
                </FormControl>
            </form>
            <Button variant="contained" onClick={createUser}>Create Account</Button>
        </div>
    ) 
}