import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider,GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import './Login.css';
import { auth, db } from "./firebase";
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import Google and GitHub icons
import ForgotPassword from "./ForgotPassword";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleRedirect() {
    window.open("https://www.figma.com/file/c2Cen99OsqSHMt6ZF9xpe7/Untitled?type=whiteboard&node-id=0-1&t=wihC9wt6PVS25Qjz-0", "_blank");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const authInstance = getAuth();

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      const userId = userCredential.user.uid;
      console.log(userId);
      console.log(email);
      // Fetch user details from Fire store based on email
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("mail", "==", email));
      console.log(userQuery);
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        setError("User details not found.");
        return;
      }

      // Assuming there's only one user with the given email
      const userDetails = querySnapshot.docs[0].data();

      console.log("User logged in successfully", userDetails);

      // Redirect the user to the home page or another page
      history("/home"); // Update the path as needed
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    const authInstance = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const userCredential = await signInWithPopup(authInstance, provider);
      const user = userCredential.user;

      // Check if the user exists in Firestore
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("email", "==", user.email));
      const querySnapshot = await getDocs(userQuery);
      console.log(querySnapshot);

      if (querySnapshot.empty) {
        // User doesn't exist, you can redirect to a sign-up page or handle it as needed
        setError("User not registered. Please sign up.");
        return;
      }

      // User exists, you can redirect to the home page or handle it as needed
      history("/home"); // Update the path as needed
    } catch (error) {
      console.error(error);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  

  const handleGitHubSignIn = async () => {
    const authInstance = getAuth();
    const provider = new GithubAuthProvider();

    try {
      // Sign in with GitHub
      const userCredential = await signInWithPopup(authInstance, provider);
      const user = userCredential.user;

      // Check if the user exists in Firestore based on GitHub display name
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("displayName", "==", user.displayName));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        // User doesn't exist, you can redirect to a sign-up page or handle it as needed
        setError("User not registered. Please sign up.");
        return;
      }

      // User exists, you can redirect to the home page or handle it as needed
      history("/home"); // Update the path as needed
    } catch (error) {
      console.error(error);
      setError("GitHub Sign-In failed. Please try again.");
    }
  };






  return (
    <div className="card-container">
      <button onClick={handleRedirect} style={{ position: 'absolute', top: '10px', right: '10px' }} className="btn btn-info">
        FLOWCHART
      </button>
      <div className="card">
        <div className="login">
          <h1>Log In</h1>
          <form onSubmit={handleLogin} style={{ justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <label htmlFor="UserId">Enter Email</label>
            <input type="text" id="UserId" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <br />
            <label htmlFor="password">Enter Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <br />
            
            <button type="submit" class="btn btn-success">Login</button>
            <p>{error}</p>
            <p>or</p>
          </form>
          <br />

          <br />
          <br />
          <br />

          <br />
          <br />



          
          <div className="d-flex justify-content-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-danger rounded-circle p-2"
              style={{ marginRight: '10px' }}
            >
              <FaGoogle size={25} />
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="btn btn-dark rounded-circle p-2"
              style={{ marginLeft: '10px' }}
            >
              <FaGithub size={25} />
            </button>
          </div>
          
          <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
          <ForgotPassword/>
        </div>
      </div>
    </div>
  );
}

export default Login;
