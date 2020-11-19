// Core
import * as React from 'react';

export interface Options {
  title: string;
  onUpdate: (title: string) => void;
}

export interface Return {
  editMode: boolean;
  handleControlChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleOpenEdit: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}

const useControl = ({ title, onUpdate }: Options): Return => {
  const $prevTitle = React.useRef('');

  const [editMode, setEditMode] = React.useState(false);

  const handleOpenEdit = () => {
    setEditMode(true);
  };

  const handleControlChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      onUpdate(event.currentTarget.value);
    }, [onUpdate]);

  const handleOk = React.useCallback(() => {
    setEditMode(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    onUpdate($prevTitle.current);
    setEditMode(false);
  }, [onUpdate]);

  React.useLayoutEffect(() => {
    if (!editMode) {
      $prevTitle.current = title;
    }
  }, [title, editMode]);

  return {
    editMode,
    handleControlChange,
    handleOpenEdit,
    handleOk,
    handleCancel,
  };
};

// Exports
export default useControl;
