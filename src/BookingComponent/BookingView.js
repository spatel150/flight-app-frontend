import React, { useState, useEffect } from "react";

const BookingView = () => {
  const [flights, setFlights] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookings, setBookings] = useState([]);

  const getCustomers = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/customers`);
      const body = await resp.json();
      return body;
    } catch (error) {
      console.error("Error getting customers", error);
    }
  };

  const getFlights = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/flights`);
      const body = await resp.json();
      return body;
    } catch (error) {
      console.error("Error getting customers", error);
    }
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const respFlights = await getFlights();
        setFlights(respFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlightData();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const respCustomer = await getCustomers();
        setCustomers(respCustomer);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomerData();
  }, []);

 
  const handleFlightSelect = (flightId) => {
    setSelectedFlight(flights.find(flight => flight.id === flightId))
  } 

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customers.find(customer => customer.id === customerId))
  }

  const handleBookFlight = () => {
    if (selectedFlight && selectedCustomer) {
        const newBooking = {
            flightId: selectedFlight.id,
            customerId: selectedCustomer.id,
            customerName: selectedCustomer.name,
            customerEmail: selectedCustomer.email,
            flightNumber: selectedFlight.flightNumber,
            origin: selectedFlight.origin,
            destination: selectedFlight.destination
        };

        setBookings([...bookings, newBooking]);
        setBookingStatus('Booking Successful!');

        setFlights(prevFlights => prevFlights.filter(flight => flight.id !== selectedFlight.id))
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== selectedCustomer.id))

        setSelectedFlight(null);
        setSelectedCustomer(null);
    } else {
        setBookingStatus('Unable to book a flight. Please select a flight and customer')
    }
  }

   useEffect(() => {
     return () => {
       localStorage.removeItem("bookings");
     };
   }, []);

  return (
    <>
      <div className="booking-form">
        <h2>Book Flights</h2>
        <label>Select a Flight</label>
        <select onChange={(e) => handleFlightSelect(e.target.value)}>
          <option value="">Select Flight Info</option>
          {flights.map((flight) => (
            <option
              key={flight.id}
              value={flight.id}
            >{"Flight Number: " + `${flight.flightNumber} - Origin: ${flight.origin} to Destination: ${flight.destination}`}</option>
          ))}
        </select>
        <br />
        <label>Select a Customer</label>
        <select onChange={(e) => handleCustomerSelect(e.target.value)}>
          <option value="">Select Customer Info</option>
          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >{"Name: " + `${customer.name} Email: ${customer.email})`}</option>
          ))}
        </select>
        <br />
        <button onClick={handleBookFlight}>Book Flight</button>
        <br />
        {bookingStatus && <p>{bookingStatus}</p>}
      </div>

      <div className="table-wrapper-booking">
        <h2>All Bookings</h2>
        <table className="table-3">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Flight Number</th>
              <th>Origin</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => {
              return customers.map((cust) => {
                return (
                  <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{cust.id}</td>
                    <td>{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingView;
