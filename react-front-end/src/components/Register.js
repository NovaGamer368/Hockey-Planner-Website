import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUserName] = useState()
    const [notification, setNotification] = useState()

    const createUser = () => {

        const updateAPICall = `http://localhost:7005/newUser/`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, Password: password, Username: username })
        };

        fetch(updateAPICall, requestOptions)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setNotification(data.Message)
                if (data.User !== null) {
                    window.location.href = `/?apiKey=${data.User.Key}`
                }
            })
            .catch(e => console.log(e))
    }
    return (
        <>
            <div className='text-center d-flex align-items-center justify-content-center flex-column min-vh-100'>
                <h1>NEW USER!</h1>
                <h3 className='text-danger'>{notification}</h3>
                <div>Username</div>
                <input className='p-3 mr-2' type='text' value={email} placeholder='Username' onChange={(e) => setEmail(e.target.value)} />
                <div>Email</div>
                <input className='p-3 mr-2' type='text' value={password} placeholder='Email' onChange={(e) => setPassword(e.target.value)} />
                <div>Password</div>
                <input className='p-3 mr-2' type='text' value={username} placeholder='Password' onChange={(e) => setUserName(e.target.value)} />
                <div className='mt-5'>
                    <button className='btn btn-primary br-5 mx-2' onClick={createUser}>Create User</button>
                    <NavLink to={'/'} className={'btn btn-secondary br-5 mx-2'}>Back to Home</NavLink>
                </div>
            </div>
        </>
    )
}

export default Register