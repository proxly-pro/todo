// Core
import * as React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

// Styles
import styles from './Control.scss';

export interface TodoControlProps {
  className?: string;
  value?: string
  edit?: boolean;
  actions?: React.ReactElement;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onOk?: () => void;
  onCancel?: () => void;
}

const TodoControl: React.FC<TodoControlProps> = ({
  className,
  value,
  edit,
  actions,
  onChange,
  onOk,
  onCancel,
}) => {
  const [isEdit, setIsEdit] = React.useState(!!edit);

  const handleOk = () => {
    setIsEdit(false);
    onOk && onOk();
  };

  const handleCancel = () => {
    setIsEdit(false);
    onCancel && onCancel();
  }

  React.useEffect(() => {
    setIsEdit(!!edit);
  }, [edit]);

  const buttons = (
    <>
      <Button className={styles.OkButton} onClick={handleOk}>
        <i className="fas fa-check" />
      </Button>

      <Button className={styles.CancelButton} onClick={handleCancel}>
        <i className="fas fa-times" />
      </Button>
    </>
  );

  return (
    <div className={classNames(styles.Root, className)}>
      {isEdit
        ? <input className={styles.Input} value={value} onChange={onChange} />
        : <span className={styles.Title}>{value}</span>
      }

      <div className={styles.Actions}>
        {isEdit ? buttons : actions}
      </div>
    </div>
  );
};

// Exports
export default TodoControl;
