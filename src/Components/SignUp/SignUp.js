import React, { useImperativeHandle, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import firebaseConfig from '../../firebaseConfig';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const SignUp = () => {
    const [user, setUser] = useState({
        isSignedUp: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        checkPassword: ''
    })

    const handleGoogleSignUp = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignedUp: true,
                    name: displayName,
                    email: email,
                }
                setUser(signedInUser);
            }).catch((error) => {
                //show error
            });
    }

    const handleFacebookSignUp = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignedUp: true,
                    name: displayName,
                    email: email,
                }
                setUser(signedInUser);
            })
            .catch((error) => {
                //show error
            });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const passwordLength = e.target.value.length > 6;
            const passwordNumberContains = /\d{1}/.test(e.target.value);
            isFieldValid = passwordLength && passwordNumberContains;
        }
        if (e.target.name === "confirmPassword") {
            if (user.password === e.target.value) {
                isFieldValid = true;
            }
            else {
                isFieldValid = false;
                const userInfoUpdate = {...user};
                userInfoUpdate.checkPassword = "Confirm Password is not correct";
                setUser(userInfoUpdate);
            }
        }
        if (isFieldValid) {
            const userInfoUpdate = { ...user };
            userInfoUpdate[e.target.name] = e.target.value;
            setUser(userInfoUpdate);
        }
    }

    const handleSignUp = (e) => {
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const userInfoUpdate = { ...user };
                    setUser(userInfoUpdate);
                })
                .catch((error) => {
                    const userInfoUpdate = {...user};
                    userInfoUpdate.error = error.message;
                    setUser(userInfoUpdate);
                });
        }
        else{
            alert("Form Not Valid");
        }
        e.preventDefault();
    }

    return (
        <div>
            <div className="signUp">
                <p>email: {user.email}</p>
                <p>pass: {user.password}</p>
                <p>{user.checkPassword}</p>
                <p style={{color: 'red'}}>{user.error}</p>
                <h1>Create an account</h1>
                <form onReset={handleSignUp} onSubmit={handleSignUp} className="form">
                    <input required onBlur={handleBlur} type="text" name="name" placeholder="Name"></input>
                    <input required onBlur={handleBlur} type="email" name="email" placeholder="Email"></input>
                    <input required onBlur={handleBlur} type="password" name="password" placeholder="Password"></input>
                    <input required onBlur={handleBlur} type="password" name="confirmPassword" placeholder="Confirm Password"></input>
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
                <div className="socialSignup">
                    <div onClick={handleGoogleSignUp} className="signupSites">
                        <FontAwesomeIcon className="facebookIcon icons" icon={faFacebook} />
                        <h4>Continue with Facebook</h4>
                    </div>
                    <div onClick={handleFacebookSignUp} className="signupSites">
                        <FontAwesomeIcon className="googleIcon icons" icon={faGoogle} />
                        <h4>Continue with Google</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;