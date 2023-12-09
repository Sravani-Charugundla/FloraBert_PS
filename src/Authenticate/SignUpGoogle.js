import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase configuration
import { useNavigate, Link } from "react-router-dom";

function SignUpGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const history = useNavigate();



    const handleGoogleSignup = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            // Store user details in Firestore
            const usersCollection = collection(db, 'users');
            const userDocRef = await addDoc(usersCollection, {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                // Add other user details you want to store
            });

            console.log('Google Sign-up success:', user);
            console.log('User details stored in Firestore with ID:', userDocRef.id);
            history("/home"); // Update the path as needed

            // Handle user data or further actions as needed
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData ? error.customData.email : null;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error('Google Sign-up error:', errorCode, errorMessage, email, credential);
            // Handle errors as needed
        }
    };

    return (
        <div>
            <button
                className="btn btn-danger rounded-circle p-2"
                onClick={handleGoogleSignup}
                style={{ marginRight: '10px' }}
            >
                <FaGoogle size={25} />
            </button>
        </div>
    );
}

export default SignUpGoogle;
