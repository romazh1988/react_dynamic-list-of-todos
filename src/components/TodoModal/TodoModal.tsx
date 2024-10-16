import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

interface TodoModalClose {
  todo: Todo;
  loading: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalClose> = ({
  todo,
  loading,
  onClose,
}) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" onClick={onClose} />

    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          Todo #{todo.id}
        </div>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="delete"
          data-cy="modal-close"
          onClick={onClose}
        />
      </header>

      <div className="modal-card-body">
        {loading ? (
          <Loader />
        ) : (
          <>
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong>Planned by: </strong> {todo.user}
            </p>
            {/* <strong className="has-text-success">Done</strong> */}
            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
            </p>
          </>
        )}
      </div>

      <footer className="modal-card-foot">
        <button className="button" onClick={onClose}>
          Hide
        </button>
      </footer>
    </div>
  </div>
);
