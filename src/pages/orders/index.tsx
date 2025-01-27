import React from 'react'
import OrdersList from '@/_components/core/Orders/OrderList';

const index = () => {
  return (
    <OrdersList />
  )
};

export default index;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrdersAsync } from "../../redux/slices/OrdersSlice"; // Adjust import path
// import { RootState } from "../../redux/store"; // Import RootState type
// import { AppDispatch } from "../../redux/store"; // Import the AppDispatch type

// const Orders = () => {
//   const dispatch = useDispatch<AppDispatch>(); // Ensure the dispatch is typed correctly

//   // Select orders, status, and error from the Redux store
//   const orders = useSelector((state: RootState) => state.orders);
//   console.log("Order2343: ", orders)
//   const status = useSelector((state: RootState) => state.orders.status);
//   const error = useSelector((state: RootState) => state.orders.error);

//   // Fetch orders when the component mounts
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchOrdersAsync());
//     }
//   }, [status, dispatch]);

//   // Display loading or error states
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }

//   // useEffect(() => {
//   //   console.log("Fetched orders112233:", orders); // Log orders when they change
//   // }, [orders]);
  

//   return (
//     <div>
//       <h1>Orders</h1>
//       {Array.isArray(orders) && orders.length === 0 ? (
//         <p>No orders available</p>
//       ) : (
//         <ul>
//           {Array.isArray(orders) && orders.map((order: { id: number; address: string; total: number }) => (
//             <li key={order.id}>
//               {order.address} - ${order.total}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
  
// };

// export default Orders;
