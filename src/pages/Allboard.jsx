import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { getAllBoards } from '../apiCall/api';

const Allboard = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getAllBoards().then(res => {
            setBoards(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className='Allboards' >
            <Table striped bordered hover className='Table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boards.map((board, index) => {
                            return (
                                <tr key={index}>
                                    <td>{board.id}</td>
                                    <td>{board.name}</td>
                                    <td>{board.description}</td>
                                    <td>{board.createdAt}</td>
                                    <td>{board.updatedAt}</td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            window.location.pathname = `/task/${board.id}`
                                        }}
                                    >
                                        Choose
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            window.location.pathname = `/board/${board.id}`
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Allboard;
