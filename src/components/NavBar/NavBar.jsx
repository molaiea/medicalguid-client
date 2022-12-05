import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
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

function NavBar({toggleOptions, getSearchQuery, searchResult, search_found, onSearchFound, handleBufferChange, getBuffer}) {
  const categories = [
    { value: "clinics", label: "Cliniques" },
    { value: "dentists", label: "Dentistes" },
    { value: "labos", label: "Laboratoires" },
    { value: "opticians", label: "Opticiens" },
    { value: "pharmacies", label: "Pharmacies" },
    { value: "transfusion", label: "Centres de transfusion sanguine" }
  ];
  var mySearchRes = []
  Object.keys(searchResult).forEach((item, idx)=>{
    mySearchRes.push(...searchResult[item])
  })
  var myarr = [{name:"eeee", id:2}, {name:"eerte", id:4}]
  return (
    
    <div className="nav_container">
      <Navbar bg="dark" variant="dark" expand="lg" className='navbar'>
        <Container fluid>
          <Navbar.Brand href="/">
          <img src={require('../../assets/icon.png')} alt="icon" className="logo_img"/>MedicalGuide</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            
            
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
        <NavDropdown
              id="nav-dropdown-dark-example"
              title="Détails"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">
              <Nav.Link href="#features">Cliniques</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              <Nav.Link href="#features">Pharmacies</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
              <Nav.Link href="#features">Dentistes</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
              <Nav.Link href="#features">Opticiens</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
              <Nav.Link href="#features">Laboratoires d'analyses médicales</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
              <Nav.Link href="#features">Centres de transfusion sanguine</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            
            <Form className="d-flex">
            <Form.Control
              type="search"
              id="seach_bar"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{
                getSearchQuery(e.target.value)
              }}
              onKeyDown={(e)=>{
                if(e.key=="Enter"){
                  e.preventDefault()
                }
                
              }}
            />
          </Form>
          <Button id="buffer_button" variant="light">Ou cherchez dans un rayon ▶</Button>
          <Form className="d-flex" >
            <Form.Control
              type="number"
              id="buffer"
              style={{visibility: "hidden"}}
              placeholder="Rayon en m"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{
                console.log(e.target.value)
                handleBufferChange(e.target.value)
              }}
              onKeyDown={(e)=>{
                if(e.key=="Enter"){
                  e.preventDefault()
                getBuffer(e.target.value)
                }
                
              }}
            />
          </Form>
          
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{visibility: "hidden"}} className="search_container">
      
      <ul>
          {mySearchRes.map(item=>{return (<li key={mySearchRes.indexOf(item)} onClick={function (e){
              onSearchFound([item.lat, item.lng])
            }}>{item.name}
            <hr
        style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
        }}
      /></li>)})}
      </ul>
      </div>
    </div>
    
  );
}

export default NavBar;