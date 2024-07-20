import './ToDoComponent.css'

import Ghostalina from '../../assets/images/ghostalina.svg'
import SortIcon from '../../assets/images/sort-by-icon.svg'
import EventIcon from '../../assets/images/event-icon.svg'

import TaskComponent from '../shared/task-component/TaskComponent'
import { TaskContext } from '../../contexts/TaskContext'
import { useContext } from 'react'
import SnackbarComponent from '../shared/snackbar-component/SnackbarComponent'

const ToDoComponent = () => {

    const { taskList, snackbarStyle, toDoListContainerRef } = useContext(TaskContext)

    return <div className="to-do-list-container" ref={toDoListContainerRef}>
        <SnackbarComponent color={snackbarStyle && snackbarStyle.color} icon={snackbarStyle && snackbarStyle.icon} content={snackbarStyle && snackbarStyle.content} />
        <div className="app-heading">
            <img className="ghostalina small" src={Ghostalina} alt="app-logo"></img>
            <h3>To-Do List</h3>
        </div>
        {
            (taskList.length)
            ? <div className="list">
                {taskList.map(task => <TaskComponent icon={task.icon} name={task.name} description={task.description} createdAt={task.createdAt} id={task.id}/>)}
            </div>

            : <div className="list-empty">
                <img className="ghostalina" src={Ghostalina} alt="app-logo"></img>
                <div className="shadow"></div>
                <p className="empty-msg">It seems there are no tasks. Add a task</p>
            </div>
        }
    </div>
}

export default ToDoComponent