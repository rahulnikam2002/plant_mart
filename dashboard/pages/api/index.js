// pages/index.js

import React from 'react';
import CustomerTable from '../components/CustomerTable';

const customers = [
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Female' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Female' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Female' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Female' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Female' },
  { name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', gender: 'Male' }

  // Add more customer data here
];

const Home = () => {
  return (
    <div>
      <h1></h1>
      <CustomerTable customers={customers} />
    </div>
  );
};

export default Home;
