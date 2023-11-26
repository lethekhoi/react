import React, { useState } from "react";

import "./App.css";
import { useNavigate } from "react-router-dom";

const AddSchedule = () => {

  const navigate = useNavigate();
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    // const newContact = {
    //   id: nanoid(),
    //   fullName: addFormData.fullName,
    //   address: addFormData.address,
    //   phoneNumber: addFormData.phoneNumber,
    //   email: addFormData.email,
    // };

    // const newContacts = [...contacts, newContact];
    // setContacts(newContacts);
    navigate("/list");
  };
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };



  return (
    <div color="red">
      <h2>Add a new Course</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="coursrName"
          required="required"
          placeholder="Enter Course Name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="trainingType"
          required="required"
          placeholder="Enter Training Type..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="classType"
          required="required"
          placeholder="Enter Class Type..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="classInfo"
          required="required"
          placeholder="Enter Class Info..."
          onChange={handleAddFormChange}
        />

        <button type="submit">Add</button>
      </form>


    </div>
  );
};
export default AddSchedule;