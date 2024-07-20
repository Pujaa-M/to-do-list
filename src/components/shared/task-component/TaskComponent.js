import './TaskComponent.css'
import ThreeDotMenu from '../../../assets/images/three-dot-menu.svg'
import Edit from '../../../assets/images/edit.svg'
import Complete from '../../../assets/images/complete.svg'
import Delete from '../../../assets/images/delete.svg'
import { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../../../contexts/TaskContext'

const TaskComponent = ({icon, name, description, createdAt, id}) => {
    const { setFormData, openCloseContainer, setContainerOpen, setSelectIcon, setIsEdit, taskList, setTaskList, snackBarRef, setSnackbarStyle, toDoListContainerRef } = useContext(TaskContext)

    const [ clearTimeoutValue, setClearTimeoutValue] = useState(null)

    const menuRef = useRef(null)
    let menuOpen = false
    const taskContainerRef = useRef(null)
    const taskDescriptionRef = useRef(null)
    let taskExpand = false

    useEffect(() => {
        toDoListContainerRef.current.addEventListener('click', () => {
            menuOpen = false
            if(menuRef.current) {
                menuRef.current.style.display = 'none'
            }
        })
    }, [])

    const expandCollapseTask = () => {
        if(window.innerWidth <= 412) {
            taskExpand = !taskExpand
            if(taskContainerRef.current && taskDescriptionRef.current) {
                if(taskExpand) {
                    taskContainerRef.current.style.height = '220px'
                    taskDescriptionRef.current.style.height = '70px'
                }
                else {
                    taskContainerRef.current.style.height = '80px'
                    taskDescriptionRef.current.style.height = '0px'
                }
            }
        }
    }

    const openCloseMenu = () => {
        menuOpen = !menuOpen
        if(menuRef.current) {
            menuRef.current.style.display = menuOpen ? 'flex' : 'none'
        }
    }

    const onEdit = (event) => {
        event.stopPropagation()
        setFormData({
            id: id,
            name: name,
            icon: icon,
            description: description,
            createdAt: createdAt
        })

        setSelectIcon(icon)

        openCloseContainer()
        setContainerOpen(true)
        setIsEdit(true)
    }

    const onComplete = (event) => {
        event.stopPropagation()
        setTaskList(
            taskList.filter(task => task.id !== id)
        )
        setSnackbarStyle({icon: Complete, color: '#35DA7A', content: 'Completed'})

        if(snackBarRef.current) {
            if(clearTimeoutValue) {
                clearTimeout(clearTimeoutValue)
            }
            snackBarRef.current.classList.add('show')
            setClearTimeoutValue(setTimeout(() => {
                snackBarRef.current.classList.remove('show')
            }, 5000))
        }
    }

    const onDelete = (event) => {
        event.stopPropagation()
        setTaskList(
            taskList.filter(task => task.id !== id)
        )

        setSnackbarStyle({icon: Delete, color: '#FF2551', content: 'Deleted'})

        if(snackBarRef.current) {
            if(clearTimeoutValue) {
                clearTimeout(clearTimeoutValue)
            }
            snackBarRef.current.classList.add('show')
            setClearTimeoutValue(setTimeout(() => {
                snackBarRef.current.classList.remove('show')
            }, 5000))
        }
    }

    return <div onClick={expandCollapseTask} className="task-container" ref={taskContainerRef}>
        <div className="task-heading">
            <img className="task-icon" src={icon} alt="task-icon"></img>
            <h3 className="task-name">{name}</h3>
        </div>

        <p className="task-description" ref={taskDescriptionRef}>{description}</p>

        <img onClick={openCloseMenu} className="three-dot-menu" alt="menu" src={ThreeDotMenu}></img>

        <p className="task-created-at">{createdAt}</p>

        <div className="menu" ref={menuRef}>
            <div onClick={onEdit} className="option"><img src={Edit} alt="edit"></img><p>Edit</p></div>
            <div onClick={onComplete} className="option"><img src={Complete} alt="complete"></img><p className="complete">Complete</p></div>
            <div onClick={onDelete} className="option"><img src={Delete} alt="delete"></img><p className="delete">Delete</p></div>
        </div>
    </div>
}

export default TaskComponent