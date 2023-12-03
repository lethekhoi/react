import React, { useState, useEffect, Fragment } from "react";
import axios from './api/axios';
import "./App.css";
import { useNavigate } from "react-router-dom";
import ReadOnlyRow from "./components/ReadOnlyRow";
import Header1 from "./Header1";
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
    navigate("/editSchedule", {
       state: { 
        id: schedule.id, 
        trainingType: schedule.trainingType, 
        classType: schedule.classType ,
        details:schedule.listDetails[0]
        
      } });

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

    <div>
      <Header1/>
      <div className="App">
      <h1 >Course Management System</h1>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Training Type</th>
                <th>Class Type</th>
                <th>Class Info</th>
                <th>Trainer Name</th>
                <th>Start Time</th>
                <th>End Time</th>
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

                </Fragment>


              ))}
            </tbody>
          </table>
        </form>

        <form onSubmit={handleAddFormSubmit}>
          <button type="submit">New Course</button>
        </form>
      </div>
    </div>
  );
};

export default App;