import { useState } from 'react'
import HabitItem from './HabitItem'

export default function HabitList({ habits, habitLog, onAdd, onDelete, onToggle }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <div className="habits-section">
      <h2>Habits</h2>
      <form className="habit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a habit..."
        />
        <button type="submit">Add</button>
      </form>
      <div className="habit-list">
        {habits.length === 0 && (
          <p className="empty">No habits yet. Add one above!</p>
        )}
        {habits.map(habit => (
          <HabitItem
            key={habit.id}
            habit={habit}
            dates={habitLog[habit.id] || []}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
