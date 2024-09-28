import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './components/header';

const App = () => {
  return (
    <Layout style={{ background: 'white' }}>
      <Header />

      <Layout.Content style={{ padding: '0 50px' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default App;
