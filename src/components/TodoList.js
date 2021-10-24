import React, { useState } from 'react'

import '../index.css'

export const TodoList = () => {

    const [task, setTask] = useState('')

    const [tasks, setTasks] = useState([])

    const handleChangeTask = ({ target }) => {
        setTask(target.value)
    }

    const handleCompleteTask = (index) => {

        const newState = [...tasks]
        const selectedTask = newState[index]
        selectedTask.completed = !selectedTask.completed

        newState[index] = selectedTask
        
        setTasks(newState)
    }

    const handleDeleteTask = (index) => {
        
        const deleteTask = [ ...tasks ]

        deleteTask.splice(index, 1)

        console.log(deleteTask)

        setTasks(deleteTask)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setTasks( tasks => [
            ...tasks,
            {
                name: task,
                completed: false
            }
        ])

        setTask('')
    }

    return (
        <div className="container py-4">
            <h1 className="display-5"> Todo List </h1>
            <form onSubmit={ handleSubmit }>
                <div className="d-flex flex-row justify-content-between bg-primary p-4">
                    <input 
                        type="text"
                        name="task"
                        className="form-control"
                        placeholder="Type your task..."
                        autoComplete="off"
                        onChange={ handleChangeTask }
                        value={ task }
                        required
                    />
                    <button className="btn btn-success btn-lg ms-4" type="submit"> Add </button>
                </div>
            </form>

            {
                //Evaluamos si hay algúna tarea en el estado
                tasks.length > 0 ? (
                    tasks.map((item, i) => {
                        return <div key={ i } className="d-flex flex-row justify-content-between p-4 bg-light">
                            <div className="d-flex align-items-center">
                                <input 
                                    type="checkbox"
                                    name="inputTask"
                                    className="form-check-input"
                                    onChange={ () => handleCompleteTask(i) }
                                />
                                <p className={ item.completed ? "ms-4 mb-0 p-0 fs-3 fst-italic fw-lighter cross-out" : "ms-4 mb-0 p-0 fs-3" }>
                                    { item.name }
                                </p>
                            </div>
                            <button className="btn btn-danger" type="button" title="Delete this task." onClick={ () => handleDeleteTask(i) }> Delete </button>
                        </div> 
                        
                    })
                ) : (
                    <p className="mt-2 fs-3"> No tasks... </p>
                )
            }


        </div>
    )
}
