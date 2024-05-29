const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let activeOrders = [
  { id: 1, customer: 'John Doe', total: 100, invoiceDate: new Date() },
];

let completedOrders = [
  { id: 2, customer: 'Jane Doe', total: 150, invoiceDate: new Date() },
];

export const fetchActiveOrders = async () => {
  await delay(500);
  return activeOrders;
};

export const fetchCompletedOrders = async () => {
  await delay(500); 
  return completedOrders;
};

export const createOrder = async (newOrder) => {
  await delay(500); 
  newOrder.id = activeOrders.length + 1;
  activeOrders.push(newOrder);
  return newOrder;
};

export const updateOrder = async (updatedOrder) => {
  await delay(500);
  activeOrders = activeOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order);
  return updatedOrder;
};
