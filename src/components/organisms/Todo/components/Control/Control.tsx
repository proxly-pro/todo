// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

// Styles
import styles from './Control.module.scss';

export interface TodoControlProps {
  className?: string;
  value: string
  editMode?: boolean;
  actions?: React.ReactElement;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onOk: () => void;
  onCancel: () => void;
}

const TodoControl: React.FC<TodoControlProps> = ({
  className,
  value,
  editMode,
  actions,
  onChange,
  onOk,
  onCancel,
}) => {
  const buttons = (
    <>
      <Button className={styles.OkButton} onClick={onOk}>
        <i className="fas fa-check" />
      </Button>

      <Button className={styles.CancelButton} onClick={onCancel}>
        <i className="fas fa-times" />
      </Button>
    </>
  );

  return (
    <div className={classNames(styles.Root, className)}>
      {editMode
        ? <input className={styles.Input} value={value} onChange={onChange} />
        : <span className={styles.Title}>{value}</span>
      }

      <div className={styles.Actions}>
        {editMode ? buttons : actions}
      </div>
    </div>
  );
};

// Exports
export default React.memo(TodoControl);
