import { useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useInitApplication } from './lib/init';
import Header from './components/header';

const App = () => {
  const { onInit } = useInitApplication();
  useEffect(onInit, [onInit]);

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
