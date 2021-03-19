import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import firebaseConfig from '../../firebaseConfig';


const SignUp = () => {
    const handleGoogleSignUp = () => {
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
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleFacebookSignUp = () => {
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

    const handleBlur = () => {

    }
    return (
        <div>
            <div className="signUp">
                <h1>Create an account</h1>
                <form className="form">
                    <input onBlur={handleBlur} type="text" name="name" placeholder="Name"></input>
                    <input onBlur={handleBlur} type="email" name="email" placeholder="Email"></input>
                    <input onBlur={handleBlur} type="password" name="password" placeholder="Password"></input>
                    <input onBlur={handleBlur} type="password" name="confirmPassword" placeholder="Confirm Password"></input>
                    <button className="signupBtn">Create an account</button>
                </form>
                <h3>Already have an account?<Link className="link" to="/login">Login</Link></h3>
            </div>
            <div className="alternateSignup">
                <div className="orContainer">
                    <span className="lines"></span>
                    <h3>Or</h3>
                    <span className="lines"></span>
                </div>
                <div  className="socialSignup">
                    <div onClick={handleGoogleSignUp} className="signupSites">
                        <FontAwesomeIcon className="facebookIcon icons" icon={faFacebook}/>
                        <h4>Continue with Facebook</h4>
                    </div>
                    <div onClick={handleFacebookSignUp} className="signupSites">
                        <FontAwesomeIcon className="googleIcon icons" icon={faGoogle}/>
                        <h4>Continue with Google</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;