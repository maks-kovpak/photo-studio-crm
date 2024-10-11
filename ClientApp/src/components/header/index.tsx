import { Layout, Menu, Typography } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { paths } from '@/lib/paths';

import type { ItemType } from 'antd/es/menu/interface';

import './index.css';

const items: ItemType[] = [
  {
    key: paths.clients,
    label: <NavLink to={paths.clients}>Clients</NavLink>,
  },
  {
    key: paths.orders,
    label: <NavLink to={paths.orders}>Orders</NavLink>,
  },
  {
    key: paths.services,
    label: <NavLink to={paths.services}>Services</NavLink>,
  },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Layout.Header>
      <Typography.Title level={2} className="logo">
        Photo studio
      </Typography.Title>

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]} items={items} />
    </Layout.Header>
  );
};

export default Header;
