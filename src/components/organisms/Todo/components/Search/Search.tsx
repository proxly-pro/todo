// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';

// Styles
import styles from './Search.module.scss';

interface TodoSearchProps {
  className?: string;
  open?: boolean;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const TodoSearch: React.FC<TodoSearchProps> = ({
  className,
  open,
  value,
  onChange,
  onClose,
}) => {
  const $input = React.useRef<Input>(null);

  React.useEffect(() => {
    if ($input.current && open) {
      $input.current.focus();
    }
  }, [open]);

  return open ? (
    <div className={classNames(styles.Root, className)}>
      <Input
        ref={$input}
        className={styles.Input}
        value={value}
        onChange={onChange}
      />

      <Button className={styles.CloseButton} onClick={onClose}>
        <i className="far fa-times-circle" />
      </Button>
    </div>
  ) : null;
};

// Exports
export default React.memo(TodoSearch);
