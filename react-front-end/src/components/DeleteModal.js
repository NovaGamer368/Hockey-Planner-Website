import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({team, show, setShow, key}) => {
    const handleClose = () => setShow(false);
    const upperTeamName = String(team.Name).toUpperCase()
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
    
    
    const deleteTeam = () => {
        

        if (apiKey !== null)
        {
            const url = `http://localhost:7005/removeTeam/${team._id}?apiKey=${apiKey}`
            fetch(url)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    window.location.href = `/?apiKey=${apiKey}`
                })
        }
        
    }

    return (
        <>
            <Modal className='text-center'show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>DELETING THE {upperTeamName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>ARE YOU SURE YOU WANT TO DELETE THE {upperTeamName}</Modal.Body>
                <Modal.Footer className='d-flex flex-row justify-content-center'>
                    <div >
                        <Button className='m-2 p-2 modal-button br-5' variant="danger" onClick={deleteTeam}>
                            Yes, I want to Delete
                        </Button>
                        <Button className='m-2 p-2 modal-button br-5' variant="primary" onClick={handleClose}>
                            Wait! No, I want to go back!
                        </Button>
                    </div>
            </Modal.Footer>
        </Modal>
    </>
        
    )
    
}

export default DeleteModal