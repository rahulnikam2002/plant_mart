// components/CustomerTable.js

import React from 'react';
import { AiOutlineUser } from 'react-icons/ai'; // Import the User icon from react-icons


const CustomerTable = ({ customers }) => {
  return (
    <div className="customer-table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th className="table-cell rounded-left th-header">Name▼</th>
            <th className="table-cell th-header">Email▼</th>
            <th className="table-cell th-header">Phone Number▼</th>
            <th className="table-cell rounded-right th-header">Gender▼</th>
            <th className="table-cell"></th> {/* New column for the dots */}
          </tr>
        </thead>
         <tbody>
          {customers.map((customer, index) => (
            <React.Fragment key={index}>
              <tr className="table-row white-row">
                <td className="table-cell rounded-left">
                <span className="profile-icon">
                    <AiOutlineUser /> {/* Add the User icon */}
                  </span>
                  {customer.name}
                  </td>
                <td className="table-cell">{customer.email}</td>
                <td className="table-cell">{customer.phoneNumber}</td>
                <td className="table-cell">
                  <span
                    className={`gender-box ${customer.gender === 'Male' ? 'male' : 'female'}`}
                  >
                    {customer.gender}
                  </span>
                </td>
                <td className="table-cell rounded-right">
                  <span className="dots">{'...'}</span>
                </td>
              </tr>
              <tr className="table-row gray-row">
                <td className="table-cell rounded-left" colSpan="5"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody> 
      </table>

      <style jsx>{`
        .customer-table-container {
          display: flex;
          justify-content: center;
          margin-top: 20px; /* Add top margin if needed */
        }

        .customer-table {
          background: #F7F7F7; /* Apply background color to the table */
          border-collapse: collapse;
          width: 80%;
        }

        .table-cell {
         padding: 12px 60px 12px; /* Adjust padding-top for centering text vertically */
          flex: 1; 
          /*padding: 15px 30px;*/
          text-align: left;
          border: none;
          vertical-align: top; /* Adjust vertical alignment */
          /* Distribute equal width among cells */
        }
  
        

        .dots {
          font-size: 16px;
          color: #999; /* Color for the dots */
          margin-left: 1px;
          font-weight:bold;
        }

        .white-row {
          background-color: #FCFCFC;
          transition: background-color 0.3s; /* Add a transition for smooth color change */
        }

        .white-row:hover {
          background-color: white; /* Change the background color on hover */
        }

        .gray-row {
          /*background-color: #F1EFEF;*/ /* Gray rows for spacing */
          background-color:#F7F7F7;
          border-bottom: 0px solid transparent; /* Reduce the spacing between rows */
        }

        .rounded-left {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        .rounded-right {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .th-header {
          font-family: 'Montserrat', sans-serif; /* Change 'Your-Font-Family' to the desired font */
          font-size: 12px; /* Change the font size as needed */
          font-weight: normal; /* Add font weight if desired */
        }

        .customer-table th {
          background-color:#F7F7F7; /* Apply background color to table headings */
          text-align: left; /* Align table headings at the start of the row text */
          vertical-align: top; /* Adjust vertical alignment */
        }

        .gender-box {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 8px;
          font-weight: bold;
          text-transform: capitalize;
        }

        .male {
          background-color: #ECF8F9; /* Blue background for Male */
          color: #11009E; /* White text color for Male */
        }

        .female {
          background-color: #FFF5E0; /* Red background for Female */
          color: #9A3B3B; /* White text color for Female */
        }

        .customer-table-container {
          background:#F7F7F7; /* Apply background color to the container */
          padding: 20px; /* Add padding to the container if needed */
        }

        .profile-icon {
          display: inline-flex;
          align-items: center;
          margin-right: 8px; /* Adjust the margin as needed */
        }
        
      `}</style>
    </div>
  );
};

export default CustomerTable;
