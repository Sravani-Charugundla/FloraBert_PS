import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const HomeNav = () => {
    const location = useLocation();

    const logout = () => {
        // Perform logout actions, such as clearing the access token from localStorage
        localStorage.removeItem('accessToken');

        // Redirect the user to the login page
        window.location.href = '/';
    };

    return (
        <div>
            <nav className="navbar  bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Florabert</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>


                        </ul>
                        <form className="d-flex" role="search">
                            <button type="button" className="btn btn-danger" onClick={logout}>LogOut</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HomeNav;
