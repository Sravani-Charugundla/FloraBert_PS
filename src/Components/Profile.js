import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Authenticate/firebase';

function Profile() {
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const auth = getAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        let userDetails;

        // Check the sign-in method
        if (user.providerData && user.providerData[0].providerId === 'github.com') {
          // GitHub sign-in
          userDetails = {
            displayName: user.displayName,
            email: user.email,
            // Add other GitHub user details you want to display
          };
        } else if (user.providerData && user.providerData[0].providerId === 'google.com') {
          // Google sign-in
          console.log(user.photoURL);
          userDetails = {
            displayName: user.displayName,
            email: user.email,
            // Add other Google user details you want to display
          };
        } else {
          // Email/password sign-in, fetch details from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            userDetails = docSnap.data();
          }
        }

        setUserDetails(userDetails);
      } else {
        // User is signed out
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div>
      <Button variant="primary" onClick={handleShow} style={{ marginRight: '40px' }}>
        <BsFillPersonFill size={25} />
      </Button>

      <Modal show={show} onHide={handleClose} animation={true} dialogClassName='modal-sm'>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails ? (
            <>
              <img src = {userDetails.photoURL}/>
              <p>Display Name: {userDetails.displayName}</p>
              <p>Email: {userDetails.email}</p>
              
              {/* Add other user details based on the sign-in method */}
            </>
          ) : (
            <p>User not signed in</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
