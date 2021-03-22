import React, { useContext, useState } from 'react';
import './SignUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const SignUp = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignUp = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { ...user };

                signedInUser.isSignedIn = true;
                signedInUser.name = displayName;
                signedInUser.email = email;

                setUser(signedInUser);
                history.replace(from);
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
                const signedInUser = { ...user };

                signedInUser.isSignedIn = true;
                signedInUser.name = displayName;
                signedInUser.email = email;

                setUser(signedInUser);
                history.replace(from);
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
                const userInfoUpdate = { ...user };
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
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const userInfoUpdate = { ...user };
                    userInfoUpdate.success = 'Sign up successful now please login';
                    setUser(userInfoUpdate);
                    updateUserName(user.name);
                    history.replace(from);
                })
                .catch((error) => {
                    const userInfoUpdate = { ...user };
                    userInfoUpdate.error = error.message;
                    setUser(userInfoUpdate);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const userInfoUpdate = { ...user };
                    userInfoUpdate.success = '';
                    userInfoUpdate.isSignedIn = true;
                    setUser(userInfoUpdate);
                    updateUserName(user.name);
                    history.replace(from);
                })
                .catch((error) => {
                    //show error
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
            .then(function () {
                //update successful
            })
            .then(function (error) {
                console.log(error);
            })
    }

    const changeForm = () => {
        setNewUser(!newUser);
    }

    return (
        <div>
            <p style={{ color: 'blue', textAlign: 'center' }}>{user.checkPassword}</p>
            <p style={{ color: 'red', textAlign: 'center' }}>{user.error}</p>
            <p style={{ color: 'green', textAlign: 'center' }}>{user.success}</p>
            <div style={{
                border: "3px solid rgb(157, 151, 151)",
                maxWidth: "400px",
                borderRadius: "5px",
                margin: "50px auto",
                padding: "20px"
            }}>
                <h1 style={{ color: 'coral' }}>{newUser ? "Create Account" : "Login"}</h1>
                <form onSubmit={handleSignUp} className="form">
                    {
                        newUser && <input required onBlur={handleBlur} type="text" name="name" placeholder="Name"></input>
                    }
                    <input required onBlur={handleBlur} type="email" name="email" placeholder="Email"></input>
                    <input required onBlur={handleBlur} type="password" name="password" placeholder="Password"></input>
                    {
                        newUser && <input required onBlur={handleBlur} type="password" name="confirmPassword" placeholder="Confirm Password"></input>
                    }
                    <input type="submit" className="signupLogin" value={
                        newUser ? "Create an account" : "Login"
                    } />
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <span>{newUser ? "Already have an account?" : "Don't have an account?"}</span>
                    <span style={{ color: 'cornflowerblue', cursor: 'pointer' }} onClick={changeForm}>{newUser ? "Login" : "Create an account"}</span>
                </div>
            </div>
            <div className="alternateSignup">
                <div className="orContainer">
                    <span className="lines"></span>
                    <h3>Or</h3>
                    <span className="lines"></span>
                </div>
                <div className="socialSignup" onClick={handleFacebookSignUp}>
                    <div className="signupSites">
                        <FontAwesomeIcon className="facebookIcon icons" icon={faFacebook} />
                        <h4>Continue with Facebook</h4>
                    </div>
                    <div onClick={handleGoogleSignUp} className="signupSites">
                        <FontAwesomeIcon className="googleIcon icons" icon={faGoogle} />
                        <h4>Continue with Google</h4>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SignUp;