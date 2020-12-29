import React, {useState, useEffect} from 'react'

export function LandingComponent() {
    // const [auth2, setAuth] = useState(null)
    // useEffect(() => {
    //     gapi.load('auth2', () => {
    //         setAuth(gapi.auth2.init({
    //             client_id: '681660428307-tlu6t58okkk8i6vi2fe4dm39i933f548.apps.googleusercontent.com'
    //         }))
    //     })
    // })
    // function onSignIn() {
    //     gapi.load('auth2', () => {

    //     })
    // }
    async function login() {
        const response = await fetch('http://localhost:8000/getLoginUrl')
        const url = response.url 
    }
    return (
        <React.Fragment>
            <button onClick={login}>Login</button>
            {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
        </React.Fragment>
    ) 
}