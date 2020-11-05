// Core
import * as React from 'react';
import classNames from 'classnames';
import { Menu, Button, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

// Components
import Item, { TodoItemProps as ItemProps, } from '@components/atoms/Todo/components/Item';
import Search from '@components/atoms/Todo/components/Search';
import Control from '@components/atoms/Todo/components/Control';

// Helpers
import useControl from '@components/atoms/Todo/helpers/useControl';

// Selectors
import { getItemsByIds } from '@bus/todo/selectors';

// Actions
import { TodoActions } from '@bus/todo/actions';

// Styles
import styles from './List.scss';

export interface TodoListProps {
  className?: string;
  id: string;
  title: string;
  items: string[];
  placeholder: any,
}

const TodoList: React.FC<TodoListProps> = ({
  className,
  id,
  title: titleProp,
  items: itemsProp,
  placeholder,
}) => {
  const [search, setSearch] = React.useState('');
  const [isSearch, setIsSearch] = React.useState(false);

  const items = useSelector((state) => getItemsByIds(state, itemsProp));

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
    onOk: () => handleUpdateList(),
    onCancel: () => handleUpdateList(),
  });

  const handleCreateItem = () => {
    dispatch(TodoActions.createItemAsync(id, 'Новый задача'));
  };

  const handleUpdateList = () => {
    dispatch(TodoActions.updateList({ id, title, items: itemsProp }));
  };

  const handleRemoveList = () => {
    dispatch(TodoActions.removeListAsync(id));
  };

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleOpenSearch = () => {
    setIsSearch(true);
  };

  const handleCloseSearch = () => {
    setIsSearch(false);
  };

  React.useEffect(() => {
    dispatch(TodoActions.searchItem(search));
  }, [search]);

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

  const menuButton = (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className={styles.MenuButton}>
        <i className="fas fa-ellipsis-v" />
      </Button>
    </Dropdown>
  );

  return (
    <div className={classNames(styles.Root, className)}>
      <Control
        className={styles.Control}
        edit={isEdit}
        actions={menuButton}
        value={title}
        onChange={handleChange}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Search
        className={styles.Search}
        open={isSearch}
        value={search}
        onChange={handleSearchChange}
        onClose={handleCloseSearch}
      />

      <div className={styles.Content}>
        {items && items.map((item: ItemProps, index: number) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={{ ...provided.draggableProps.style }}
                className={styles.Item}
              >
                <Item listId={id} id={item.id} title={item.title} />
              </div>
            )}
          </Draggable>
        ))}

        {placeholder}

        <Button className={styles.CreateButton} onClick={handleCreateItem}>
          <i className="fas fa-plus-circle" /> <span>Добавить карточку</span>
        </Button>
      </div>
    </div>
  );
};

// Exports
export default TodoList;
