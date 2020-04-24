import React, { useState, useCallback, useEffect } from "react"
import './App.css';
import TaskForm from './components/taskForm';
import TasksList from './components/TasksList/TasksList';
import { fetchTasks, mTasks, initT } from "./services/tasks.service"


function App() {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const initD = async () => {
    setLoading(true)
    const result = await initT()
    console.log(result)
    setTasks(result)


    setLoading(false)
  }
  useEffect(() => {
    console.log("initD tasks=", tasks)
    initD()
    console.log(tasks)
    console.log("initD tasks=", tasks)
  }, [])


  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      setLoading(true)
      if (!searchValue) {
        setTasks([])
        setLoading(false)
      } else {
        const result = await fetchTasks(searchValue)
        console.log("result: ", didCancel)
        if (!didCancel) {
          setTasks(result)
          setLoading(false)
          console.log("fetchData tasks=", tasks)
        }
      }
    }

    // console.log("useEffect:", searchValue)
    fetchData()

    return () => {
      console.log("cleanup: ", searchValue)
      didCancel = true
      initD()
    }

  }, [searchValue])

  const modifierTasks = async () => {
    console.log(tasks)

    await mTasks(tasks)
  }



  const addTask = (title, duration, type, date, description) => {
    setTasks(previousTasks => [
      ...previousTasks,
      { id: previousTasks.length + 1, title, duration: Number(duration), type, date, description }
    ])
    modifierTasks(tasks)
  }

  const updateTask = (id, title, duration, date, type, description) => {
    const newTasks = tasks.map(task => task.id === id ? ({ id, title, duration, date, type, description }) : task)
    setTasks(newTasks)
  }
  const memoizedCallback = useCallback(addTask, [])

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  return (

    <div className="app">
      <div className="toggle">
        <button onClick={toggleVisibility}>Toggle visibility</button>
      </div>
      <div>
        <TaskForm addTask={memoizedCallback} />
        <div className="search">
          <input
            type="search"
            name="search"
            placeholder="search task by name"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        {loading ? (
          <div>Loading ... </div>
        ) : (
            isVisible && (
              <TasksList
                tasks={tasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )
          )}

      </div>

    </div>
  )
}

export default App;
