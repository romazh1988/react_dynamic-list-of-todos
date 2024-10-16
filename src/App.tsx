/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [selectedTodos, setSelectedTodos] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'active'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoadingTodos(true);
      const fetchedTodos = await getTodos();

      setTodos(fetchedTodos);
      setLoadingTodos(false);
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos
    .filter(
      todo =>
        filterStatus === 'all' ||
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed),
    )
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const handleTodoSelect = async (todo: Todo) => {
    setSelectedTodos(todo);
    setLoadingTodos(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingUser(false);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="block">
            {loadingTodos ? (
              <Loader />
            ) : (
              <TodoList todos={filteredTodos} onTodoSelect={handleTodoSelect} />
            )}
          </div>
        </div>
      </div>
      {selectedTodos && (
        <TodoModal
          todo={selectedTodos}
          loading={loadingUser}
          onClose={() => setSelectedTodos(null)}
        />
      )}
    </div>
  );
};
