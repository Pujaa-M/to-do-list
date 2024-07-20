import './SnackbarComponent.css'
import DeleteIcon from '../../../assets/images/delete.svg'
import { useContext } from 'react'
import { TaskContext } from '../../../contexts/TaskContext'

const SnackbarComponent = ({color='#FF2551', icon=DeleteIcon, content='Deleted'}) => {

    const {snackBarRef} = useContext(TaskContext)

    return <div style={{background: color}} className="snackbar-container" ref={snackBarRef}>
        <div className="snackbar-content">
            <img src={icon}></img>
            <p>{content}</p>
        </div>
    </div>
}

export default SnackbarComponent