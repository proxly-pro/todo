// Core
import * as React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

// Components
import Layout from '@components/templates/Layout';
import Todo from '@components/atoms/Todo';

// Selectors
import { getLists } from '@bus/todo/selectors';

// Styles
import styles from './HomePage.scss';

export interface HomePageProps {
  className?: string;
}

const HomePage: React.FC<HomePageProps> = ({ className }) => {
  const lists = useSelector(getLists);

  return (
    <Layout className={classNames(styles.Root, className)}>
      <Todo lists={lists} />
    </Layout>
  );
};

// Exports
export default HomePage;
