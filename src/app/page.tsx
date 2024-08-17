'use client';

import { useEffect, useState } from 'react';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
import TodoWrapper from './components/TodoWrapper';

interface Todo {
  todo: string;
  completed: boolean;
  id: number;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [finishedTodos, setFinishedTodos] = useState<Todo[]>([]);
  const [isFinished, setIsFinished] = useState<number | null>(null);
  const [isDelete, setIsDelete] = useState<number | null>(null);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    resetInput: () => void
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const todo = formData.get('todo') as string | null;

    if (!todo) {
      return;
    }

    const newTodo: Todo = {
      todo: todo,
      id: Date.now(),
      completed: false,
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem('Todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    resetInput();
  };

  useEffect(() => {
    const todos = localStorage.getItem('Todos');
    const finishedTodos = localStorage.getItem('Finished Todos');

    if (todos) {
      setTodos(JSON.parse(todos));
    }

    if (finishedTodos) {
      setFinishedTodos(JSON.parse(finishedTodos));
    }
  }, []);

  const addFinishedItem = (id: number) => {
    const itemToRemove = todos.find((todo) => todo.id === id);

    setIsFinished(id);

    if (itemToRemove) {
      setFinishedTodos((prevTodos) => {
        const updatedTodos = [
          ...prevTodos,
          { ...itemToRemove, completed: true },
        ];
        localStorage.setItem('Finished Todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }
    setTimeout(() => {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
        localStorage.setItem('Todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      });

      setIsFinished(null);
    }, 1000);
  };

  const removeItem = (id: number) => {
    setIsDelete(id);

    setTimeout(() => {
      setFinishedTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
        localStorage.setItem('Finished Todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setIsDelete(null);
    }, 1000);
  };

  return (
    <main>
      <section className="max-w-xl h-xl mx-auto mt-8">
        <Input onSubmit={handleSubmit} />
        <TodoWrapper name={'Todo'} todos={todos}>
          {todos.map((todo) => (
            <TodoItem
              className={`${isFinished === todo.id ? 'remove' : ''}`}
              onClick={() => addFinishedItem(todo.id)}
              todo={todo.todo}
              completed={todo.completed}
              key={todo.id}
            />
          ))}
        </TodoWrapper>
        <TodoWrapper name={'Done'} todos={finishedTodos}>
          {finishedTodos.map((todo) => (
            <TodoItem
              className={`${isFinished === todo.id ? 'added' : ''} ${
                isDelete === todo.id ? 'remove' : ''
              }`}
              onClick={() => removeItem(todo.id)}
              todo={todo.todo}
              completed={todo.completed}
              key={todo.id}
            />
          ))}
        </TodoWrapper>
      </section>
    </main>
  );
};

export default Home;
