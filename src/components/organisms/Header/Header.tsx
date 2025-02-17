// Core
import * as React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => (
  <header className={classNames(styles.Root, className)} />
);

// Exports
export default Header;
