import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { linkWithCredential } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import Google and GitHub icons



function Signup() {
    const history = useNavigate();
    const [Error, setError] = useState('');
    const [userData, setUserData] = useState({})
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = e.target.Fname.value;
        const lastName = e.target.Lname.value;
        const mobileNo = e.target["Mno."].value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Validate password length


        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Access the user's unique ID from the userCredential
            const userId = userCredential.user.uid;

            // Store user information in Firestore
            await addDoc(collection(db, "users"), {
                userId,
                firstName,
                lastName,
                mobileNo,
                email,
            });

            console.log("User registered successfully");

            // Redirect the user to another page after successful signup
            history("/Home"); // Update the path as needed
        } catch (error) {
            console.error(error);
            setError("Sign up failed. Please check your details and try again.");
        }
    };

    
    

    

    const handleGitHubSignup = async () => {
        const provider = new GithubAuthProvider();

        try {
            // Sign up with GitHub
            const userCredential = await signInWithPopup(auth, provider);

            // Access the user's unique ID from the userCredential
            const userId = userCredential.user.uid;

            // Access additional user details if available
            const userDetails = {
                userId,
                displayName: userCredential.user.displayName || "",
                email: userCredential.user.email || "",
            };

            // Check if the user already exists in Firestore
            const userRef = collection(db, "users");
            const userSnapshot = await getDocs(query(userRef, where("userId", "==", userId)));

            if (userSnapshot.empty) {
                // User doesn't exist, store user information in Firestore
                await addDoc(userRef, userDetails);
                console.log("User registered with GitHub successfully");
            } else {
                // User already exists, link the accounts
                const existingUserDoc = userSnapshot.docs[0];
                const existingUserId = existingUserDoc.data().userId;

                if (existingUserId !== userId) {
                    // Attempt to link accounts
                    await linkWithCredential(
                        auth.currentUser,
                        GithubAuthProvider.credentialFromResult(userCredential)
                    );

                    console.log("Accounts linked successfully");
                }
            }

            // Redirect the user to another page after successful signup
            history("/Home"); // Update the path as needed
        } catch (error) {
            console.error(error);
            setError("GitHub Sign up failed. Please try again.");
        }
    };


    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
            // Sign up with Google
            const userCredential = await signInWithPopup(auth, provider);
            console.log("Full userCredential:", userCredential);
            // Access the user's unique ID from the userCredential
            const userId = userCredential.user.uid;
            console.log(userCredential.user.email);
    
            // Access additional user details if available
            const userDetails = {
                userId,
                displayName: userCredential.user.displayName || "",
                email: userCredential.user.email || "",
            };
    
            // Check if the user already exists in Firestore
            const userRef = collection(db, "users");
            const userSnapshot = await getDocs(query(userRef, where("userId", "==", userId)));
    
            if (userSnapshot.empty) {
                // User doesn't exist, store user information in Firestore
                await addDoc(userRef, userDetails);
                console.log("User registered with Google successfully");
            } else {
                // User already exists, link the accounts if needed
                const existingUserDoc = userSnapshot.docs[0];
                const existingUserId = existingUserDoc.data().userId;
    
                if (existingUserId !== userId) {
                    // You can choose to link accounts if needed
                    console.log("User already exists. You may choose to link accounts.");
                }
            }
    
            // Redirect the user to another page after successful signup
            history("/Home"); // Update the path as needed
        } catch (error) {
            console.error(error);
            setError("Google Sign up failed. Please try again.");
        }
    };
    





    return (
        <div className="card-containe" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="carde">
                <div className="Signup">
                    <h1>Sign Up</h1>
                    <form onSubmit={(e) => handleSubmit(e)} style={{ justifyContent: 'center', alignItems: 'center', height: '60vh' }} autoComplete="on">
                        
                        <label htmlFor="Fname">Enter FirstName</label>
                        <input name="Fname" type="text" placeholder="FirstName" />
                        <br />
                        <label htmlFor="Lname">Enter LastName</label>
                        <input name="Lname" type="text" placeholder="LastName" />
                        <br />
                        <label htmlFor="Mno.">Enter MobileNo</label>
                        <input name="Mno." type="number" placeholder="MobileNo" />
                        <br />
                        <label htmlFor="email">Enter EmailID</label>
                        <input name="email" type="email" placeholder="Email-ID" />
                        <br />
                        <label htmlFor="password">Enter Password</label>
                        <input name="password" type="password" placeholder="Password" />
                        <br />
                        <button type="submit" className="btn btn-success">SignUp</button>
                        <p>{Error}</p>
                        <div class="social-buttons">
                            <button className="btn btn-danger rounded-circle p-2" onClick={handleGoogleSignup} style={{ marginRight: '10px' }}>
                                <FaGoogle size={25} />
                            </button>

                            <button class="btn btn-dark rounded-circle p-2" onClick={handleGitHubSignup} style={{ marginLeft: '10px' }}>
                            <FaGithub size={25} />
                            </button>
                        </div>
                        

                    </form>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
