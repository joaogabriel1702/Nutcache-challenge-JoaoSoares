import { ChangeEvent, useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import api from '../Services/Api';
import { useHistory } from 'react-router-dom';

const EditForm = (Employee: any) => {
  const history = useHistory();

  interface IEmployee {
    name: string;
    birthDate: Date;
    gender: Dropdown;
    email: string;
    cpf: number;
    start_date: Date;
    team: Dropdown;
  }

  const [model, setModel] = useState<IEmployee[]>([]);
  const { REACT_APP_API_KEY: API_KEY } = process.env;

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await api.post(`${API_KEY}/nutemployee`, model);
  }

  const id = Employee._id;

  const [name, setName] = useState(Employee.name);
  const [birthDate, setBirthDate] = useState(Employee.birthDate);
  const [gender, setGender] = useState(Employee.gender);
  const [email, setEmail] = useState(Employee.email);
  const [cpf, setCpf] = useState(Employee.cpf);
  const [start_date, setStart_date] = useState(Employee.star_date);
  const [team, setTeam] = useState(Employee.team);

  const updateemployee = {
    id,
    name,
    birthDate,
    gender,
    email,
    cpf,
    start_date,
    team,
  };

  const updateEmployee = async (id: number, updateemployee: any) => {
    const response = await api.put(`${API_KEY}/nutemployee/${id}`);
    console.log(response.data);

    return (window.location.href = '/');
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateEmployee(id, updateemployee);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birth Date</Form.Label>
        <Form.Control
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value as any)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gender</Form.Label>
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
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="number"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.toString())}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
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
        Update Info
      </Button>
    </Form>
  );
};

export default EditForm;
