import React from 'react';

interface TodoFilterProps {
  filterStatus: 'all' | 'active' | 'completed';
  setFilterStatus: (status: 'all' | 'active' | 'completed') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'all' | 'active' | 'completed';

    setFilterStatus(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
