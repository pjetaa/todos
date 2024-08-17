'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Input {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    resetInput: () => void
  ) => void;
}

const Input: React.FC<Input> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e, () => setInputValue(''));
  };

  return (
    <div className="bg-black rounded-xl py-2 px-4 mb-4">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Todo"
          name="todo"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className={`transition-opacity duration-200 ${
            inputValue ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Input;
