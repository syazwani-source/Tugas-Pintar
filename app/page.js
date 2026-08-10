'use client';

import { useMemo, useState } from 'react';
import { Plus, Check, Trash2, ListTodo, Circle } from 'lucide-react';
import './styles.css';

const initialTasks = [
  { id: 1, title: 'Siapkan tugasan Matematik', done: false },
  { id: 2, title: 'Baca 10 muka surat buku', done: true },
  { id: 3, title: 'Hantar tugasan Bahasa Melayu', done: false },
];

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  function addTask(e) {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks((items) => [...items, { id: Date.now(), title, done: false }]);
    setText('');
  }

  function toggleTask(id) {
    setTasks((items) => items.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTask(id) {
    setTasks((items) => items.filter((t) => t.id !== id));
  }

  const visible = useMemo(() => tasks.filter((t) => filter === 'all' || (filter === 'active' ? !t.done : t.done)), [tasks, filter]);
  const completed = tasks.filter((t) => t.done).length;

  return (
    <main className="page">
      <section className="app-shell">
        <header className="hero">
          <div className="brand"><span className="brand-icon"><ListTodo size={22} /></span><span>Tugas Pintar</span></div>
          <p>Urus tugasan anda dengan lebih mudah dan teratur.</p>
          <div className="progress"><div className="progress-fill" style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }} /></div>
          <small>{completed} daripada {tasks.length} tugasan selesai</small>
        </header>

        <form className="add-form" onSubmit={addTask}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tambah tugasan baru..." aria-label="Tugasan baru" />
          <button type="submit"><Plus size={19} /> Tambah</button>
        </form>

        <div className="toolbar">
          <div className="filters">
            {[['all','Semua'],['active','Belum selesai'],['done','Selesai']].map(([key,label]) => <button key={key} onClick={() => setFilter(key)} className={filter === key ? 'active' : ''}>{label}</button>)}
          </div>
          <span className="count">{visible.length} tugasan</span>
        </div>

        <div className="task-list">
          {visible.length === 0 ? <div className="empty"><Circle size={34} /><p>Tiada tugasan di sini.</p></div> : visible.map((task) => (
            <article className={`task ${task.done ? 'done' : ''}`} key={task.id}>
              <button className="check" onClick={() => toggleTask(task.id)} aria-label={task.done ? 'Tandakan belum selesai' : 'Tandakan selesai'}>{task.done ? <Check size={17} /> : null}</button>
              <span className="task-title">{task.title}</span>
              <button className="delete" onClick={() => deleteTask(task.id)} aria-label="Padam tugasan"><Trash2 size={18} /></button>
            </article>
          ))}
        </div>

        <footer>Tip: Pecahkan tugasan besar kepada langkah kecil supaya lebih mudah diselesaikan. ✨</footer>
      </section>
    </main>
  );
}
