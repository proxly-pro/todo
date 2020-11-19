// Core
import * as React from 'react';

// Components
import Layout from '@components/templates/Layout';
import Todo from '@components/organisms/Todo';

const HomePage: React.FC = () => (
  <Layout>
    <Todo />
  </Layout>
);

// Exports
export default HomePage;
