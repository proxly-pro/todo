// Core
import * as React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Footer.scss';

export interface FooterProps {
  className: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => (
  <footer className={classNames(styles.Root, className)}>
    <p>Made with ❤ by Proxly</p>
  </footer>
);

export default React.memo(Footer);
