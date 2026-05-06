import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([
    { id: 1, title: 'Learn React basics' },
    { id: 2, title: 'Build CRUD demo' },
  ])
  const [newTitle, setNewTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const value = newTitle.trim()

    if (!value) {
      return
    }

    setItems((currentItems) => [
      ...currentItems,
      { id: Date.now(), title: value },
    ])
    setNewTitle('')
  }

  const handleDelete = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const startEditing = (item) => {
    setEditingId(item.id)
    setEditingTitle(item.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingTitle('')
  }

  const saveEdit = (id) => {
    const value = editingTitle.trim()

    if (!value) {
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, title: value } : item)),
    )
    cancelEditing()
  }

  return (
    <main className="app">
      <h1>Simple CRUD App</h1>
      <p className="subtitle">Create, read, update, and delete tasks.</p>

      <form className="create-form" onSubmit={handleCreate}>
        <input
          type="text"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="Enter a task title"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {items.map((item) => (
          <li key={item.id} className="task-item">
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                />
                <div className="actions">
                  <button type="button" onClick={() => saveEdit(item.id)}>
                    Save
                  </button>
                  <button type="button" className="secondary" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <div className="actions">
                  <button type="button" onClick={() => startEditing(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
