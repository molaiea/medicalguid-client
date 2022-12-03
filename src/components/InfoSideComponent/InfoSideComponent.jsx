import React, {useState, useEffect} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import Button from '@mui/material/Button';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import './InfoSideComponent.css'
const InfoSideComponent = ({showinfo, info, handleClose, routingClick}) => {
  
  return (

      <Offcanvas show={showinfo} onHide={handleClose} scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Détails</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='sidebar'>
            <img src={require('../../assets/photos/pharmacies/images.jpg')}></img>
            <h1 className="title">{info.name}</h1>
            
            {info.address != "adresse non disponible" ? <span> <IconButton aria-label="delete">
              <HomeIcon />
            </IconButton>
            {info.address}
            </span> : <></>}
            <br></br>
            <br></br>
            <Button onClick={routingClick} variant="outlined" startIcon={<ForkRightIcon />}>
        Itinéraire
      </Button>
      <div id='loading_routing' style={{display: "flex", justifyContent:"center"
    , alignItems:"center", gap:"0.5rem", paddingTop: "1rem", visibility: "hidden"}}>
      <Spinner animation="grow" />
      <strong>Autorisez et attendez svp...</strong>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
  )
  }

export default InfoSideComponent