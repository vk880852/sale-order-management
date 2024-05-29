// src/pages/CompletedOrders.jsx
import React from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchCompletedOrders } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const CompletedOrders = () => {
  const { data: orders, isLoading, isError } = useQuery({queryKey:['completedOrders'],queryFn: fetchCompletedOrders});
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer</Th>
            <Th>Total</Th>
            <Th>Invoice Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.total}</Td>
              <Td>{new Date(order.invoiceDate).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;
