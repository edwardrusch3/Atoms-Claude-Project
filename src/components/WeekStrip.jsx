import { useState } from 'react'

function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function WeekStrip({ habitLog }) {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))

  const today = formatDate(new Date())

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  function hasActivity(dateStr) {
    return Object.values(habitLog).some(dates => dates.includes(dateStr))
  }

  function prevWeek() {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() - 7)
      return d
    })
  }

  function nextWeek() {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() + 7)
      return d
    })
  }

  return (
    <div className="week-strip">
      <div className="week-strip-header">
        <button className="week-nav" onClick={prevWeek}>&larr;</button>
        <span className="week-label">
          {days[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          {' – '}
          {days[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <button className="week-nav" onClick={nextWeek}>&rarr;</button>
      </div>
      <div className="week-days">
        {days.map((day, i) => {
          const dateStr = formatDate(day)
          const isToday = dateStr === today
          return (
            <div key={dateStr} className={`week-day${isToday ? ' today' : ''}`}>
              <span className="day-name">{DAY_NAMES[i]}</span>
              <span className="day-number">{day.getDate()}</span>
              {hasActivity(dateStr) && <span className="day-dot" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
