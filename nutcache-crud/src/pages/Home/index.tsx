import React, { useState, useEffect, createContext } from 'react';
import { Table, Button, Row, Col, Modal } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import api from '../../Services/Api';
import moment from 'moment';
import './index.css';
import AddForm from '../../components/AddForm';
import EditForm from '../../components/EditForm';

interface IEmployee {
  _id: number;
  name: String;
  email: String;
  start_date: Date;
  team: DropdownItem;
}

const Employee: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
  const { REACT_APP_API_KEY: API_KEY } = process.env;

  const [show, setShow] = useState(false);
  const handleShowAdd = () => setShow(true);
  const handleCloseAdd = () => setShow(false);
  
  useEffect(() => {
    loademployeeList();
  }, []);
  useEffect(() => {
    setEmployeeList(employeeList);
  }, [employeeList]);

  async function loademployeeList() {
    const response = await api.get(`${API_KEY}/nutemployee`);
    console.log(response.data);
    setEmployeeList(response.data);
  }

  async function deleteEmployee(_id: number) {
    const response = await api.delete(`${API_KEY}/nutemployee/${_id}`);
    const newEmployeers = employeeList.filter((e) => _id !== e._id);
    setEmployeeList(newEmployeers);
  }

  function formateDate(date: Date) {
    return moment(date).format('MM/YYYY');
  }

  return (
    <Col className="container">
      <br />
      <Row>
        <h1 className="listTitle">List of Employees </h1>
        <Button
          onClick={handleShowAdd}
          className="createEmployeeButton"
          data-toggle="modal"
        >
          Add Employee
        </Button>
      </Row>
      <br />
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Start Date</th>
              <th>Team</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{formateDate(employee.start_date)}</td>
                <td>{employee.team}</td>
                <td>
                  <Button size="sm" variant="info">
                    Edit
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </Button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Add employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseAdd} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Col>
  );
};

export default Employee;
