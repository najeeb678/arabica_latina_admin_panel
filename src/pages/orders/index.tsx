import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/slices/OrdersSlice';
import { AppDispatch } from '../../redux/store';  // Import the correct AppDispatch type

const OrdersComponent = () => {
  const dispatch = useDispatch<AppDispatch>();  // Use AppDispatch for typing
  const { data: orders, loading, error } = useSelector((state: any) => state.orders);

  useEffect(() => {
    dispatch(getOrders()); // Dispatch the thunk to fetch orders
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Orders List</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order: { id: React.Key | null | undefined; product: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
            <li key={order.id}>
              {order.product} - {order.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <div>No orders available</div>
      )}
    </div>
  );
};

export default OrdersComponent;
