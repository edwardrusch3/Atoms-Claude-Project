function calcStreak(dates) {
  if (!dates || dates.length === 0) return 0

  const sorted = [...dates].sort()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let checkDate = new Date(today)
  const todayStr = formatDate(today)

  // If today isn't done, start checking from yesterday
  if (!sorted.includes(todayStr)) {
    checkDate.setDate(checkDate.getDate() - 1)
  }

  let streak = 0
  while (true) {
    const dateStr = formatDate(checkDate)
    if (sorted.includes(dateStr)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function HabitItem({ habit, dates, onToggle, onDelete }) {
  const today = formatDate(new Date())
  const isDone = dates.includes(today)
  const streak = calcStreak(dates)

  return (
    <div className="habit-item">
      <label className="habit-label">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(habit.id, today)}
        />
        <span className="habit-name">{habit.name}</span>
      </label>
      <div className="habit-right">
        {streak > 0 && <span className="streak-badge">🔥 {streak} day{streak !== 1 ? 's' : ''}</span>}
        <button className="delete-btn" onClick={() => onDelete(habit.id)}>&times;</button>
      </div>
    </div>
  )
}
