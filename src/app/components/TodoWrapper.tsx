'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TodoWrapperProps {
  name: string;
  children: React.ReactNode;
  todos: any[];
  defaultOpen?: boolean;
}

const TodoWrapper: React.FC<TodoWrapperProps> = ({
  name,
  children,
  todos,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(0);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      const currentHeight = content.scrollHeight;
      if (currentHeight !== height) {
        setHeight(currentHeight);
        if (!isOpen) {
          setIsOpen(true);
        }
      }
    }
  }, [todos, height, isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (todos.length === 0) {
      setIsOpen(false);
    }
  }, [todos]);

  return (
    <div className="bg-black/50 rounded-xl p-2 mb-4">
      <button
        className="flex justify-between w-full px-4 my-2"
        onClick={toggleOpen}
        type="button"
      >
        <p>{name}</p>
        <ChevronUp
          className={`w-6 h-6 transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          transition: 'max-height 0.5s ease',
        }}
        className={`flex flex-col gap-3 mt-2 transition-height duration-300 overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default TodoWrapper;
