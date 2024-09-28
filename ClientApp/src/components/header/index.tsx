import { Layout, Menu, Typography } from 'antd';
import type { ItemType, MenuItemType } from 'antd/es/menu/interface';

import './index.css';
import { NavLink } from 'react-router-dom';

const items: ItemType<MenuItemType>[] = [
  {
    key: 'clients-link',
    label: <NavLink to="/clients">Clients</NavLink>,
  },
  {
    key: 'orders-link',
    label: <NavLink to="/orders">Orders</NavLink>,
  },
  {
    key: 'services-link',
    label: <NavLink to="/services">Services</NavLink>,
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
