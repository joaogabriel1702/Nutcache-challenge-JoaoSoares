import { ChangeEvent, useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import api from '../Services/Api';

const EditForm = () => {
  interface INewEmployee {
    name: string;
    birthDate: Date;
    gender: Dropdown;
    email: string;
    cpf: number;
    start_date: Date;
    team: Dropdown;
  }

  const [model, setModel] = useState<INewEmployee[]>([]);
  const { REACT_APP_API_KEY: API_KEY } = process.env;

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await api.post(`${API_KEY}/nutemployee`, model);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Name *</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birth Date *</Form.Label>
        <Form.Control type="date" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gender *</Form.Label>
        <Form.Control as="select" defaultValue="others">
          <option>Others</option>
          <option>Male</option>
          <option>Female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email *</Form.Label>
        <Form.Control type="email" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>CPF *</Form.Label>
        <Form.Control type="number" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Date *</Form.Label>
        <Form.Control type="date" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Team</Form.Label>
        <Form.Control as="select" defaultValue="None">
          <option>None</option>
          <option>Mobile</option>
          <option>frontEnd</option>
          <option>BackEnd</option>
        </Form.Control>
      </Form.Group>

      <Button variant="success" type="submit" block>
        Add new employee
      </Button>
    </Form>
  );
};

export default EditForm;
