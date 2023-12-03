import React from "react";
import moment from "moment/moment";
const ReadOnlyRow = ({ contact: course, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{course.courseName}</td>
      <td>{course.trainingType}</td>
      <td>{course.classType}</td>
      <td>{course.classInfo}</td>
      <td>{course.listDetails[0].trainerName}</td>
      <td>{moment(course.listDetails[0].startTime).format("YYYY-MM-DDThh:mm")}</td>
      <td>{moment(course.listDetails[0].endTime).format("YYYY-MM-DDThh:mm")}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, course)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(course.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;