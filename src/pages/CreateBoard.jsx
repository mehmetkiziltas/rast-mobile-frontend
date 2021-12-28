import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { createBoard } from '../apiCall/api';

const CreateBoard = () => {
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: boardName,
            description: boardDescription
        }
        try {
            createBoard(data).then(res => {
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='createBoard' >
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Board name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Board Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Description'
                        value={boardDescription}
                        onChange={(e) => setBoardDescription(e.target.value)}
                    />
                </Form.Group>
                <Button style={{
                    backgroundColor: '#00bcd4',
                    color: 'white',
                    marginTop: '10px',
                    marginLeft: '10px',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                }}
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}

                >
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreateBoard;

