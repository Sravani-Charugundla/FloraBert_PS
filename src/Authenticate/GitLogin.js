import React, { useEffect, useState } from 'react';

const CLIENT_ID = "9bb3fac800343b2bb13a";

function GitLogin() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        const getAccessToken = async () => {
            if (codeParam && localStorage.getItem("accessToken") == null) {
                try {
                    const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`);
                    const data = await response.json();

                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        window.location.href = "/Home";
                        setRerender(!rerender);
                    }
                } catch (error) {
                    console.error('Error fetching access token:', error);
                }
            }
        };

        getAccessToken();
    }, [rerender]);

    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:4000/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });

            const data = await response.json();
            console.log(data);
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div>
            {localStorage.getItem("accessToken") ?
                <>
                    <h1>We have access token</h1>
                    <button onClick={() => { localStorage.removeItem("accessToken"); setRerender(!rerender); }}>LogOut</button>
                    <h3>Get Data from GitHub API</h3>
                    <button onClick={getUserData}>Get Data</button>
                    {Object.keys(userData).length !== 0 ?
                        <>
                            <h4>Hey there {userData.login}</h4>
                        </>
                        :
                        <>
                        </>
                    }
                </> :
                <>
                    
                    <button onClick={() => window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)}>Login with Github</button>
                </>
            }
        </div>
    );
}

export default GitLogin;
