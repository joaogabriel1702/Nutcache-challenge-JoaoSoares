import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import api from '../../Services/Api';
import moment from 'moment';

interface IEmployee{
  ID: number;
  Name: String;
  Email: String;
  Start_Date: Date;
  Team: DropdownItem;
}

  const Employee: React.FC = () => {
  const  [ employee, setEmployee ] = useState<IEmployee[]>([]);

  useEffect(() => {
    loademployee();
  }, []);

  async function loademployee() {
    const response = await api.get('/empregados');
    console.log(response);
    setEmployee(response.data);
    }
    
    function formateDate(date: Date){
      return moment(date).format("DD/MM/YYYY")
    }

  return (
    <div className="container">
      <br />
      <h1> Employees </h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>Team</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr key={employee.ID}>
              <td>{employee.ID}</td>
              <td>{employee.Name}</td>
              <td>{employee.Email}</td>
              <td>{formateDate(employee.Start_Date)}</td>
              <td>{employee.Team}</td>
              <td>
                <Button size="sm" variant="info">
                  Edit
                </Button>{' '}
                <Button size="sm" variant="danger">
                  Delete
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employee;
