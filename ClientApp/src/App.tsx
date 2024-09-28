import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './components/header';

const App = () => {
  return (
    <Layout style={{ background: 'white' }}>
      <Header />

      <Layout.Content style={{ width: '90vw', margin: 'auto' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default App;
