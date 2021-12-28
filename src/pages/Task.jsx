import React, { useEffect } from 'react'
import {
    DragDropContext,
    Droppable, Draggable
} from 'react-beautiful-dnd';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import '../App.css';
import { useParams } from 'react-router-dom';
import { getTaskByBoardId } from '../apiCall/api';


const Task = () => {



    const [tasks, setTasks] = useState([])
    const { id } = useParams();

    useEffect(() => {
        getTaskByBoardId(id).then(res => {
            setTasks(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [id])
    console.log(tasks)

    // const datafromBackend = [
    //     { id: uuid(), content: 'Task 1' },
    //     { id: uuid(), content: 'Task 2' },
    //     { id: uuid(), content: 'Task 3' }
    // ]

    // const columnsData = {
    //     [uuid()]: {
    //         name: 'To do',
    //         items: datafromBackend
    //     },
    //     [uuid()]: {
    //         name: 'Doing',
    //         items: []
    //     },
    //     [uuid()]: {
    //         name: 'Done',
    //         items: []
    //     }
    // }

    const columnsFromBackend = {

        [uuid()]: {
            name: 'Backlog',
            items: tasks?.filter(task => task.status === 'Backlog')?.map(item => {
                return {
                    id: uuid(),
                    content: item.name + ' ' + item.description
                }
            })
        },
        [uuid()]: {
            name: 'To Do',
            items: tasks?.filter(task => task.status === 'To Do')?.map(item => {
                return {
                    id: uuid(),
                    content: item.name + ' ' + item.description
                }
            })
        },
        [uuid()]: {
            name: 'In Progress',
            items: tasks?.filter(item => item.status === 'In Progress')?.map(item => {
                return { id: item.id, content: item.name + " " + item.description, index: item.index }
            })
        },
        [uuid()]: {
            name: 'Done',
            items: tasks?.filter(item => item.status === 'Done')?.map(item => {
                return { id: uuid(), content: item.name + " " + item.description, index: item.index }
            })
        }
    };

    console.log(columnsFromBackend);
    // console.log(columnsData);

    const [columns, setColumns] = useState(columnsFromBackend);

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const sourceColumn = columns[source.droppableId];
            const copiedItems = [...sourceColumn.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: copiedItems
                }
            });
        }
    }

    return (
        <div className='Task'>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {
                    Object.entries(columns).map(([Id, column]) => {
                        return (
                            <Droppable droppableId={Id} key={Id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500,
                                            margin: '0 auto',
                                            borderRadius: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <h2>{column.name}</h2>
                                        {column.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {
                                                    (provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: 'none',
                                                                padding: 16,
                                                                margin: '0 0 8px 0',
                                                                minHeight: '50px',
                                                                backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
                                                                color: 'black',
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    })
                }
            </DragDropContext>
        </div>
    )
}

export default Task;

// board_id: 1
// createdAt: "2021-12-26T20:34:22.269Z"
// description: "Ankara"
// id: 2
// type: "Backlog"
// updatedAt: "2021-12-26T20:34:22.269Z"
