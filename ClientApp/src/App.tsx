import React, { useState } from 'react';
import Table from './components/table';
import { BaseModel } from './types/models';

interface DataType extends BaseModel {
  id: string;
  name: string;
  age: number;
  address: string;
}

const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  id: i.toString(),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
}));

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>(originData);
  return <Table data={data} setData={setData} />;
};

export default App;
