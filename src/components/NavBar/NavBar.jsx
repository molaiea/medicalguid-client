import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import './NavBar.css'

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

function NavBar({toggleOptions}) {
  const categories = [
    { value: "clinics", label: "Cliniques" },
    { value: "dentists", label: "Dentistes" },
    { value: "labos", label: "Laboratoires" },
    { value: "opticians", label: "Opticiens" },
    { value: "pharmacies", label: "Pharmacies" },
    { value: "transfusion", label: "Centres de transfusion sanguine" }
  ];
  
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" className='navbar'>
        <Container fluid>
          <Navbar.Brand href="#home">
          <img src={require('../../assets/icon.png')} alt="icon" className="logo_img"/>MedicalGuide</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <Nav.Link href="/home">
            Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <ReactSelect className="react-select"
          options={categories}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={toggleOptions}
          allowSelectAll={true}
        />
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;