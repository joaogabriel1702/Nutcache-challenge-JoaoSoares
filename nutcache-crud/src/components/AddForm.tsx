import { ChangeEvent, useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import api from '../Services/Api';
import { useHistory } from 'react-router-dom';

const AddForm = (props: any) => {
  const history = useHistory();

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

  const [name, setName] = useState(' ');
  const [birthDate, setBirthDate] = useState(' ');
  const [gender, setGender] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [cpf, setCpf] = useState(' ');
  const [start_date, setStart_date] = useState(' ');
  const [team, setTeam] = useState(' ');

  const addEmployee = async (event: any) => {
    event?.preventDefault();
    const body = {
      name,
      birthDate,
      gender,
      email,
      cpf,
      start_date,
      team,
    };
    console.log(model);
    const response = await api.post(`${API_KEY}/nutemployee/`, body);
    console.log(response.data);

    return (window.location.href = '/');
  };

  return (
    <Form onSubmit={(event) => addEmployee(event)}>
      <Form.Group>
        <Form.Label>Name *</Form.Label>
        <Form.Control
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birth Date *</Form.Label>
        <Form.Control
          type="date"
          required
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value as any)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gender *</Form.Label>
        <Form.Control
          as="select"
          defaultValue="Others"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Others">Others</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>CPF *</Form.Label>
        <Form.Control
          type="number"
          required
          value={cpf}
          onChange={(e) => setCpf(e.target.value.toString())}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Date *</Form.Label>
        <Form.Control
          type="date"
          required
          value={start_date}
          onChange={(e) => setStart_date(e.target.value as any)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Team</Form.Label>
        <Form.Control
          as="select"
          defaultValue="None"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Mobile">Mobile</option>
          <option value="Frontend">frontEnd</option>
          <option value="Backend">BackEnd</option>
        </Form.Control>
      </Form.Group>

      <Button variant="success" type="submit" block>
        Add new employee
      </Button>
    </Form>
  );
};

export default AddForm;
