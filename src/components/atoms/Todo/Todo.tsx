// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, OnDragEndResponder, DraggableLocation } from 'react-beautiful-dnd';

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

const move = (
  source: TodoListProps,
  destination: TodoListProps,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
) => {
  const sourceClone = [...source.items];
  const destClone = [...destination.items];

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  return {
    [droppableSource.droppableId]: { ...source, items: sourceClone },
    [droppableDestination.droppableId]: { ...destination, items: destClone },
  };
};

export interface TodoProps {
  className?: string;
  lists: TodoListProps[];
}

const Todo: React.FC<TodoProps> = ({ className, lists }) => {
  const dispatch = useDispatch();

  const handleCreateList = () => {
    dispatch(TodoActions.createListAsync('Новый список'));
  };

  const getList = (id: string) =>
    lists.find((list: TodoListProps) => list.id === id);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const list = reorder(
        getList(source.droppableId)!,
        source.index,
        destination.index,
      );

      dispatch(TodoActions.updateList(list));
    } else {
      const lists = move(
        getList(source.droppableId)!,
        getList(destination.droppableId)!,
        source,
        destination,
      );

      dispatch(TodoActions.updateList(lists[source.droppableId]));
      dispatch(TodoActions.updateList(lists[destination.droppableId]));
    }
  };

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
