// Core
import * as React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { Button } from 'antd';

// Components
import List from './components/List';

// Actions
import { TodoActions } from '@bus/todo/actions';

// Types
import { List as ListProps } from '@bus/todo/types';

// Selectors
import { getLists } from '@bus/todo/selectors';

// Styles
import styles from './Todo.module.scss';

export interface TodoProps {
  className?: string;
}

const Todo: React.FC<TodoProps> = ({ className }) => {
  const lists = useSelector(getLists);

  const dispatch = useDispatch();

  const handleCreateList = React.useCallback(() => {
    dispatch(TodoActions.createListAsync('Новый список'));
  }, []);

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      dispatch(
        TodoActions.reorderItemInList(
          source.droppableId,
          source.index,
          destination.index,
        ),
      );
    } else {
      dispatch(
        TodoActions.moveItemFromList(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
        ),
      );
    }
  };

  return (
    <div className={classNames(styles.Root, className)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {lists.map((list: ListProps) => (
          <List key={list.id} className={styles.List} {...list} />
        ))}
      </DragDropContext>

      <div className={styles.List}>
        <Button
          className={styles.CreateButton}
          icon={<i className="fas fa-plus-circle" />}
          onClick={handleCreateList}
        />
      </div>
    </div>
  );
};

// Exports
export default React.memo(Todo);
