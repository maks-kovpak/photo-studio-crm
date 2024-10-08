import { Layout, Menu, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { paths } from '@/lib/paths';

import type { ItemType } from 'antd/es/menu/interface';

import './index.css';

const items: ItemType[] = [
  {
    key: 'clients-link',
    label: <NavLink to={paths.clients}>Clients</NavLink>,
  },
  {
    key: 'orders-link',
    label: <NavLink to={paths.orders}>Orders</NavLink>,
  },
  {
    key: 'services-link',
    label: <NavLink to={paths.services}>Services</NavLink>,
  },
];

const Header = () => {
  return (
    <Layout.Header>
      <Typography.Title level={2} className="logo">
        Photo studio
      </Typography.Title>

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['clients-link']} items={items} />
    </Layout.Header>
  );
};

export default Header;
