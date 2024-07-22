import React, { useState, useEffect } from "react";
import "../styles.css";

const FlightPage = () => {
  const [flights, setFlights] = useState([]);
  const [id, setId] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isAddFlightFormVisible, setIsAddFlightFormVisible] = useState(false);
  const [isEditFlightFormVisible, setIsEditFlightFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const saveFlight = () => {
    setIsAddFlightFormVisible(!isAddFlightFormVisible);
  };

  // the saveFlight function is called, when the button 'Add Flight Details' is clicked
  // toggle the state value to true/false, based on a button click

  const updateFlightDetails = (id) => {
    console.log("id", id);
    setIsEditFlightFormVisible(true);
    setId(id);
  };

  // the updateFlightDetails function is called when the 'Update Flight' button is clicked.
  // we hide the modal when the button is clicked.
  // we set the id state to the value of the ID we pass in as the parameters when updating the flight information.
  // the updateFlight onClick event takes in a flight ID as the parameter.

  //   const closeModal = () => setIsEditFlightFormVisible(false);

  //   const handleModal = (e) => {
  //     e.preventDefault();
  //     closeModal();
  //   };

  const handleFlightNumber = (e) => {
    setFlightNumber(e.target.value);
  };

  const handleOrigin = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e) => {
    // 1. handleSubmit function which takes in an event (e)
    // and is asynchronous.
    // (promise, resolved based on the value returned by the async function)

    e.preventDefault();
    
    // prevents any default behavior of the event.
    const newFlight = { flightNumber, origin, destination };
    // creates an object called newFlight with props including flightNumber, origin, and destination
    // these props hold data based on user input.
    try {
      const resp = await fetch(`http://localhost:8080/flights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlight),
      });

      // try block which could throw an error if executed.
      // declare a constant variable 'resp' which will store the result of the 'fetch' function call
      // await is used to wait for the fetch function to complete.
      // fetch will send an HTTP request and return a promise that resolves to the response of the request.
      // using thr Fetch API.
      // makes an HTTP POST request to the URL, localhost:8080 ... which sends data to the Spring server.
      // coverts newFlight into JSON, and sends a JSON body object as part of the POST request.
      // method is POST request which will create a newFlight object
      // and send it to the server
      // since it's a POST request, the newFlight object will be converted into JSON
      // and sent to the body of the POST request.

      if (!resp.ok) {
        throw new Error("Failed to add flight details");
      }

      // checks if the response has an ok (http 200-299) status.
      // if the status is not OK, throw an error with the message
      // "Failed to add flight details"

      if (resp.ok) {
        const flightResponse = await getFlights();
        setFlights(flightResponse);
        setFlightNumber("");
        setOrigin("");
        setDestination("");
        setIsAddFlightFormVisible(false);
      }

      // checks for an ok status on the response
      // if the status is ok, will async call the getFlights()
      // store the new flight data received from the server in the flightResponse variable, when a call is made to getFlights()
      // set the state value of flights to flightResponse, since flightResponse stores data received from the Spring server.
      // reset the form inputs to an empty string, clearing the form for flightNumber, origin, and destination.
      // hides the add flight drop-down once the form has been submitted.
    } catch (error) {
      console.error("Error adding flight info:", error);
    }

    // catches any errors made during the try/block and logs errors to the console
  };

  // Add methods for updating and deleting customers

  const handleUpdate = async (id) => {
    const flightPayload = { id, flightNumber, origin, destination };

    // creates a new flight object called flightPayload which takes in an ID, flightNumber, origin, and destination data
    // console.log("flightPayload", flightPayload);
    try {
      const resp = await fetch(`http://localhost:8080/flights/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightPayload),
      });

      // makes an HTTP PUT request. this is similar to the POST request above to the url, but the URL takes in an ID property to update a
      // specific flight endpoint using the Fetch API
      // method is a PUT request which will update the existing flight object with new data.
      // the body will convert the flightPayload object into JSON.

      if (!resp.ok) {
        throw new Error("Failed to update customer details");
      }

      // if the response status is not ok. an error will be thrown displaying to the console that the flight object cannot be updated

      if (resp.ok) {
        const flightResponse = await getFlights();
        setFlights(flightResponse);
        setId("");
        setFlightNumber("");
        setOrigin("");
        setDestination("");
        setIsEditFlightFormVisible(false);
      }

      // if the response is okay
      // will make an async call the getFlights()
      // store the updated data received from the server in the 'flightResponse' variable, when a call is made to getFlights()
      // set the state value of flights to flightResponse, since flightResponse stores data received from the Spring server.
      // reset the form inputs, except for ID, since the ID is uniquely generated each time using UUID.
      // hides the update form content once the form has been submitted.
    } catch (error) {
      console.error("Error updating flight details:", error);
    }
    // catches any errors made during the try/block and logs errors to the console
  };

  const deleteFlight = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/flights/${id}`, {
        method: "DELETE",
      });

      // we set the response variable to fetch the request from the server at URL and pass in the id for a specific flight endpoint
      //

      if (response.ok) {
        setFlights(flights.filter((flight) => flight.id !== id));
      } else {
        throw new Error("Failed to delete flight");
      }
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  const getFlights = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/flights`);
      const body = await resp.json();
      return body;
    } catch (error) {
      console.error("Error getting flights", error);
    }
  };

  // GET-FLIGHTS
  // create a response which fetches the URL from the Spring backend
  // create a body which returns a JSON response.
  // we return the body back from the Spring backend as JSON.

  useEffect(() => {
    const fetchData = async () => {
      const flightResponse = await getFlights();
      setFlights(flightResponse);
    };
    fetchData();
  }, []);

  const handleSearchFlights = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.flightNumber.toUpperCase().includes(searchQuery.toUpperCase()) ||
      flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.origin.toUpperCase().includes(searchQuery.toUpperCase()) ||
      flight.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.destination.toUpperCase().includes(searchQuery.toUpperCase())
  );

  return (
    <>
      <h2>Flight Info</h2>
      <div className="drop-wrapper">
        <button type="button" className="button-2" onClick={saveFlight}>
          Add Flight Details
        </button>
        {isAddFlightFormVisible && (
          <div className="dropdown-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="flightNumber">Flight Number</label>
              <input
                type="text"
                id="flightNumber"
                value={flightNumber}
                onChange={handleFlightNumber}
              />
              <br />
              <label htmlFor="origin">Origin</label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={handleOrigin}
              />
              <br />
              <label htmlFor="destination">Destination:</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={handleDestination}
              />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>

      <div className="table-wrapper-flight">
        <div className="search-bar">
          <input
            type="text"
            className="search-input-1"
            placeholder="Search By Flight Number, Origin or Destination"
            value={searchQuery}
            onChange={handleSearchFlights}
          />
        </div>
        <table className="table-2-flight">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Flight Number</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterFlights?.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.flightNumber}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>
                  <button
                    type="btn-2"
                    onClick={() => updateFlightDetails(flight.id)}
                  >
                    Update Flight
                  </button>
                  <button type="btn-3" onClick={() => deleteFlight(flight.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditFlightFormVisible && (
          <div>
            <div>
              <div>
                <form>
                  <label>Update Flight Info:</label>
                  <br />
                  <label htmlFor="name">Flight Number: </label>
                  <input
                    type="text"
                    id="flightNumber"
                    value={flightNumber}
                    onChange={handleFlightNumber}
                  />
                  <br />
                  <label htmlFor="email">Origin: </label>
                  <input
                    type="text"
                    id="origin"
                    value={origin}
                    onChange={handleOrigin}
                  />
                  <br />
                  <label htmlFor="email">Destination: </label>
                  <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={handleDestination}
                  />
                </form>
              </div>
              <button type="submit" onClick={() => handleUpdate(id)}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightPage;

// Return

// Drop-Down <div className="drop-wrapper"></div>
// 1. The return statement has a div element called drop-wrapper. This displays a
// 2. drop-down form when a user clicks a button "Add Flight Details".
// 3. the button calls a function "saveFlight"
// 4. saveFlight toggles the state of isAddFlightFormVisible between true and false boolean properties.
// 5. when the button is clicked with the onClick() attribute.
// 6. The isAddFlightFormVisible is a variable which renders the
// 7. form content if the state variable returns true
// 8. the div content is displayed based on the conditional rendering of 'isAddFlightFormVisible'
// 9. the 'form onSubmit' function will handle the form when it has been submitted
// 10. and calls the handleSubmit function with onSubmit={handleSubmit}
// 11. the label for the input field is "flightNumber".
// 12. updates the state value of flightNumber, based on the onChange function of onChange={handleFlightNumber}
// 13. similar to previous input fields of origin and destination

// Table Content <div className="table-wrapper"
// 1. This is a table which displays the flight information
// 2. Maps over an array of flights and renders rows on the table <tr></tr> based on the properties of the array
// 3. Creates a unique key based on the flight id of the table
// 4. Displays the flightNumber data info inside the table {flight.flightNumber}
// 5. Displays the origin, and destination data into inside the table {flight.origin}
// 6. the Update Flight button calls the updateFlightDetails function and passes in the flight ID as an onClick event.
// 7. the Delete button calls the deleteFlight function and passes in the flight ID as an onClick event.
// 8. if the is EditFlightFormIsVisible is true, then the form content is displayed. Based on the updateFlightDetails function being called.
// 9. the form allows a user to update the flight details based on the flight ID when the form is submitted.
// 10. form submission on Save button is based on handleUpdate() function being called
