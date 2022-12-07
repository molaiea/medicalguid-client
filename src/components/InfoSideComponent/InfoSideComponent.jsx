import React, {useState, useEffect} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import Button from '@mui/material/Button';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Rating } from 'react-simple-star-rating'
import './InfoSideComponent.css'
const InfoSideComponent = ({showinfo, info, handleClose, routingClick}) => {
  const handleRating = (rate) => {
    console.log(rate)
    fetch(`https://medicalguide-api-production.up.railway.app/addRating?rating=${rate}&table=${info.table}&id=${info.id}`, 
      {method: 'post'})
      .then(res=>console.log(res))
    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value)

  return (

      <Offcanvas show={showinfo} onHide={handleClose} scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Détails</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='sidebar'>
            <img className='info_img' src={info.table == 'clinics' ? require('../../assets/photos/clinics/clinic.jpg') : 
            info.table == 'transfusion' ? require('../../assets/photos/transfusion/transfusion.png') : 
            info.table == 'pharmacies' ? require('../../assets/photos/pharmacies/images.jpg') :
            info.table == 'opticians' ? require('../../assets/photos/opticians/opticien.jpg') : 
            info.table == 'dentists' ? require('../../assets/photos/dentists/dentiste.png') : 
            require('../../assets/photos/laboratories/laboratoire.jpg')}></img>
            <h1 className="title">{info.name}</h1>
            {info.address != "adresse non disponible" ? <span> <IconButton aria-label="delete">
              <HomeIcon />
            </IconButton>
            {info.address}
            </span> : <></>}
            {info.phone != "mobile non disponible" ? <span> <IconButton aria-label="delete">
              <LocalPhoneIcon />
            </IconButton>
            {info.phone}
            </span> : <></>}
            <br></br>
            <br></br>
            <Rating initialValue={info.rating}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      />
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