"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import todoState from '@/store/todo'; 

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  priority?: 'Low' | 'Medium' | 'High';
  assignedTo?: string;
  tags?: string[];
  notes?: string;
}

const DetailTodo: React.FC = () => {
  const { id } = useParams();
  const getTodoById = todoState(state => state.GetTodoId);
  const [todo, setTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchedTodo = getTodoById(Number(id));
    if (fetchedTodo) {
      setTodo(fetchedTodo);
      setTitle(fetchedTodo.title);
      setDescription(fetchedTodo.description);
      setDueDate(fetchedTodo.dueDate || '');
      setPriority(fetchedTodo.priority || 'Medium');
      setAssignedTo(fetchedTodo.assignedTo || '');
      setTags(fetchedTodo.tags?.join(', ') || '');
      setNotes(fetchedTodo.notes || '');
    }
  }, [id, getTodoById]);

  // console.log('todo : ' + todo)
  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-4'>
      <div className="center">
        <div className="mt-4 p-4 border bg-gray-100">
          <h2>Todo Details</h2>
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>Description:</strong> {todo.description}</p>
          {todo.dueDate && <p><strong>Due Date:</strong> {todo.dueDate}</p>}
          {todo.priority && <p><strong>Priority:</strong> {todo.priority}</p>}
          {todo.assignedTo && <p><strong>Assigned To:</strong> {todo.assignedTo}</p>}
          {todo.tags && <p><strong>Tags:</strong> {todo.tags.join(', ')}</p>}
          {todo.notes && <p><strong>Notes:</strong> {todo.notes}</p>}
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
