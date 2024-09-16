import React, { useState, useEffect } from 'react';
import './styles/tailwind.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  // Lógica del contador que solo se ejecutará en el cliente
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <p className="text-xl font-bold mb-4">Count: {count}</p>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
