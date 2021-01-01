import React, {useState} from 'react'
import {Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from '@material-ui/core'
import {AccountCircle, Visibility, VisibilityOff} from '@material-ui/icons'
import {useStyles} from './landing.js'

export function CreateAccount() {
    const classes = useStyles()
    const defaultErr1 = 'Set a username'
    const defaultErr2 = 'At least 8 characters long'
    const [values, setValues] = useState({
        username: '',
        password: '',
        userErr: defaultErr1,
        passwordErr: defaultErr2,
        showPassword: false,
        invalidUser: true,
        invalidPassword: true
    })
    const validatePassword = (event) => {
        if (event.target.value.length < 8) {
            setValues({...values, ["password"]: event.target.value, ["passwordErr"]: defaultErr2, ["invalidPassword"]: true})
        } else {
            setValues({...values, ["password"]: event.target.value, ["passwordErr"]: '', ["invalidPassword"]: false})
        }
    }
    const updateUser = (event) => {
        if (event.target.value === '') {
            setValues({...values, ["username"]: event.target.value, ["userErr"]: defaultErr1, ["invalidUser"]: true})
        } else {
            setValues({...values, ["username"]: event.target.value, ["userErr"]: '', ["invalidUser"]: false})
        }   
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const validateUser = async (event) => {
        const response = await fetch('/api/user/' + values.username, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const users = await response.json()
        console.log(users)
        if (users.length > 0) {
            setValues({...values, ["userErr"]: "Username taken"})
        } else {
            createUser()
        }
    }
    async function createUser() {
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
                        onChange={updateUser}
                        endAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>{values.userErr}</FormHelperText>
                </FormControl>
                <FormControl className={classes.input}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password" 
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={validatePassword}
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
                    <FormHelperText>{values.passwordErr}</FormHelperText>
                </FormControl>
            </form>
            <Button 
                variant="contained" 
                disabled={values.invalidUser || values.invalidPassword} 
                onClick={validateUser}
            >
                Create Account
            </Button>
        </div>
    ) 
}