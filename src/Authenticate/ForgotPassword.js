import React, { useState } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth} from './firebase'; // Update this import to the correct path
import { db } from './firebase';
function ForgotPassword() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [isResetSent, setIsResetSent] = useState(false);

    const handleClose = () => {
        setShow(false);
        setIsResetSent(false);
    };

    const handleShow = () => {
        setShow(true);
        setIsResetSent(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async () => {
        try {
            console.log(email);
            await auth.sendPasswordResetEmail(db,email).then(data=>{
                alert("Check you mail ID");
            }).catch(err=>{
                alert(err.code)
            })
            setIsResetSent(true);
        } catch (error) {
            console.error('Error sending reset password email:', error.message);
        }
    };
    

    return (
        <div>
            <Link to="#" onClick={handleShow}>
                Forgot Password
            </Link>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isResetSent ? (
                        <>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Email
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </InputGroup>
                            <Button variant="primary" onClick={handleResetPassword}>
                                Reset Password
                            </Button>
                        </>
                    ) : (
                        <p>Password reset email sent. Check your email for further instructions.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {/* You can add a button to close the modal if needed */}
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ForgotPassword;
