import React from 'react';
import { useLocation } from 'react-router-dom';
import './learnerperformance.css';

const LearnerPerformance = () => {
  const location = useLocation();
  const learnerData = location.state?.learnerData; // Access learner data passed via state

  if (!learnerData || learnerData.length === 0) {
    return <div>No data available</div>;
  }

  const learnerInfo = learnerData[0]; // Assuming all rows belong to the same learner

  return (
  <>
    <div className="learner-performance">
      <h1 className="table-title">Learner Information</h1>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Learner Name</th>
              <th>Batch Name</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{learnerInfo.StudentName}</td>
              <td>{learnerInfo.Batch}</td>
              <td>{learnerInfo.RollNo}</td>
              <td>{learnerInfo.Password}</td>
            </tr>
          </tbody>
        </table>
       </div>

      <h1 className="table-title">Learner Performance</h1>
      <div className="table-container1">
        <table className="custom-table1">
          <thead>
            <tr>
              <th>Exam Date</th>
              <th>Test Name</th>
              <th>Batch</th>
              <th>Phy</th>
              <th>Chem</th>
              <th>Math</th>
              <th>Total</th>
              <th>%AGE</th>
              <th>Rank</th>
              <th>Max. Marks</th>
            </tr>
          </thead>
          <tbody>
            {learnerData.map((learner, index) => (
              <tr key={index}>
                <td>{learner['Exam Date']}</td>
                <td>{learner['Test Name']}</td>
                <td>{learner.Batch}</td>
                <td>{learner.Phy}</td>
                <td>{learner.Chem}</td>
                <td>{learner.Math}</td>
                <td>{learner.Total}</td>
                <td>{learner['%AGE']}</td>
                <td>{learner.Rank}</td>
                <td>{learner['Max. Marks']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
 
};


export default LearnerPerformance;
