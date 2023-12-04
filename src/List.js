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
  const [timeFrame, setTimeFrameValue] = useState('all');
  const token = localStorage.getItem('jsonwebtoken')
  console.log("token", token);
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState();


  const fetchInfo = async () => {
    const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
    console.log("res", res)
    const d = await res.json();
    return setContacts(d);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [, setEditContactId] = useState(null);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    navigate("/addSchedule");
  };
  const handleSearch = (event) => {
    event.preventDefault();
     
   console.log("courseName", courseName)
   console.log("timeFrame", timeFrame)
   console.log("search")
  };
  const handleEditClick = (event, schedule) => {
    event.preventDefault();
    setEditContactId(schedule.id);
    navigate("/editSchedule", {
      state: {
        id: schedule.id,
        trainingType: schedule.trainingType,
        classType: schedule.classType,
        details: schedule.listDetails[0]

      }
    });

  };

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
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;
    setCourseName(fieldValue);
  };

  return (

    <div>
      <Header1 />
      <div >
        <h1 className="float-center">Course Management System</h1>
       
        <container className="search">

          <input className="search-item"
            type="text"
            defaultValue={""}
            name="courseName"
            placeholder="Course Name"
            onChange={handleAddFormChange}
          />
          
            <select className="search-item"  onChange={event => setTimeFrameValue(event.target.value)}
              defaultValue={timeFrame}>
              <option value="all">All</option>
              <option value="nextWeek">Next Week</option>
              <option value="nextMonth">Next Month</option>
              <option value="nextYear">Next Year</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </select>
           
          <button className="search-item" onClick={handleSearch}>Search</button>
        </container >
        <br />

        <div>
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
        </div>

        <div className="float-center" onSubmit={handleAddFormSubmit}>
          <button type="submit">New Course</button>
        </div>


      </div>
    </div>
  );
};

export default App;