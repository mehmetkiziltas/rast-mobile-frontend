import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import dateFormat from "dateformat";
import { getAllBoards, createTask } from '../apiCall/api';

const CreateTask = () => {

    const [date, setDate] = useState(new Date());
    const [board, setBoard] = useState([]);
    const [boardId, setBoardId] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState(new Date());


    const handleChange = (date) => {
        setTaskDueDate(date);
        const selectDate = new Date(date);
        setDate(dateFormat(selectDate, "dd-mm-yyyy"));
    };

    useEffect(() => {
        try {
            getAllBoards().then(res => {
                setBoard(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }, []);

    const saveTask = () => {
        const data = {
            board_id: boardId,
            name: taskName,
            description: taskDescription,
            due_date: taskDueDate
        }
        try {
            createTask(data).then(res => {
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='CreateTask' >
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Description'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </Form.Group>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Board Name
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {board.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => setBoardId(item.id)}
                                >
                                    {item.name}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="form-group">
                    <label style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginTop: '10px',
                        marginBottom: '1rem'
                    }} >Due Date</label>
                    <DatePicker
                        onChange={handleChange}
                        value={date}
                    />
                </div>
                <Button style={{
                    backgroundColor: '#00bcd4',
                    color: 'white',
                    alignItems: 'center',
                    marginTop: '10px',
                    justifyContent: 'space-between',

                }}
                    onClick={saveTask}
                    variant="primary"
                >
                    Create
                </Button>
            </Form>
        </div>
    );
}

export default CreateTask;