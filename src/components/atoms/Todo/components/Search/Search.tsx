// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';

// Styles
import styles from './Search.scss';

interface TodoSearchProps {
  className?: string;
  open?: boolean;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onClose?: () => void;
}

const TodoSearch: React.FC<TodoSearchProps> = ({
  className,
  open,
  value,
  onChange,
  onClose,
}) => {
  const $input = React.useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = React.useState(!!open);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  React.useEffect(() => {
    setIsOpen(!!open);
  }, [open]);

  React.useEffect(() => {
    if ($input.current && isOpen) {
      $input.current.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div className={classNames(styles.Root, className)}>
      <Input
        // @ts-ignore
        ref={$input}
        className={styles.Input}
        value={value}
        onChange={onChange}
      />

      <Button className={styles.CloseButton} onClick={handleClose}>
        <i className="far fa-times-circle" />
      </Button>
    </div>
  ) : null;
};

// Exports
export default TodoSearch;
