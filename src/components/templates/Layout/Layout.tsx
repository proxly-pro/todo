// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';

// Styles
import styles from './Layout.scss';

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={classNames(styles.Root, className)}>
    <Header className={styles.Header} />

    <main className={styles.Main}>
      <div className={styles.Wrapper}>{children}</div>
    </main>

    <Footer className={styles.Footer} />
  </div>
);

// Exports
export default Layout;
