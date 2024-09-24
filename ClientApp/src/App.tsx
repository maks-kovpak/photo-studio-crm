import { useState } from 'react';
import Table from './components/table';

import type { ClientModel } from './types/models';

const originData = Array.from({ length: 100 }).map<ClientModel>((_, i) => ({
  id: i,
  fullName: `Edward ${i}`,
  address: `London Park no. ${i}`,
  phone: '+32534646',
}));

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    width: 100,
    minWidth: 100,
  },
  {
    title: 'Full name',
    dataIndex: 'fullName',
    editable: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    editable: true,
  },
];

const App = () => {
  const [data, setData] = useState<ClientModel[]>(originData);
  return <Table data={data} setData={setData} columns={columns} />;
};

export default App;
