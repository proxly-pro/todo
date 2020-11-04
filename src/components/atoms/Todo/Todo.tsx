// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';

// Components
import List, { TodoListProps } from '@components/atoms/Todo/components/List';

// Actions
import { TodoActions } from '@bus/todo/actions';

// Styles
import styles from './Todo.scss';

const reorder = (
  list: TodoListProps,
  startIndex: number,
  endIndex: number,
) => {
  const items = [...list.items];
  const [removed] = items.splice(startIndex, 1);
  items.splice(endIndex, 0, removed);
  return { ...list, items };
};

export interface TodoProps {
  className?: string;
  lists: TodoListProps[];
}

const Todo: React.FC<TodoProps> = ({ className, lists }) => {
  const dispatch = useDispatch();

  const handleCreateList = () => (
    dispatch(TodoActions.createList({
      id: uuid(),
      title: 'Новая задача',
      items: [],
    }))
  );

  const getList = (id: string) =>
    lists.find((list: TodoListProps) => list.id === id);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const list = reorder(
        getList(source.droppableId)!,
        source.index,
        destination.index
      );

      dispatch(TodoActions.updateList(list));
    }
  };

  React.useEffect(() => {
    handleCreateList();
  }, []);

  return (
    <div className={classNames(styles.Root, className)}>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((list) => (
          <Droppable key={list.id} droppableId={list.id}>
            {(provided) => (
              <div ref={provided.innerRef} className={styles.List}>
                <List
                  id={list.id}
                  title={list.title}
                  items={list.items}
                  placeholder={provided.placeholder}
                />
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>

      <div className={styles.List}>
        <Button className={styles.Button} onClick={handleCreateList}>
          <i className="fas fa-plus-circle" />
        </Button>
      </div>
    </div>
  );
};

// Exports
export default Todo;
