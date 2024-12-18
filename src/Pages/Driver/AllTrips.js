import "./AllTrips.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import DataTable, { createTheme } from "react-data-table-component";
import React from "react";
function AllTrips() {
  let [checkNumPassenger, setCheckNumPassenger] = useState({
    trip_id: null,
    num: null,
  });
  let [validfetches, setValidfetches]=useState(false);
  // let [reqState, setReqState] = useState(false);
  const userssn = sessionStorage.getItem("ssn");
  let tripData = {
    Status: "idle", // mean accept and start if false mean reject if true means accept and start
    estimated_time: 1,
    trip_id: 0,
    d_ssn: userssn,
  };

  const columnsAcceptedTrip = [
    {
      name: "ID",
      selector: (row) => row.trip_id,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.source_station,
    },
    {
      name: "Destination",
      selector: (row) => row.destination_station,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      // maxWidth: "100px",
    },
    {
      name: "Date",

      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "number of passengers",
      selector: (row) =>
        `${row.status === "accepted" ? "" : checkNumPassenger.num}`,
    },
    {
      name: "Start",
      minWidth: "200px",

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
          {row.status === "accepted" ? "pick up people" : "Start trip"}
        </button>
      ),
      ignoreRowClick: true, // Prevents row click events when button is clicked
      allowOverflow: true, // Allows the button to overflow if needed
      button: true, // Identifies the column as a button
    },
    {
      name: "EstimatedTime (hr)",
      selector: (row) => row.estimated_time,
    },
  ];

  const columns = [
    {
      name: "ID",
      selector: (row) => row.trip_id,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.source_station,
    },
    {
      name: "Destination",
      selector: (row) => row.destination_station,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      maxWidth: "100px",
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
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
      name: "Accept",
      maxWidth: "100px",
      cell: (row) => (
        <button
          className="butt1"
          onClick={() => HandleAccept(row)}
          style={{
            padding: "5px 10px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Accept Trip
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
          value={row.estimated_time}
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

useEffect(() => {
  console.log(checkNumPassenger)

      const fetchData = async () => {
      try {
        const result = await fetch(
          "http://localhost:6969/driver/get-passengers-number",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ trip_id: checkNumPassenger.trip_id }),
          }
        );
        const resultInjson = await result.json();
        console.log(resultInjson);
        setCheckNumPassenger({...checkNumPassenger, num: resultInjson.data.count})
      } catch (error) {
        console.error(error);
      }
    };

    if(validfetches === true)
      fetchData();
    else return;

  }, [checkNumPassenger]);



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
  let [recievedAcceptedData, setRecievedAcceptedData] = useState([]);

  function HandleTime(event, Row) {
    const filteredData = recievedData.map((row) => {
      if (row.trip_id === Row.trip_id)
        if (+event.target.value > 24) row.estimated_time = "24";
        else if (+event.target.value < 0) row.estimated_time = "1";
        else row.estimated_time = event.target.value;
      return row;
    });

    console.log(filteredData);
    setRecievedData(filteredData);
  }

  function HandleAccept(Row) {
    const filteredData = recievedData.filter(
      (row) => row.trip_id !== Row.trip_id
    ); // Filter out the row by id
    // send data to back
    tripData.Status = "accepted";
    tripData.estimated_time = Row.estimated_time;
    tripData.trip_id = Row.trip_id;
    handleAcceptTrip(tripData);
    setRecievedData(filteredData); // Update state to remove the deleted row
    let newData = [...recievedAcceptedData];
    newData.push({ ...Row, status: "accepted" });
    setRecievedAcceptedData(newData);
    console.log(newData);
  }

  const handleStartTrip = async (sendData) => {
    try {
      const result = await fetch("http://localhost:6969/driver/start-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trip_id: sendData.trip_id,
          Status: sendData.Status,
        }),
      });
      const resultInjson = await result.json();
      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleRejectTrip = async (sendData) => {
    try {
      const result = await fetch("http://localhost:6969/driver/reject-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trip_id: sendData.trip_id }),
      });
      const resultInjson = await result.json();
      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  function HandleStart(Row) {
    console.log(recievedAcceptedData);
    let filteredData;
    let flag = false;
    let flag2=false;
    console.log(flag);
    if (Row.status === "accepted") {
      filteredData = recievedAcceptedData.map((row) => {
        if (row.trip_id === Row.trip_id) return { ...row, status: "ongoing" };
        else {
          if (row.status === "ongoing") {
            flag = true;
            console.log(row.trip_id);
          }
        }
          console.log("jjj")
        return { ...row };
      });
      if (!flag) {
        console.log("hi");
        console.log(recievedAcceptedData);
        // Filter out the row by 
        setValidfetches(true);
        setCheckNumPassenger({
          ...checkNumPassenger,
          trip_id: Row.trip_id,
        });
        tripData.Status = "ongoing";
      }
    } else {
      filteredData = recievedAcceptedData.filter(
        (row) => row.trip_id !== Row.trip_id
      ); // Filter out the row by id
      tripData.Status = "started";
      setValidfetches(false);
      setCheckNumPassenger({
        ...checkNumPassenger,
        trip_id: null,
      });
    }
    // Filter out the row by id
    // send data to back
    if (!flag) {
      // tripData.Status=Row.status;
      tripData.trip_id = Row.trip_id;
      handleStartTrip(tripData);
      setRecievedAcceptedData(filteredData);
     // Update state to remove the deleted row
    }
  }

  function HandleReject(Row) {
    console.log(Row);
    const filteredData = recievedData.filter(
      (row) => row.trip_id !== Row.trip_id
    ); // Filter out the row by id
    // send data to back
    tripData.Status = "rejected";
    tripData.estimated_time = 0;
    tripData.trip_id = Row.trip_id;
    handleRejectTrip(tripData);
    setRecievedData(filteredData); // Update state to remove the deleted row
  }

  const handleAcceptTrip = async (sendData) => {
    try {
      const result = await fetch("http://localhost:6969/driver/accept-trip", {
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
        const result = await fetch("http://localhost:6969/driver/get-trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ d_ssn: userssn }),
        });
        const resultInjson = await result.json();
        console.log(resultInjson);
        setRecievedData(resultInjson.tripsidle);
        setRecievedAcceptedData(resultInjson.tripsaccepted);
        resultInjson.tripsaccepted.map((ele)=>{
          if(ele.status === "ongoing")
          {
            setValidfetches(true);
            setCheckNumPassenger({...checkNumPassenger,trip_id:ele.trip_id});
          }
          return {...ele}
        },)


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
      <div className="containerrr">
        <DataTable
          style={{ zIndex: "1" }}
          title="Accepted Trips"
          columns={columnsAcceptedTrip}
          data={recievedAcceptedData}
          theme="solarized"
          // selectableRows
          fixedHeader
          //   expandableRows
          //   expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  );
}

export default AllTrips;
