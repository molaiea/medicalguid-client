import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CoroplethMap from '../CoroplethMap/CoroplethMap';
import './Slider.css'
 function Slider() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" className='showmap' onClick={handleShow}>
            <span>Voir des statistiques</span>
        <div className="center-con">
    <div className="round">
        <div id="cta">
            <span className="arrow primera next "></span>
            <span className="arrow segunda next "></span>
        </div>
    </div>
</div>

        </Button>
  
        <Offcanvas className='mymapcontainer' show={show} onHide={handleClose} placement={"left"} backdrop={false}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Nombre d'hopitaux par région - Maroc</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CoroplethMap/>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}

export default Slider;