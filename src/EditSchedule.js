import React, { useRef, useState, useEffect } from "react";
import axios from './api/axios';
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
const LOGIN_URL = 'http://localhost:8080/schedules';
const url = 'http://localhost:8080/user/schedules';
const EditSchedule = () => {
  const [contact, setContact] = useState('');
  const location = useLocation();
  var id = location.state.id
  console.log("edit id", id)
  const token = localStorage.getItem('jsonwebtoken')
  console.log("token", token);

  const errRef = useRef();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    fetchInfo();

  }, []);

  async function fetchInfo() {
    await axios
      .get(url + `/${id}`, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
          "mode": "no-cros",
          'Authorization': 'Bearer ' + token,
        },
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        setContact(res.data);
        setDetails(res.data.listDetails[0])
        console.log("startTime",)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [trainingType, setTrainingTypeValue] = useState(location.state.trainingType);
  const [classType, setClassTypeValue] = useState(location.state.classType);
  const [addFormData, setAddFormData] = useState({
    courseName: "",
    classInfo: "",
    trainerName: "",
    startTime: "",
    endTime: "",
  });


  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jsonwebtoken')
    try {
      const newDetail = {
        trainerName: addFormData.trainerName,
        startTime: addFormData.startTime,
        endTime: addFormData.endTime,
      }
      const newDetails = [...details, newDetail];
      setDetails(newDetails)
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({
          courseName: addFormData.courseName,
          classInfo: addFormData.classInfo,
          trainingType: "Monthly",
          classType: "Zoom",
          listDetails: newDetails

        }),
        {
          headers: {
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            "mode": "no-cros",
            'Authorization': 'Bearer ' + token,
          },
          withCredentials: true
        }
      );

  


      navigate("/list");
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }





  };
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  const handleCancel = () => {
    navigate("/list");
  }



  return (
    <div color="red">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2 align="center" >Edit Course Schedule</h2>
      <form onSubmit={handleEditFormSubmit}>
        <div>
          <div align="left" className="float-left">Course Name</div>
          <input
            defaultValue={contact.courseName}
            type="text"
            name="courseName"
            required="required"
            placeholder="Enter Course Name..."
            onChange={handleAddFormChange}
          />
        </div>

        <div>
          <div align="left" className="float-left">Traning Type</div>
          <div align="left" className="float-left">
            <select onChange={event => setTrainingTypeValue(event.target.value)}
              defaultValue={trainingType}>
              <option value="Monthly">Monthly</option>
              <option value="T&S">T&S</option>
              <option value="Ad-hoc">Ad-hoc</option>
            </select>
          </div>

        </div>

        <div>
          <div align="left" className="float-left">Class Type</div>
          <div align="left" className="float-left">
            <select onChange={event => setClassTypeValue(event.target.value)}
              defaultValue={classType}>
              <option value="Zoom">Zoom</option>
              <option value="Room">Room</option>

            </select>
          </div>

        </div>

        <div>
          <div align="left" className="float-left">Class Info </div>
          <input
            defaultValue={contact.classInfo}
            type="text"
            name="classInfo"
            required="required"
            placeholder="Enter Class Info..."
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <div align="left" className="float-left">Trainer Name</div>
          <input
            defaultValue={details.trainerName}
            type="text"
            name="trainerName"
            required="required"
            placeholder="Enter Trainer Name..."
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <div align="left" className="float-left">Start Time </div>
          <input
            defaultValue={moment(details.startTime).format("YYYY-MM-DDTkk:mm")}
            type="datetime-local"
            name="startTime"
            required="required"
            placeholder="Enter Class Info..."
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <div align="left" className="float-left">End Time </div>
          <input
            defaultValue={moment(details.endTime).format("YYYY-MM-DDTkk:mm")}
            type="datetime-local"
            name="endTime"
            required="required"
            placeholder="Enter Class Info..."
            onChange={handleAddFormChange}
          />
        </div>


        <button type="submit">Edit</button>

        <button onClick={handleCancel}>Cancel</button>
      </form>


    </div>
  );
};
export default EditSchedule;