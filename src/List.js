import React, { useState, useEffect, Fragment } from "react";
import axios from './api/axios';
import "./App.css";
import { useNavigate } from "react-router-dom";
import ReadOnlyRow from "./components/ReadOnlyRow";
// import EditableRow from "./components/EditableRow";

const App = () => {
  const url = "http://localhost:8080/schedules";
  const urlDelete = "http://localhost:8080/admin/schedules";
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem('jsonwebtoken')
  console.log("token", token);
  const navigate = useNavigate();


  const fetchInfo = async () => {
    const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
    console.log("res", res)
    const d = await res.json();
    return setContacts(d);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  // const handleAddFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setAddFormData(newFormData);
  // };

  // const handleEditFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...editFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setEditFormData(newFormData);
  // };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    navigate("/addSchedule");
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, schedule) => {
    event.preventDefault();
    setEditContactId(schedule.id);
    console.log("Edit", schedule.id)
    console.log("training Type", schedule.trainingType)
    navigate("/editSchedule", { state: { id: schedule.id, trainingType:schedule.trainingType, classType:schedule.classType } });

  };

  // const handleCancelClick = () => {
  //   setEditContactId(null);
  // };

  const handleDeleteClick = async (scheduleId) => {
    console.log("token delete:", token);
    const headers = {
      'Authorization': 'Bearer ' + token
    }
    const data = {

    }

    const response = await axios.delete(urlDelete + `/${scheduleId}`, { headers, data });
    console.log("token delete:", response);
    fetchInfo()
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Training Type</th>
              <th>Class Type</th>
              <th>Class Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, id) => (
              <Fragment key={id}>
                {
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                }

                <tr>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Trainer Name</th>
                          <th>From</th>
                          <th>To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contact.listDetails.map((detail) => (
                          <tr key={detail.id}>
                            <td>{detail.trainerName}</td>
                            <td>{detail.startTime}</td>
                            <td>{detail.endTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </Fragment>


            ))}
          </tbody>
        </table>
      </form>

      <form onSubmit={handleAddFormSubmit}>
        <button type="submit">New Course</button>
      </form>
    </div>
  );
};

export default App;