// src/pages/ActiveOrders.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SaleOrderModal from '../components/SaleOrderModal';
import { fetchActiveOrders, createOrder, updateOrder } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const ActiveOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['activeOrders'],
    queryFn: fetchActiveOrders,
  });

  const mutation = useMutation({
    mutationFn: (order) => (editingOrder ? updateOrder(order) : createOrder(order)),
    onSuccess: () => {
      queryClient.invalidateQueries('activeOrders');
      setIsOpen(false);
      setEditingOrder(null);
    },
  });

  const openModal = (order) => {
    setEditingOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setEditingOrder(null);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert status="error">
          <AlertIcon />
          Error loading data
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Button onClick={() => openModal(null)}>+ Sale Order</Button>
      <Button onClick={logout} ml={4}>Logout</Button>
      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer</Th>
            <Th>Total</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.total}</Td>
              <Td>{new Date(order.invoiceDate).toLocaleDateString()}</Td>
              <Td>
                <Button onClick={() => openModal(order)}>...</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SaleOrderModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={mutation.mutate}
        initialData={editingOrder}
      />
    </Box>
  );
};

export default ActiveOrders;
