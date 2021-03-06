import React, { useState } from 'react'
import Task from '../task/Task';
import './TasksList.css'
export default function TasksList({ tasks, deleteTask, updateTask }) {

  return (
    <div className="tasks-list">

      <div>

        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            duration={task.duration}
            type={task.type}
            date={task.date}
            description={task.description}
            date={task.date}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />

        ))}
      </div>
    </div>
  )
}