import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const User = () => {
    const [user, setUser] = useState([])
    const queryParams = new URLSearchParams(window.location.search)
    const [apiKey, setApiKey] = useState(null)

    useEffect(() => {
        for (const [key, value] of queryParams) {
            console.log({ key, value })
            if (key === "apiKey") {
                setApiKey(value)
            }
        }

    }, [])
    useEffect(() => {
        if(apiKey !== null)
        {
            getUser()
        }
    }, [apiKey])
    const getUser = (() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        
        fetch(`http://localhost:7005/getUserByKey?apiKey=${apiKey}`, requestOptions)
            .then(resp => resp.json())
            .then(data => {
                setUser(data.User)
            })
    })

    return (
        <>
            <div className='d-flex align-items-center justify-content-center flex-column min-vh-100'>

                <div>
                    <h2>UserName: {user.Username}</h2>
                </div>
                <div><h2>Email: {user.Email}</h2></div>
                <div><h1>YOUR API KEY IS <b>{user.Key}</b></h1></div>
                <div>
                    <NavLink to={`/?apiKey=${apiKey}`} className={'btn btn-secondary mx-2'}>Back to Home</NavLink>
                    <NavLink to={`/`} className={'btn btn-info mx-2'}>LogOut</NavLink>
                </div>
            </div>
        </>
    )
}

export default User