import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Team } from './Team'

const TeamList = () => {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const queryParams = new URLSearchParams(window.location.search)
  const [apiKey, setApiKey] = useState(null)

  useEffect(() => {
    getJobs()
    for (const [key, value] of queryParams) {
      if(key === "apiKey")
      console.log({ key, value })
      {
          console.log('apiKey set!',value)
          setApiKey(value)
      }
    }
  }, [])
  useEffect(() => {
  }, [selectedTeam])

  const getJobs = () => {
    fetch('http://localhost:7005/teams')
      .then(resp => resp.json())
      .then(data => {

        //Sort by standing
        data = data.sort((a,b) => {
          if (a.StandingScore > b.StandingScore) return -1;
          if (b.StandingScore > a.StandingScore) return 1;
          return 0;})
        //Setting teams in standing order
        setTeams(data)
      })
    }
  if(selectedTeam)
  {
    return(
      <>
        <Team team={selectedTeam} clearTeam={setSelectedTeam}/>
      </>
    )
  }
  // else if (id != undefined)
  // {
  //   teams.forEach(team => {
  //     if(team._id == id)
  //     {
  //       id = undefined
  //       setSelectedTeam(team)
  //       redirect('/')
  //     }
  //   });
  // }
  else
  {
    if(apiKey=== null || apiKey === "null")
    {
      return (
        <>
          <div >
            {
              teams && teams.length > 0 ?
                <div className='d-flex flex-wrap justify-content-center'>
                  {
                    teams.map((team) => (
                      <span key={team._id} className='card card-300 text-white bg-secondary mb-3 mx-1 p-2' onClick={()=>{setSelectedTeam(team)}}>
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
                    ))
                  }
                </div>
                :
                <>
                  <div>
                    <h2>No Teams Found</h2>
                  </div>
                </>
            }
          </div>
        </>
      )
    }
    else
    {
      return (
        <>
          <div >
            {
              teams && teams.length > 0 ?
                <div className='d-flex flex-wrap justify-content-center'>
                  {
                    teams.map((team) => (
                      <span key={team._id} className='card card-300 text-white bg-secondary mb-3 mx-1 p-2' onClick={()=>{setSelectedTeam(team)}}>
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
                    ))
                  }
                </div>
                :
                <>
                  <div>
                    <h2>No Teams Found</h2>
                  </div>
                </>
            }
          </div>
          <NavLink to={`/newTeam?apiKey=${apiKey}`} className='btn btn-primary mx-5 mb-5 p-2'>Add A New Team</NavLink>
        </>
      )
    }
    
  }
}

export default TeamList