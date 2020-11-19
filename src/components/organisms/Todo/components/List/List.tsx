// Core
import * as React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Menu, Button, Dropdown } from 'antd';

// Components
import Item from '../Item';
import Search from '../Search';
import Control from '../Control';

// Helpers
import useControl from '../../helpers/useControl';

// Selectors
import { makeGetItems } from '@bus/todo/selectors';

// Actions
import { TodoActions } from '@bus/todo/actions';

// Types
import { Item as ItemProps } from '@bus/todo/types';

// Styles
import styles from './List.module.scss';

export interface TodoListProps {
  className?: string;
  id: string;
  title: string;
  items: string[];
}

const TodoList: React.FC<TodoListProps> = ({
  className,
  id,
  title,
  items: itemIds,
}) => {
  const [term, setTerm] = React.useState('');
  const [openSearch, setOpenSearch] = React.useState(false);

  const getItems = React.useMemo(() => {
    return makeGetItems(itemIds, term);
  }, [itemIds, term]);

  const items = useSelector(getItems, shallowEqual);

  const dispatch = useDispatch();

  const handleCreateItem = React.useCallback(() => {
    dispatch(TodoActions.createItemAsync(id, 'Новый задача'));
  }, []);

  const handleUpdateList = (title: string) => {
    dispatch(TodoActions.updateList(id, title));
  };

  const handleRemoveList = () => {
    dispatch(TodoActions.removeListAsync(id));
  };

  const {
    editMode,
    handleControlChange,
    handleOpenEdit,
    handleOk,
    handleCancel,
  } = useControl({ title, onUpdate: handleUpdateList });

  const handleSearchChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setTerm(event.currentTarget.value);
    }, []);

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = React.useCallback(() => {
    setTerm('');
    setOpenSearch(false);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleOpenSearch}>
        Поиск
      </Menu.Item>

      <Menu.Item key="1" onClick={handleOpenEdit}>
        Редактировать
      </Menu.Item>

      <Menu.Item key="2" onClick={handleRemoveList}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  const actions = React.useMemo(() => (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className={styles.MenuButton}>
        <i className="fas fa-ellipsis-v" />
      </Button>
    </Dropdown>
  ), []);

  return (
    <div className={classNames(styles.Root, className)}>
      <Control
        className={styles.Control}
        editMode={editMode}
        actions={actions}
        value={title}
        onChange={handleControlChange}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Search
        className={styles.Search}
        open={openSearch}
        value={term}
        onChange={handleSearchChange}
        onClose={handleCloseSearch}
      />

      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} className={styles.Content}>
            {items.map((item: ItemProps, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <Item
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={styles.Item}
                    listId={id}
                    {...item}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button
        className={styles.CreateButton}
        icon={<i className="fas fa-plus" />}
        onClick={handleCreateItem}
      >
        Добавить карточку
      </Button>
    </div>
  );
};

// Exports
export default React.memo(TodoList);
