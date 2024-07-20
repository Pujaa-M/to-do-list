import CreateTaskComponent from "./components/create-task-component/CreateTaskComponent";
import ToDoComponent from "./components/to-do-component/ToDoComponent";
import {TaskProvider} from "./contexts/TaskContext";

function App() {
  return <>
    <TaskProvider>
      <ToDoComponent />
      <CreateTaskComponent />
    </TaskProvider>
  </>
}

export default App;
