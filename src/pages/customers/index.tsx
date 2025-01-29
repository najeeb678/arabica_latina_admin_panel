import React from 'react';
import CustomersList from '@/_components/core/Customers/CustomersList';

const index = () => {
  return (
    <CustomersList />
  )
}

export default index;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCustomers } from "../../redux/slices/CustomersSlice";
// import { RootState, AppDispatch } from "@/redux/store";

// const SomeComponent = () => {
//   const dispatch = useDispatch<AppDispatch>();  // Type the dispatch function
//   const { customers, loading, error } = useSelector(
//     (state: RootState) => state.customers
//   );

//   useEffect(() => {
//     dispatch(fetchCustomers());  // Fetch customers on component mount
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Customer List</h2>
//       <ul>
//         {customers.map((customer) => (
//           <li key={customer.id}>{customer.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SomeComponent;
