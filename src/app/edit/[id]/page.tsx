"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import todoState from '@/store/todo';

const EditTodo: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const todos = todoState((state) => state.Todos);
  const updateTodo = todoState((state) => state.updateTodo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (id && todos.length > 0) {
      const todo = todos.find((todo) => todo.id === Number(id));
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
        setDueDate(todo.dueDate || '');
        setPriority(todo.priority || 'Medium');
        setAssignedTo(todo.assignedTo || '');
        setTags(todo.tags ? todo.tags.join(', ') : '');
        setNotes(todo.notes || '');
      }
    }
  }, [id, todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodo = {
      id: Number(id),
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      tags: tags.split(',').map(tag => tag.trim()),
      notes,
    };
    updateTodo(Number(id), updatedTodo);
    router.push('/');
  };

  return (
    <div className='mt-4'>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-8 ml-12">
          <div className="flex flex-row items-baseline">
            <label>Title :</label>
            <input
              className="ml-4"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-baseline">
            <label>Description:</label>
            <textarea
              className="ml-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-baseline">
            <label>Due Date :</label>
            <input
              className="ml-4"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-baseline">
            <label>Priority:</label>
            <select
              className="ml-4"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-row items-baseline">
            <label>Assigned To :</label>
            <input
              className="ml-4"
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-baseline">
            <label>Tags :</label>
            <input
              className="ml-4"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-baseline">
            <label>Notes :</label>
            <input
              className="ml-4"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" style={{ width: '10%' }} className='ml-10 p-2 bg-blue-500 text-white'>
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
