function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ×
      </button>
    </div>
  )
}

export default TodoItem
