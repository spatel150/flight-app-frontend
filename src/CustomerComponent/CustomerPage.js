import React, { useState, useEffect } from "react";
import "../styles.css";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAddCustomerFormVisible, setIsAddCustomerFormVisible] =
    useState(false);
  const [isEditCustomerFormVisible, setIsEditCustomerFormVisible] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const saveCustomer = () => {
    setIsAddCustomerFormVisible(!isAddCustomerFormVisible);
  };

  // const closeModal = () => setIsEditCustomerFormVisible(false);

  // const handleModal = (e) => {
  //   e.preventDefault();
  //   closeModal();
  // };


  const updateCustomerDetails = (id) => {
    console.log("id", id);
    setIsEditCustomerFormVisible(true);
    setId(id);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = { name, email };

    try {
      const resp = await fetch(`http://localhost:8080/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      if (!resp.ok) {
        throw new Error("Failed to add customer details");
      }

      if (resp.ok) {
        const customerResponse = await getCustomers();
        setCustomers(customerResponse);
        setName("");
        setEmail("");
        setIsAddCustomerFormVisible(false);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  //  const updateCustomerDetails = (id) => {
  //    console.log("id", id);
  //    setIsEditCustomerFormVisible(true);
  //    setId(id);
  //  };

  //  const handleName = (e) => {
  //    setName(e.target.value);
  //  };

  //  const handleEmail = (e) => {
  //    setEmail(e.target.value);
  //  };

   const handleUpdate = async () => {
     const customerPayload = { id, name, email };
     console.log("customerPayload", customerPayload);
     try {
       const resp = await fetch(`http://localhost:8080/customers/${id}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(customerPayload),
       });

       if (!resp.ok) {
         throw new Error("Failed to update customer details");
       }

       if (resp.ok) {
         const customerResponse = await getCustomers();
         setCustomers(customerResponse);
         setId("");
         setName("");
         setEmail("");
         setIsEditCustomerFormVisible(false);
       }
     } catch (error) {
       console.error("Error updating customer:", error);
     }
   };

   const deleteCustomer = async (id) => {
     try {
       const response = await fetch(`http://localhost:8080/customers/${id}`, {
         method: "DELETE",
       });

       if (response.ok) {
         setCustomers(customers.filter((customer) => customer.id !== id));
       } else {
         throw new Error("Failed to delete customer");
       }
     } catch (error) {
       console.error("Error deleting customer:", error);
     }
   };

   const getCustomers = async () => {
     try {
       const resp = await fetch(`http://localhost:8080/customers`);
       const body = await resp.json();
       return body;
     } catch (error) {
       console.error("Error getting customers", error);
     }
   };

   useEffect(() => {
     const fetchData = async () => {
       const customerResponse = await getCustomers();
       setCustomers(customerResponse);
     };
     fetchData();
   }, []);

    const handleSearchCustomers = (e) => {
      setSearchQuery(e.target.value);
    };

    const filterCustomers = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.name.toUpperCase().includes(searchQuery.toUpperCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toUpperCase().includes(searchQuery.toUpperCase()) 
    );

  // const getCustomers = async () => {
  //   try {
  //     const resp = await fetch(`http://localhost:8080/customers`);
  //     const body = await resp.json();
  //     return body;
  //   } catch (error) {
  //     console.error("Error getting customers", error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const customerResponse = await getCustomers();
  //     setCustomers(customerResponse);
  //   };
  //   fetchData();
  // }, []);

  // Add methods for updating and deleting customers

  return (
    <>
      <h2>Customer Info</h2>
      <div className="drop-wrapper">
        <button type="button" className="button-1" onClick={saveCustomer}>
          Add Customer Details
        </button>
        {isAddCustomerFormVisible && (
          <div className="dropdown-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={handleName} />
              <br />
              <label htmlFor="price">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmail}
              />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>

      <div className="table-wrapper-customer">
        <div className="search-bar-customer">
          <input
            type="text"
            className="search-input-2"
            placeholder="Search By Name or Email"
            value={searchQuery}
            onChange={handleSearchCustomers}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCustomers?.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <button
                    type="btn-2"
                    onClick={() => updateCustomerDetails(customer.id)}
                  >
                    Update
                  </button>
                  <button
                    type="btn-3"
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditCustomerFormVisible && (
          <div>
            <div>
              <div>
                <form>
                  <label>Update Customer:</label>
                  <br />
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleName}
                  />
                  <br />
                  <label htmlFor="email">Email: </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </form>
              </div>
              <button type="submit" onClick={() => handleUpdate()}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerPage;
