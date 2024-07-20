import { createContext, useRef, useState } from "react"
import { TaskIcons } from "../assets/json/icons"

const TaskContext = createContext()

const TaskProvider = ({children}) => {

    const [ taskList, setTaskList ] = useState([])
    const [ formData, setFormData ] = useState({
        name: '',
        description: '',
        icon: TaskIcons[0].icon,
        createdAt: ''
    })
    const [ selectIcon, setSelectIcon ] = useState(TaskIcons[0].icon)
    const [ isEdit, setIsEdit ] = useState(false)
    const [containerOpen, setContainerOpen] = useState(false)
    const [ snackbarStyle, setSnackbarStyle ] = useState(null)
    let screenSize = 0
    
    const getWindowSize = () => {
        screenSize = window.innerWidth
    }

    getWindowSize()

    window.addEventListener('resize', getWindowSize)

    const openCloseContainer = () => {
        if(createTaskContainerRef.current && openCreateTaskRef.current && bgRef.current) {
            setIsEdit(false)
            if(screenSize > 412) {
                createTaskContainerRef.current.style.right = !containerOpen ? '0' : '-330px'
            }
            else {
                createTaskContainerRef.current.style.top = !containerOpen ? '20%' : '94%'
            }

            openCreateTaskRef.current.style.transform = !containerOpen ? 'rotate(-225deg)' : 'rotate(0deg)'
            bgRef.current.style.display = !containerOpen ? 'block' : 'none'
            setContainerOpen(!containerOpen)
        }
    }

    const createTaskContainerRef = useRef(null)
    const openCreateTaskRef = useRef(null)
    const bgRef = useRef(null)
    const snackBarRef = useRef(null)
    const toDoListContainerRef = useRef(null)

    return <TaskContext.Provider value={{taskList, setTaskList, formData, setFormData, openCloseContainer, createTaskContainerRef, openCreateTaskRef, bgRef, containerOpen, setContainerOpen, selectIcon, setSelectIcon, isEdit, setIsEdit, snackBarRef, snackbarStyle, setSnackbarStyle, toDoListContainerRef}}>
        {children}
    </TaskContext.Provider>
}

export { TaskContext, TaskProvider }