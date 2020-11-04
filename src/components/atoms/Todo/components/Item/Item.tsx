// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

// Components
import Control from '@components/atoms/Todo/components/Control';

// Helpers
import useControl from '@components/atoms/Todo/helpers/useControl';

// Actions
import { TodoActions } from '@bus/todo/actions';

// Styles
import styles from './Item.scss';

export interface TodoItemProps {
  className?: string;
  parentId: string,
  id: string;
  title: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  className,
  parentId,
  id,
  title: titleProp,
}) => {
  const dispatch = useDispatch();

  const {
    title,
    isEdit,
    handleOpenEdit,
    handleChange,
    handleOk,
    handleCancel,
  } = useControl({
    title: titleProp,
    onOk: () => handleUpdateItem(),
    onCancel: () => handleUpdateItem(),
  });

  const handleUpdateItem = () => {
    dispatch(TodoActions.updateItem({ id, title }));
  };

  const handleRemoveItem = () => {
    dispatch(TodoActions.removeItem(parentId, id));
  };

  const actions = (
    <>
      <Button className={styles.EditButton} onClick={handleOpenEdit}>
        <i className="fas fa-pen" />
      </Button>

      <Button className={styles.RemoveButton} onClick={handleRemoveItem}>
        <i className="fas fa-trash" />
      </Button>
    </>
  );

  return (
    <Control
      className={classNames(styles.Root, className)}
      edit={isEdit}
      value={title}
      actions={actions}
      onChange={handleChange}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};

// Exports
export default TodoItem;
