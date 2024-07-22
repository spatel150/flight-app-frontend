import React from 'react';
import Navbar from './Navbar.js';

import './styles.css';
import './App.css';
// import CustomerView from './CustomerComponent/CustomerView.js'
import CustomerPage from './CustomerComponent/CustomerPage.js';
import FlightPage from './FlightComponent/FlightPage.js';
import BookingView from './BookingComponent/BookingView.js';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <CustomerPage />
        <br />
        <FlightPage />
        <br />
        <BookingView />
      </div>
    </>
  );
}

export default App;
