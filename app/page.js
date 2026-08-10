'use client';

import { useMemo, useState } from 'react';
import { Plus, Check, Trash2, ListTodo, Circle, LayoutGrid, CircleDashed } from 'lucide-react';
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
  const remaining = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <main className="page">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><ListTodo size={20} /></span><div><strong>Tugas Pintar</strong><small>Ruang tugasan anda</small></div></div>
        <nav>
          <button className={filter === 'all' ? 'nav-active' : ''} onClick={() => setFilter('all')}><LayoutGrid size={18} /> Semua Tugasan <b>{tasks.length}</b></button>
          <button className={filter === 'active' ? 'nav-active' : ''} onClick={() => setFilter('active')}><CircleDashed size={18} /> Belum Selesai <b>{remaining}</b></button>
          <button className={filter === 'done' ? 'nav-active' : ''} onClick={() => setFilter('done')}><Check size={18} /> Selesai <b>{completed}</b></button>
        </nav>
        <div className="side-progress"><span>PROGRES HARI INI</span><strong>{progress}%</strong><div><i style={{ width: `${progress}%` }} /></div><small>{completed} daripada {tasks.length} selesai</small></div>
        <div className="side-note">Buat sedikit demi sedikit.<br />Yang penting, terus bergerak. ✦</div>
      </aside>

      <section className="content">
        <header className="topbar"><div><span className="eyebrow">SENARAI HARI INI</span><h1>{filter === 'all' ? 'Semua Tugasan' : filter === 'active' ? 'Belum Selesai' : 'Tugasan Selesai'}</h1><p>Rancang dengan tenang, selesaikan satu demi satu.</p></div><div className="date">Hari ini<br /><strong>♡</strong></div></header>

        <form className="add-form" onSubmit={addTask}><div className="plus"><Plus size={21} /></div><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Apa yang perlu dibuat?" aria-label="Tugasan baru" /><button type="submit">Tambah</button></form>

        <div className="summary"><span><b>{tasks.length}</b> Jumlah</span><span><b>{remaining}</b> Belum selesai</span><span><b>{completed}</b> Selesai</span></div>

        <div className="task-list">
          {visible.length === 0 ? <div className="empty"><Circle size={34} /><p>Tiada tugasan di sini.</p></div> : visible.map((task) => (
            <article className={`task ${task.done ? 'done' : ''}`} key={task.id}>
              <button className="check" onClick={() => toggleTask(task.id)} aria-label={task.done ? 'Tandakan belum selesai' : 'Tandakan selesai'}>{task.done ? <Check size={16} /> : null}</button>
              <div className="task-copy"><span>{task.title}</span><small>{task.done ? 'Selesai' : 'Dalam senarai hari ini'}</small></div>
              <button className="delete" onClick={() => deleteTask(task.id)} aria-label="Padam tugasan"><Trash2 size={17} /></button>
            </article>
          ))}
        </div>
        <footer>Disiplin kecil hari ini, hasil besar esok.</footer>
      </section>
    </main>
  );
}
