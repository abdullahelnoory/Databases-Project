import "../Styles/Signup.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import imag from "../images/SwiftRoute.png";


function RegisterPage() {
  const history = useHistory();

  const [formInput, setFormInput] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    job: "Passenger",
    age: "", 
    ssn: "",
    carDetails: {
      car_license: "",
      number_of_seats: "",
      air_conditioning: false,
      car_type: "",
      additional_price: "",
    },
  });

  const [error, setError] = useState("");
  const roles = ["Admin", "Passenger", "Manager", "Driver"];


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      history.push("/");
    }
  }, [history]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name.startsWith("carDetails.")) {
      const carField = name.split(".")[1];
      setFormInput({
        ...formInput,
        carDetails: {
          ...formInput.carDetails,
          [carField]: type === "checkbox" ? checked : value
        },
      });
    } else {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formInput.password !== formInput.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:6969/accounts/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInput),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setError("An error occurred. Please try again later.");
    }
  };


  return (
    <div id="RegisterPage">
      <form id="Register_box" onSubmit={handleSubmit}>
        <img src={imag} alt="Swift Route Logo" className="logo" />
        <h2>Sign Up</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="input-container">
          <input
            type="text"
            name="fname"
            value={formInput.fname}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="mname"
            value={formInput.mname}
            onChange={handleChange}
            placeholder="Middle Name"
          />
          <input
            type="text"
            name="lname"
            value={formInput.lname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="confirmPassword"
            value={formInput.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="job">Role:</label>
          <select
            id="job"
            name="job"
            value={formInput.job}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {formInput.job === "Passenger" && (
          <div className="input-container">
            <input
              type="number"
              name="age"
              value={formInput.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
        )}

        {(formInput.job === "Admin" || formInput.job === "Manager" || formInput.job === "Driver") && (
          <div className="input-container">
            <input
              type="text"
              name="ssn"
              value={formInput.ssn}
              onChange={handleChange}
              placeholder="SSN"
              required
            />
          </div>
        )}

        {formInput.job === "Driver" && (
          <div className="carDetails">
            <h3>Car Details</h3>
            <input
              type="text"
              name="carDetails.car_license"
              value={formInput.carDetails.car_license}
              onChange={handleChange}
              placeholder="Car License"
              required
            />
            <input
              type="number"
              name="carDetails.number_of_seats"
              value={formInput.carDetails.number_of_seats}
              onChange={handleChange}
              placeholder="Number of Seats"
              required
            />
            <input
              type="checkbox"
              name="carDetails.air_conditioning"
              checked={formInput.carDetails.air_conditioning}
              onChange={handleChange}
            />
            <label>Air Conditioning</label>
            <input
              type="text"
              name="carDetails.car_type"
              value={formInput.carDetails.car_type}
              onChange={handleChange}
              placeholder="Car Type"
            />
            <input
              type="text"
              name="carDetails.additional_price"
              value={formInput.carDetails.additional_price}
              onChange={handleChange}
              placeholder="Additional Price"
            />
          </div>
        )}

        <div className="submit-button-container">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
