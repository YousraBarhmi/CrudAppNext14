import create from 'zustand';
import { persist , createJSONStorage} from 'zustand/middleware'

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate?: string; // Optional due date
  priority?: 'Low' | 'Medium' | 'High'; 
  assignedTo?: string; 
  tags?: string[]; 
  notes?: string; 
}

interface State {
  Todos: Todo[];
  addTodo: (todo: Partial<Todo>) => void;
  updateTodo: (todoId: number, newTodo: Partial<Todo>) => void;
  deleteTodo: (todoId: number) => void;
  GetTodoId : (todoId : number) => Todo | undefined;
}

export const todoState = create<State>()(
  persist(
    (set, get) => ({
      Todos: [
        {
          id: 1,
          title: 'Buy groceries',
          description: 'Purchase milk, bread, and eggs from the store.',
          completed: true,
          priority: 'High',
          assignedTo: 'Self',
          tags: ['health', 'fitness'],
          notes: 'Workout playlist ready.',
        },
        {
          id: 2,
          title: 'Read a book',
          description: 'Finish reading the last two chapters of "The Great Gatsby."',
          completed: true,
          priority: 'High',
          assignedTo: 'Self',
          tags: ['health', 'fitness'],
          notes: 'Workout playlist ready.',
        },
        {
          id: 3,
          title: 'Workout',
          description: 'Complete a 30-minute cardio session.',
          completed: true,
          priority: 'High',
          assignedTo: 'Self',
          tags: ['health', 'fitness'],
          notes: 'Workout playlist ready.',
        },
        {
          id: 4,
          title: 'Call Mom',
          description: 'Have a catch-up call with Mom to see how she is doing.',
          dueDate: '2024-06-21',
          priority: 'Medium',
          assignedTo: 'Self',
          tags: ['personal', 'family'],
          notes: 'She prefers calls in the afternoon.',
        },
        {
          id: 5,
          title: 'Fix the sink',
          description: 'Repair the leaking sink in the kitchen.',
          dueDate: '2024-06-22',
          priority: 'High',
          assignedTo: 'Self',
          tags: ['home', 'maintenance'],
          notes: 'Need to buy plumber’s tape.',
        },
        // {
        //   id: 6,
        //   title: 'Finish project',
        //   description: 'Complete the final report for the work project.',
        //   dueDate: '2024-06-30',
        //   priority: 'High',
        //   assignedTo: 'Self',
        //   tags: ['work', 'project'],
        //   notes: 'Team meeting on Friday to discuss progress.',
        // },
      ],

      addTodo: (todo) =>
        set((state) => ({
          Todos: [
            ...state.Todos,
            {
              id: state.Todos.length ? Math.max(...state.Todos.map((t) => t.id)) + 1 : 1,
              title: todo.title ?? 'Untitled',
              description: todo.description ?? '',
              dueDate: todo.dueDate,
              priority: todo.priority ?? 'Medium',
              assignedTo: todo.assignedTo ?? 'Self',
              tags: todo.tags ?? [],
              notes: todo.notes ?? '',
            },
          ],
        })),

      updateTodo: (todoId, newTodo) =>
        set((state) => ({
          Todos: state.Todos.map((todo) =>
            todo.id === todoId ? { ...todo, ...newTodo } : todo
          ),
        })),

        deleteTodo: (todoId) =>
        set((state) => ({
          Todos: state.Todos.filter((todo) => todo.id !== todoId),
        })),

        GetTodoId: (todoId) => {
          const { Todos } = get();
          return Todos.find((todo) => todo.id === todoId);
        },
    }),
    {
      name: 'todo-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
);

export default todoState;
