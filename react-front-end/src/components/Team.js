import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import DeleteModal from './DeleteModal';

export const Team = ({ team, clearTeam }) => {
    const [show, setShow] = useState(false);

    const queryParams = new URLSearchParams(window.location.search)
    const [apiKey, setApiKey] = useState(null)

    useEffect(() => {
        for (const [key, value] of queryParams) {
            console.log({ key, value })
            if (key === "apiKey") {
                console.log('apiKey set!', value)
                setApiKey(value)
            }
        }
    }, [])

    if (apiKey === null || apiKey === 'null') {
        return (
            <>
                <span key={team._id} className='text-white bg-secondary mb-3 mx-5 p-4 display-5'>
                    <h2>{team.Name}</h2>
                    <div>
                        The {team.Name} has played {team.GamesPlayed} games
                    </div>
                    <div>
                        <h5>Current standing score {team.StandingScore}</h5>
                        <div><b>Wins:</b> {team.Wins}</div>
                        <div><b>Loses:</b> {team.Loses}</div>
                        <div><b>Ties:</b> {team.Ties}</div>
                    </div>
                </span>
                <button onClick={() => { clearTeam(null) }} className='mx-5 p-3'>Go back</button>
            </>
        )
    }
    else {
        return (
            <>
                <span key={team._id} className='text-white bg-secondary mb-3 mx-5 p-4 display-5'>
                    {
                        show ?
                            <DeleteModal team={team} show={show} setShow={setShow} />
                            :
                            <></>
                    }

                    <h2>{team.Name}</h2>
                    <div>
                        The {team.Name} has played {team.GamesPlayed} games
                    </div>
                    <div>
                        <h5>Current standing score {team.StandingScore}</h5>
                        <div><b>Wins:</b> {team.Wins}</div>
                        <div><b>Loses:</b> {team.Loses}</div>
                        <div><b>Ties:</b> {team.Ties}</div>
                    </div>
                </span>
                <div className='d-flex justify-content-center'>
                    <NavLink to={`/update/${team._id}?apiKey=${apiKey}`} className='btn btn-info m-2 p-3 width-500'>Update Team</NavLink>
                    <button className='btn btn-danger m-2 p-3 width-500' onClick={() => { setShow(true) }}>Delete Team</button>
                </div>
                <button onClick={() => { clearTeam(null) }} className='mx-5 p-3'>Go back</button>
            </>
        )
    }
}
