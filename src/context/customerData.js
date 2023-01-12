import React, { useState } from 'react';
import { findCustomer, getCustomers } from '../utils/api/customers';
export const ThemeContext = React.createContext();

const ContextCustomerData = props => {
  const [dataCustomer, setDataCustomer] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateCustomerInfo, setUpdateCustomerInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [infoAlert, setInfoAlert] = useState({ open: false, content: 'This is the content', type: 'error', title: 'this a title' });

  const loadClients = async () => {
    const response = await getCustomers();
    setDataCustomer(response);
  };

  const handleClose = () => {
    setOpen(false);
    setEditModal(false);
  };

  const updateClient = async id => {
    const res = await findCustomer(id);
    setUpdateCustomerInfo(res);
    setOpen(true);
    setEditModal(true);
  };

  const cleanAlert = () => {
    return setTimeout(() => {
      setInfoAlert({
        open: false,
      });
    }, 3000);
  };

  return (
    <ThemeContext.Provider
      value={{
        dataCustomer,
        setDataCustomer,
        loadClients,
        handleClose,
        open,
        setOpen,
        updateClient,
        updateCustomerInfo,
        editModal,
        setEditModal,
        infoAlert,
        setInfoAlert,
        cleanAlert,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ContextCustomerData;
