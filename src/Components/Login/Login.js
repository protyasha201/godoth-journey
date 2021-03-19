import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import firebase from "firebase/app";
import firebaseConfig from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';


const Login = () => {
    const handleGoogleLogin = () => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { displayName, email, photoURL };
                // setLoggedInUser(signedInUser);
                // history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleFacebookLogin = () => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    return (
        <div>
            <div className="login">
                <h1>Login</h1>
                <form className="form">
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    <div className="forgotPass">
                        <input className="checkBox" type="checkbox" name="checkbox"></input>
                        <p>Remember Me</p>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button className="loginButton">Login</button>
                </form>
                <h3>Don't have an account?<Link className="link" to="/signup">Create an account</Link></h3>
            </div>
            <div className="alternateLogin">
                <div className="orContainer">
                    <span className="lines"></span>
                    <h3>Or</h3>
                    <span className="lines"></span>
                </div>
                <div onClick={handleFacebookLogin} className="socialLogin">
                    <div className="loginSites">
                        <FontAwesomeIcon className="facebookIcon icons" icon={faFacebook} />
                        <h4>Continue with Facebook</h4>
                    </div>
                    <div onClick={handleGoogleLogin} className="loginSites">
                        <FontAwesomeIcon className="icons googleIcon" icon={faGoogle} />
                        <h4>Continue with Google</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;