import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import WeekStrip from './components/WeekStrip'
import HabitList from './components/HabitList'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })

  const [habitLog, setHabitLog] = useState(() => {
    const saved = localStorage.getItem('habitLog')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    localStorage.setItem('habitLog', JSON.stringify(habitLog))
  }, [habitLog])

  function addTodo(text) {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addHabit(name) {
    setHabits([...habits, { id: Date.now(), name }])
  }

  function deleteHabit(id) {
    setHabits(habits.filter(h => h.id !== id))
    setHabitLog(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function toggleHabit(id, dateStr) {
    setHabitLog(prev => {
      const dates = prev[id] || []
      const next = dates.includes(dateStr)
        ? dates.filter(d => d !== dateStr)
        : [...dates, dateStr]
      return { ...prev, [id]: next }
    })
  }

  return (
    <div className="app">
      <div className="card">
        <WeekStrip habitLog={habitLog} />

        <h1>To-Do List</h1>
        <TodoForm onAdd={addTodo} />
        <div className="todo-list">
          {todos.length === 0 && (
            <p className="empty">No tasks yet. Add one above!</p>
          )}
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>

        <HabitList
          habits={habits}
          habitLog={habitLog}
          onAdd={addHabit}
          onDelete={deleteHabit}
          onToggle={toggleHabit}
        />
      </div>
    </div>
  )
}

export default App
