import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import BaseMap from './components/BaseMap/BaseMap';
import LoadingPage from './components/LoadingPage/LoadingPage';
class App extends React.Component {

  constructor(){
    super()
    this.state = {
      is_loaded: 0,
      toggle_cat: 0,
      selected_options: [],
      clinics: [],
      pharmacies: [],
      dentists: [],
      labos: [],
      opticians: [],
      transfusion: []
    }
  }

  toggleOptions = (e)=>{
    this.setState({toggle_cat: 1, selected_options: e})
  }
  componentDidMount() {
    fetch('https://medicalguide-api-production.up.railway.app/db', 
    {method: 'get'})
    .then(res=>res.json())
    .then(res=>{
      this.setState({
        clinics: res.clinics_res,
        pharmacies: res.pharmacies_res,
        dentists: res.dentists_res,
        labos: res.laboratories_res,
        opticians: res.opticians_res,
        transfusion: res.transfusion_res,
        is_loaded: 1
      })
    })
  }
  render() {
    if (this.state.toggle_cat == 0){
      var data = [this.state.clinics, this.state.pharmacies, this.state.dentists, this.state.labos, this.state.opticians, this.state.transfusion]
    } else {
      var data = []
      this.state.selected_options.forEach((item, i)=>{
        data.push(this.state[this.state.selected_options[i].value])
      })
    }
    return (
      <div className="App">
        <NavBar toggleOptions = {this.toggleOptions} />
        {this.state.is_loaded == 0 ? <LoadingPage/> : 
        <BaseMap className="map" data={data}/>}
        
        
      </div>
    );
  }
  
}

export default App;
