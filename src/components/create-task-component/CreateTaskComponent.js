import './CreateTaskComponent.css'
import { TaskIcons } from '../../assets/json/icons'
import PlusIcon from '../../assets/images/plus-icon.svg'
import { useContext, useRef, useState } from 'react'
import { TaskContext } from '../../contexts/TaskContext'

const CreateTaskComponent = () => {
    const { taskList, setTaskList, formData, setFormData, openCloseContainer, createTaskContainerRef, openCreateTaskRef, bgRef, setContainerOpen, selectIcon, setSelectIcon, isEdit } = useContext(TaskContext)

    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [ count, setCount ] = useState(0)

    const handleChange = (event) => {
        const { name, value } = event.target
        let currentDate = new Date()
        let createdAt = `${currentDate.getDate()} ${monthsArr[currentDate.getMonth()]} ${addZero(currentDate.getHours())}:${addZero(currentDate.getMinutes())}`

        setFormData({
            ...formData,
            [name]: value,
            createdAt: createdAt
        })

        if(name === 'icon') {
            setSelectIcon(value)
        }
    }

    const addZero = (num) => {
        if(num < 10) {
            return '0' + num
        }
        return num
    }

    const formSubmit = (event) => {
        event.preventDefault()
        if(isEdit) {
            setTaskList(
                taskList.map(task => {
                    if(task.id === formData.id) {
                        return formData
                    }
                    return task
                })
            )
        }
        else {
            setTaskList([
                ...taskList,
                {...formData, id: count}
            ])
            setCount(count+1)
        }

        setFormData({
            name: '',
            description: '',
            icon: TaskIcons[0].icon,
            createdAt: ''
        })

        setSelectIcon(TaskIcons[0].icon)
        setContainerOpen(true)
        openCloseContainer()
    }

    return <>
        <div className="create-task-container" ref={createTaskContainerRef}>
            <h2 className="create-task-heading">Create task</h2>

            <form onSubmit={formSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} className="name-input" placeholder="Task name"></input>
                <textarea name="description" onChange={handleChange} value={formData.description} className="description-input" placeholder="Description"></textarea>
                <div className="task-icon-selection">
                    <h3>Select icon</h3>
                    <div><img src={selectIcon}></img></div>
                </div>

                <div className="icons-tab">
                    {TaskIcons.map((task, id) => <><input onClick={handleChange} className="radio-icon" type="radio" name="icon" value={task.icon} id={`icon-radio-${id}`}></input><label for={`icon-radio-${id}`}><img src={task.icon}></img></label></>)}
                </div>

                <button type="submit" className="create-task-btn">{isEdit ? 'Edit task' : 'Create task'}</button>
            </form>

            <div ref={openCreateTaskRef} onClick={openCloseContainer} className="open-create-task">
                <img src={PlusIcon} alt="add-task"></img>
            </div>
        </div>
        <div className="bg" onClick={openCloseContainer} ref={bgRef}></div>
    </>
}

export default CreateTaskComponent