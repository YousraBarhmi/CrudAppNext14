"use client";

import React, { useState } from 'react';
import todoState from '@/store/todo'; // Adjust the path as per your project structure
import Link from 'next/link'; // Import Link from Next.js for navigation

export default function HomePage() {
  const Todos = todoState(state => state.Todos);
  const deleteTodo = todoState(state => state.deleteTodo);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleDelete = (todoId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todoId);
    }
  };


  return (
    <main className='mt-4'>
      <div>
        <div className="flex justify-around items-center">
          <h1>To do List</h1>
          <Link href={`/new`}>
            <span className="ml-2 p-2 bg-blue-500 text-white cursor-pointer">Add Todo</span>
          </Link>
        </div>
        
        <ul>
          <li key="header" className="flex justify-between items-center p-2 border-b font-bold">
            <span>Title</span>
            <span>Description</span>
            <span>Action</span>
          </li>
          {Todos.map((todo) => (
              <li
                className="flex justify-between items-center p-2 border-b cursor-pointer"
              >
                <Link href={`/details/${todo.id}`}>
                  <span>{todo.title}</span>
                </Link>
                <Link href={`/details/${todo.id}`}>
                  <span>{todo.description}</span>
                </Link>
                <div>
                  <Link href={`/edit/${todo.id}`}>
                    <span className="text-green-500">Edit</span>
                  </Link>
                  <button
                    className="text-red-500 pl-2"
                    onClick={(event) => handleDelete(todo.id, event)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            // </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}
