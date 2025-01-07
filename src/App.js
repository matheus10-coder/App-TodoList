//import './App.css';
import { useState } from 'react';
import './todo-app.css'

export default function App() {
  return (
    <div className='App'>
      <TodoList />
    </div>
  )
  
  
}

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [todoItem, setTodoItem] = useState('')

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: tasks.length+1,
        task: todoItem,
        completed: false
      }
    ])
    setTodoItem('')
  }

  const removeTask = (id) => {

    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTaskStatus = (passedTask) => {
    setTasks(tasks.map((task) => {
      if (task.id === passedTask.id){
        task.completed = !task.completed
        return task //fliping the old status
      }
      return task
    }))
  } 

  return (
    <div className = 'todo-list'>
      <h1>TODO List</h1>
      <input onChange={(e) => setTodoItem(e.target.value)} value={todoItem}/>
      <button className='add-button' onClick={addTask}> Add task </button>
      {tasks.map(task => (
        <TodoItem 
        key={task.id}
        task={task}
        removeTask={removeTask}
        updateTaskStatus={updateTaskStatus}
        />
      ))}
    </div>
  );


  
}

function TodoItem({ task, removeTask, updateTaskStatus }) {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <span>{task.task}</span>
      <div>
        <input type='checkbox' onChange={() => updateTaskStatus(task)} checked={task.completed}/>
        <button className='remove-button' onClick={() => removeTask(task.id)}>Delete</button>
      </div>
    </div>
  )
}


