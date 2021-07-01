import React from 'react';
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <Image
            fluid
            src="./nutcache-logo.png"
            alt="Nutcache Logo"
          />
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
