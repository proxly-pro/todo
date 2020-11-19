// Core
import * as React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

// Components
import Control from '../Control';

// Helpers
import useControl from '../../helpers/useControl';

// Actions
import { TodoActions } from '@bus/todo/actions';

// Styles
import styles from './Item.module.scss';

export interface TodoItemProps {
  className?: string;
  listId: string,
  id: string;
  title: string;
}

const TodoItem = React.forwardRef<HTMLDivElement, TodoItemProps>(({
  className,
  listId,
  id,
  title,
  ...props
}, ref) => {
  const dispatch = useDispatch();

  const handleUpdateItem = (title: string) => {
    dispatch(TodoActions.updateItem(id, title));
  };

  const handleRemoveItem = () => {
    dispatch(TodoActions.removeItemAsync(listId, id));
  };

  const {
    editMode,
    handleOpenEdit,
    handleControlChange,
    handleOk,
    handleCancel,
  } = useControl({ title, onUpdate: handleUpdateItem });

  const actions = React.useMemo(() => (
    <>
      <Button className={styles.EditButton} onClick={handleOpenEdit}>
        <i className="fas fa-pen" />
      </Button>

      <Button className={styles.RemoveButton} onClick={handleRemoveItem}>
        <i className="fas fa-trash" />
      </Button>
    </>
  ), []);

  return (
    <div {...props} ref={ref} className={classNames(styles.Root, className)}>
      <Control
        editMode={editMode}
        value={title}
        actions={actions}
        onChange={handleControlChange}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
});

// Exports
export default React.memo(TodoItem);
