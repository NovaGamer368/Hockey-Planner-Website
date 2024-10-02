import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Update = () => {
    const {teamId} = useParams()
    const teamUrlRequest = `http://localhost:7005/teams/${teamId}`
    const [team, setTeam] = useState([])
    const [wins, setWins] = useState(0)
    const [ties, setTies] = useState(0)
    const [loses, setLoses] = useState(0)
    const [games, setGames] = useState(0)
    const [notification, setNotification] = useState("")

    const queryParams = new URLSearchParams(window.location.search)
    const [apiKey, setApiKey] = useState(null)

    useEffect(()=> {
        getTeam()
        for (const [key, value] of queryParams) {
            console.log({ key, value })
            if(key === "apiKey")
            {
                console.log('apiKey set!',value)
                setApiKey(value)
            }
        }
    }, [])

    useEffect(() => {
        if(team)
        {
            setWins(team.Wins)
            setLoses(team.Loses)
            setTies(team.Ties)
            setGames(team.GamesPlayed)
        }
    }, [team])

    const getTeam = () => {

        fetch(teamUrlRequest)
            .then(resp => resp.json())
            .then(data => {
                console.log('Data from fatch request',data)
                setTeam(data)
            })
            .catch(e => (console.log(e)))
    }
    const updateTeam = () => {
        if (apiKey !== null)
        {
            const updateAPICall = `http://localhost:7005/updateTeam/${teamId}?apiKey=${apiKey}`
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: team.Name, wins: wins, loses: loses, ties:ties, games:games })
            };

            fetch(updateAPICall, requestOptions)
                .then(resp => resp.json()) 
                .then(data => {
                    console.log(team.Name)
                    if(data.Team.acknowledged)
                    {
                        console.log("SUCCESS!!!!!!!!!!")
                        window.location.href = `/?apiKey=${apiKey}`
                    }
                })
                .catch(e => console.log(e))
        }
        else
        {
            console.log('Invalid apiKey')
        }

    }

    return (
        <div className='text-center'>
            <h1>Updating the {team.Name} games</h1>
            <h2>{notification}</h2>
            <div className='card bg-dark text-white p-5 d-grid text-center'>
                <div className='row'>
                    <h4 className='col-sm'>Wins: {wins}</h4>
                    <h4 className='col-sm'>Ties: {ties}</h4>
                    <h4 className='col-sm'>Loses: {loses}</h4>
                </div>
                <div className='row'>
                    <button className='col-sm mx-3 btn btn-success p-3 br-5' onClick={() => {setWins(wins + 1); setGames(games +1)}}>Add Win</button>
                    <button className='col-sm mx-3 btn btn-warning p-3 br-5' onClick={() => {setTies(ties + 1); setGames(games +1)}}>Add Tie</button>
                    <button className='col-sm mx-3 btn btn-danger p-3 br-5' onClick={() => {setLoses(loses + 1); setGames(games +1)}}>Add Lose</button>
                </div>
                <div className='row'>
                    <button className='col-sm mx-3 mt-3 btn btn-light p-3 br-5' onClick={() => {setWins(wins - 1); setGames(games -1)}}>Remove Win</button>
                    <button className='col-sm mx-3 mt-3 btn btn-light p-3 br-5' onClick={() => {setTies(ties - 1); setGames(games -1)}}>Remove Tie</button>
                    <button className='col-sm mx-3 mt-3 btn btn-light p-3 br-5' onClick={() => {setLoses(loses - 1); setGames(games -1)}}>Remove Lose</button>
                </div>
            </div>
            <h3>The total number of games the {team.Name} have played is {games}</h3>
            <button className='btn btn-primary p-3' onClick={updateTeam}>Finish Updating</button>
        </div>
    )
}

export default Update