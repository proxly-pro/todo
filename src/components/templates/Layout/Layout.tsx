// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';

// Styles
import styles from './Layout.module.scss';

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={classNames(styles.Root, className)}>
    <Header />

    <main className={styles.Main}>
      <div className={styles.Wrapper}>{children}</div>
    </main>

    <Footer />
  </div>
);

// Exports
export default Layout;
