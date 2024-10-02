import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [apiKey, setApiKey] = useState(null)
    useEffect(() => {
        for (const [key, value] of queryParams) {
            console.log({ key, value })
            if(key === "apiKey")
            {
                console.log('apiKey set!',value)
                setApiKey(value)
            }
        }
    }, [])

    if(apiKey === null || apiKey === 'null')    {

        return (
            <>
                <div className='d-flex text-center justify-content-end h-25'>
                    <NavLink to={`/login?apiKey=${apiKey}`} className='btn btn-primary br-5 float-sm-end mx-3 mt-1'>Login</NavLink>
                </div>
            </>
        )
    }
    else
    {
        return (
            <>
                <div className='d-flex text-center justify-content-end h-25'>
                    <NavLink to={`/user?apiKey=${apiKey}`} className='btn btn-primary br-5 float-sm-end mx-3 mt-1'>Profile</NavLink>
                </div>
            </>
        )
    }
}

export default Nav