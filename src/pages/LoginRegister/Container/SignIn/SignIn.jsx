import React, { Component, useState, useEffect, useContext } from 'react';
import Heading from '../../../../components/Heading/Heading.js';
import NeonButton from '../../../../components/NeonButton/NeonButton.js';
import { Link, useHistory } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import { apiSignin, baseURL, url_gAuth } from "../../../../api/api"
import { withRouter } from "react-router-dom"
import Cookies from "js-cookie"
import { AuthApi, SetAuthApi, Width } from "../../../../App"

import { css } from "glamor"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Notification from '../../../../components/Notification/Notification.js';
import GoogleButton from 'react-google-button'


toast.configure()
function SignIn(props) {

    const _Width = useContext(Width)
    const Auth = useContext(AuthApi)
    const SetAuth = useContext(SetAuthApi)
    const history = useHistory()

    const [email, setemail] = useState("")
    const [pwd, setpwd] = useState("")
    const [validationError, setvalidationError] = useState("")

    // Refs
    let textInput = null;

    useEffect(() => {
        // textInput.current.focus();
        return () => {

        }
    }, [])

    const validate = () => {
        let validationError = '';

        if (!email) {
            validationError = 'Email field cannot be blank';
        }
        else {
            if (!email.includes('@')) {
                validationError = 'Invalid Email! Try a different one!';
            }
            else {
                if (!pwd) {
                    validationError = 'Password field cannot be blank';
                }
            }
        }

        if (validationError) {
            setvalidationError(validationError)
            return false;
        }
        return true;
    }

    const onSubmit = async (SetAuth) => {
        if (validate()) {
            const response = await apiSignin({ email: email, pwd: pwd })
            if (response.auth) {
                Cookies.set("token", response.token)
                SetAuth(true)
                toast.success("Login Successful", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                history.push("/dashboard")
            }
            else {
                setvalidationError("Invalid Email/Password")
            }
        }
    }

    const giveFocus = () => {
        this.textInput.current.focus();
    }

    const clickGoogleIcon = () => {
        window.location = `${baseURL}${url_gAuth}`
        // history.push()
    }

    return (
        <div className="form-container sign-in-container" >
            <Heading text="LOGIN" fontSize="35px"></Heading>
            <div className="form-class">
                <input className="input-field-style" ref={(input) => { textInput = input; }} type="text" placeholder="Email" required value={email} onChange={(e) => setemail(e.target.value)} />
                <input className="input-field-style" type="password" placeholder="Password" required value={pwd} onChange={(e) => setpwd(e.target.value)} />
            </div>
            { validationError ? (<div className="validation-output">{validationError}</div>) : null
            }
            <Link to="/forgot-password"><div className="forgot-password" >Forgot password?</div></Link>

            {_Width < 1100 && <HashLink to="/login-register#register"><div className="forgot-password" >Not Registered Yet?</div></HashLink>}
            <GoogleButton className="google-button" onClick={clickGoogleIcon} type="dark" />
            <NeonButton props={{ text: "Sign In", color: "#26a0da", onClick: onSubmit, parameters: SetAuth, credentials: { email: email, pwd: pwd } }} />
        </div>
    )
}

export default withRouter(SignIn);