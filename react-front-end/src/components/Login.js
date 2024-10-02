import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState('')

    const getUser = () => {
        const updateAPICall = `http://localhost:7005/user`

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            };
    
            fetch(updateAPICall, requestOptions)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    if (data.User !== null) {
                        window.location.href = `/user?apiKey=${data.User.Key}`
                    }
                    setNotification(data.Message)
                })
                .catch(e => console.log(e))
    }

    return (
        <>
            <div className='d-flex align-items-center justify-content-center  min-vh-100 flex-column'>
                <h3>Login</h3>
                <div className='text-danger'>{notification}</div>
                <div className='d-flex m-3 flex-column '>
                    <div className='mt-2'> 
                        <input className='p-3 mr-2' type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mt-2'>
                        <input className='p-3 mr-2' type='text' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='btn btn-primary mx-2 mt-2' onClick={getUser}>Login</button>
                    
                </div>
                <NavLink to={`/register`}>Register for APIKEY</NavLink>
                <NavLink to={`/`} className={'btn btn-secondary mt-5'}>Return</NavLink>
            </div>
        </>
    )
}

export default Login