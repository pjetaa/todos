import { Minus } from 'lucide-react';

interface Todo {
  todo: string;
  completed: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const TodoItem: React.FC<Todo> = ({ todo, completed, onClick, className }) => {
  return (
    <div
      data-status={completed}
      className={`flex justify-between items-center bg-black rounded-xl py-2 px-4 ${className}`}
    >
      <p>{todo}</p>
      <button onClick={onClick}>
        <Minus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TodoItem;
