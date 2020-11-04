// Core
import * as React from 'react';

export interface Options {
  title: string;
  onOk: () => void;
  onCancel: () => void;
}

export interface Return {
  title: string;
  isEdit: boolean;
  handleOpenEdit: () => void;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleOk: () => void;
  handleCancel: () => void;
}

const useControl = ({
  title: titleOption,
  onOk,
  onCancel,
}: Options): Return => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [title, setTitle] = React.useState(titleOption);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleOpenEdit = () => {
    setIsEdit(true);
  };

  const handleOk = () => {
    setIsEdit(false);
    onOk && onOk();
  };

  const handleCancel = () => {
    setIsEdit(false);
    onCancel && onCancel();
  };

  return { title, isEdit, handleOpenEdit, handleChange, handleOk, handleCancel };
};

// Exports
export default useControl;
