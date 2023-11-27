import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { useNavigate } from "react-router-dom";

const AddSchedule = () => {
  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const [addFormData, setAddFormData] = useState({
    coursrName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newSchedule = {
      id: nanoid(),
      coursrName: addFormData.coursrName,
      classInfo: addFormData.classInfo,
      startTime: addFormData.startTime,
      endTime: addFormData.endTime,
    };

    const newSchedules = [...schedules, newSchedule];
    setSchedules(newSchedules);
    console.log("newSchedules", newSchedules);
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
      <h2  align="center" >Add a new Course</h2>
      <form onSubmit={handleAddFormSubmit}>
        <div>
          <div align="left" class="float-left">Course Name</div>
          <input
            type="text"
            name="coursrName"
            required="required"
            placeholder="Enter Course Name..."
            onChange={handleAddFormChange}
          />
        </div>

        <div>
          <div align="left" class="float-left">Traning Type</div>
          <div align="left" class="float-left">
            <select >
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

        </div>

        <div>
          <div align="left" class="float-left">Class Type</div>
          <div align="left" class="float-left">
            <select label="Class Type">
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

        </div>

        <div>
          <div align="left" class="float-left">Class Info </div>
          <input
            type="text"
            name="classInfo"
            required="required"
            placeholder="Enter Class Info..."
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <div align="left" class="float-left">Trainer Name</div>
          <input
            type="text"
            name="trainerName"
            required="required"
            placeholder="Enter Trainer Name..."
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <div align="left" class="float-left">Start Time </div>
          <input
            type="datetime-local"
            name="startTime"
            required="required"
            placeholder="Enter Class Info..."
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <div align="left" class="float-left">End Time </div>
          <input
            type="datetime-local"
            name="endTime"
            required="required"
            placeholder="Enter Class Info..."
            onChange={handleAddFormChange}
          />
        </div>


        <button type="submit">Add</button>
      </form>


    </div>
  );
};
export default AddSchedule;