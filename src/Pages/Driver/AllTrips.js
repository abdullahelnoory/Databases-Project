import "./AllTrips.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import DataTable, { createTheme } from "react-data-table-component";
function AllTrips() {
  // let [reqState, setReqState] = useState(false);


  let tripData = {
    Accept: false, // mean accept and start if false mean reject if true means accept and start
    Time: 1,
    id: 0,
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.Source,
    },
    {
      name: "Destination",
      selector: (row) => row.Destination,
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      maxWidth: "100px",
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },

    // {
    //   name: "Accept",
    //   maxWidth: "100px",
    //   cell: (row) => (
    //     <button
    //       className="butt1"
    //       //   onClick={() => console.log(`Button clicked for ${row.name}`)}
    //       onClick={() => setTripState({ ...tripState, Accept: true })}
    //       style={{
    //         padding: "5px 10px",
    //         color: "white",
    //         border: "none",
    //         borderRadius: "4px",
    //         cursor: "pointer",
    //       }}
    //     >
    //       Accept
    //     </button>
    //   ),
    //   ignoreRowClick: true, // Prevents row click events when button is clicked
    //   allowOverflow: true, // Allows the button to overflow if needed
    //   button: true, // Identifies the column as a button
    // },
    {
      name: "Reject",
      maxWidth: "100px",
      cell: (row) => (
        <button
          className="butt"
          onClick={(event) => HandleReject(row, event)}
          style={{
            padding: "5px 10px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reject
        </button>
      ),
      ignoreRowClick: true, // Prevents row click events when button is clicked
      allowOverflow: true, // Allows the button to overflow if needed
      button: true, // Identifies the column as a button
    },
    {
      name: "Start",
      maxWidth: "100px",
      cell: (row) => (
        <button
          className="butt1"
          onClick={() => HandleStart(row)}
          style={{
            padding: "5px 10px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Start Trip
        </button>
      ),
      ignoreRowClick: true, // Prevents row click events when button is clicked
      allowOverflow: true, // Allows the button to overflow if needed
      button: true, // Identifies the column as a button
    },
    {
      name: "EstimatedTime (hr)",
      // selector: (row) => row.EstimatedTime,
      minWidth: "150px",
      cell: (row) => (
        <input
          value={row.Time}
          // value={tripState.Time}
          onChange={(event) => HandleTime(event, row)}
          //   setTripState({ ...tripState, Time: event.target.value })
          // }
          className="expectime"
          type="number"
          id="expecTime"
          name="quantity"
          min="1"
          max="24"
        ></input>
      ),
      ignoreRowClick: true, // Prevents row click events when button is clicked
      allowOverflow: true, // Allows the button to overflow if needed
      button: true, // Identifies the column as a button
    },
  ];

  //   const data = [
  //     {
  //       id: 1,
  //       ID: 12,
  //       Source: "yousef1",
  //       Destination: "Nsoo7y1",row
  //     },
  //     {
  //       id: 2,
  //       ID: 122,
  //       Source: "yousef2",
  //       Destination: "Nsoo7y2",
  //     },
  //     {
  //       id: 3,
  //       ID: 3,
  //       Source: "yousef3",
  //       Destination: "Nsoo7y3",
  //     },
  //     {
  //       id: 4,
  //       ID: 124,
  //       Source: "yousef1",
  //       Destination: "Nsoo7y1",
  //     },
  //     {
  //       id: 5,
  //       ID: 1222,
  //       Source: "yousef2",
  //       Destination: "Nsoo7y2",
  //     },
  //     {
  //       id: 6,
  //       ID: 6,
  //       Source: "yousef3",
  //       Destination: "Nsoo7y3",
  //     },
  //     {
  //       id: 7,
  //       ID: 7,
  //       Source: "yousef1",
  //       Destination: "Nsoo7y1",
  //     },
  //     {
  //       id: 8,
  //       ID: 8,
  //       Source: "yousef2",
  //       Destination: "Nsoo7y2",
  //     },
  //     {
  //       id: 9,
  //       ID: 9,
  //       Source: "yousef3",
  //       Destination: "Nsoo7y3",
  //     },
  //     {
  //       id: 10,
  //       ID: 10,
  //       Source: "yousef1",
  //       Destination: "Nsoo7y1",
  //     },
  //     {
  //       id: 11,
  //       ID: 11,
  //       Source: "yousef2",
  //       Destination: "Nsoo7y2",
  //     },
  //     {
  //       id: 12,
  //       ID: 12,
  //       Source: "yousef3",
  //       Destination: "Nsoo7y3",
  //     },
  //     {
  //       id: 13,
  //       ID: 13,
  //       Source: "yousef1",
  //       Destination: "Nsoo7y1",
  //     },
  //     {
  //       id: 14,
  //       ID: 14,
  //       Source: "yousef2",
  //       Destination: "Nsoo7y2",
  //     },
  //     {
  //       id: 15,
  //       ID: 15,
  //       Source: "yousef3",
  //       Destination: "Nsoo7y3",
  //     },
  //   ];

  let [recievedData, setRecievedData] = useState([]);

  function HandleTime(event, Row) {
    const filteredData = recievedData.map((row) => {
      if (row.id === Row.id) row.Time = event.target.value;
      return row;
    });

    console.log(filteredData);
    setRecievedData(filteredData);
  }

  function HandleStart(Row, event) {
    console.log(event);
    const filteredData = recievedData.filter((row) => row.id !== Row.id); // Filter out the row by id
    // send data to back
    tripData.Accept = true;
    tripData.Time = Row.Time;
    tripData.id = Row.id;
    handleTrip(tripData);
    setRecievedData(filteredData); // Update state to remove the deleted row
  }
  function HandleReject(Row) {
    console.log(Row);
    const filteredData = recievedData.filter((row) => row.id !== Row.id); // Filter out the row by id
    // send data to back
    tripData.Accept = false;
    tripData.Time = 0;
    tripData.id = Row.id;
    handleTrip(tripData);
    setRecievedData(filteredData); // Update state to remove the deleted row
  }

  const handleTrip = async (sendData) => {
    try {
      const result = await fetch("http://localhost:3001/Trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const resultInjson = await result.json();
      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get("http://localhost:3000/Trips");
        //npm install -g json-server
        //& "C:\Users\Jo\AppData\Roaming\npm\json-server.cmd" db.json& "C:\Users\Jo\AppData\Roaming\npm\json-server.cmd" db.json

        // console.log(result.data);
        // const jsonResult = await result.json;
        setRecievedData(result.data);
        console.log(recievedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // const HandleLost = async () => {
  //   setReqState(true);
  // };

 

  // createTheme creates a new theme named solarized that overrides the build in dark theme
  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );
  // createTheme('dark', {
  //   background: {
  //     default: 'transparent',
  //   },
  // });

  //   const ExpandedComponent = ({ data }) => (
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   );



  return (
    <div style={{ height: "fit-content" }}>
      <div className="containerrr">
        {/* <input type="text"></input> */}

        <DataTable
          style={{ zIndex: "1" }}
          title="Trips"
          columns={columns}
          data={recievedData}
          theme="solarized"
          // selectableRows
          fixedHeader
          pagination
          //   expandableRows
          //   expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  );
}

export default AllTrips;
