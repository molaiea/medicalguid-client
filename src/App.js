import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import BaseMap from './components/BaseMap/BaseMap';
import LoadingPage from './components/LoadingPage/LoadingPage';
import InfoSideComponent from './components/InfoSideComponent/InfoSideComponent';
import Icons from './components/Icons/Icons';
import $ from 'jquery';
import Slider from './components/Slider/Slider';
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
      laboratories: [],
      opticians: [],
      transfusion: [],
      marker_clicked: false,
      marker_info: {},
      show_routing: false,
      routing_info: false,
      location_found: false,
      distance:"",
      eta:"",
      instructions:{},
      search_query:"",
      search_items: {},
      searching: false,
      search_found: false,
      search_center: [],
      buffer_radius: 0,
      search_by_buffer: false,
      user_position: [],
      buffer_result: []
    }
  }

  getUserPosition = ()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position)=>{
            this.setState({user_position: [position.coords.latitude, position.coords.longitude]})
          },
          positionError
      )
  }
  function positionError(error) {
      if (error.PERMISSION_DENIED) {alert('Veuillez autoriser votre localisation!');}

  }
  }
  getBuffer = (e)=>{
    if(e!=0){
      if(this.state.selected_options.length == 0)
    {
      var mytables = ['clinics', 'pharmacies', 'dentists', 'laboratories', 'opticians', 'transfusion']
      mytables.map((item, idx)=>{
        fetch(`https://medicalguide-api-production.up.railway.app/api/get/searchbybuffer?buffer=${e}&table=${item}&center=${this.state.user_position[0]},${this.state.user_position[1]}`, 
      {method: 'get'})
      .then(res=>res.json())
      .then(res=>{      
        this.state.buffer_result.push({data: res, icon: Icons[item]})
      }).then(()=>{
        this.setState({
          search_by_buffer: true,
        })
      })
    }
    
    )
    
  }
    else{
      this.state.selected_options.forEach((item, idx)=>{
        fetch(`https://medicalguide-api-production.up.railway.app/api/get/searchbybuffer?buffer=${e}&table=${item.value}&center=${this.state.user_position[0]},${this.state.user_position[1]}`, 
    {method: 'get'})
    .then(res=>res.json())
    .then(res=>{      
      console.log(res)
      this.state.buffer_result.push({data: res, icon: Icons[item.value]})
      this.setState({
        search_by_buffer: true,
      })
      
    })
      })
      
    }
    }
    }
  
  onSearchFound = (e)=>{
    this.setState({
      search_found: true,
      search_center: e,
      searching: false,
      search_items: []
    })
    document.getElementsByClassName("search_container")[0].style.visibility = "hidden";
    document.getElementById("seach_bar").value=""
  }

  handleBufferChange = (e)=>{
    this.setState({
      buffer_radius: e,
      search_by_buffer: false,
      buffer_result: []
    })
  }
  toggleOptions = (e)=>{
    this.setState({toggle_cat: e.length==0 ? 0 : 1, selected_options: e})
  }
  handleMarkerClick = (e)=>{
    this.setState({
      marker_clicked: true,
      marker_info: e,
      show_routing: false
    })
  }
  handleLocationFound = ()=>{
    this.setState({
      location_found: true,
    })
    $('#loading_routing').css("visibility", "visible")
  }
  handleClose = ()=>{
    this.setState({
      marker_clicked: false,
      marker_info: {},
      show_routing: false
    })
  }

  handleRoutingClicked = ()=>{
    if(!this.state.show_routing){
      this.setState({
        show_routing: true
      })
      $('#loading_routing').css("visibility", "visible")
    }
    
  }
  getSearchQuery = (e)=>{
    if(e!=""){
      
      if(this.state.selected_options.length == 0)
      {fetch(`https://medicalguide-api-production.up.railway.app/api/get/search?search_query=${e}`, 
      {method: 'get'})
      .then(res=>res.json())
      .then(res=>{      
        console.log(res)
        this.setState({
          search_items: res,
          searching: true
        })
        
        
      })}
      else{
        this.state.selected_options.forEach((item, idx)=>{
          fetch(`https://medicalguide-api-production.up.railway.app/api/get/searchbyfilter?search_query=${e}&table=${item.value}`, 
      {method: 'get'})
      .then(res=>res.json())
      .then(res=>{      
        console.log(res)
        this.setState({
          searching: true
        })
        this.state.search_items[item.value] = res
      })
        })
        
      }
    }
    else if(e==''){
      this.setState({
        searching: false
      })
    }   
    document.getElementsByClassName("search_container")[0].style.visibility = e=="" ? "hidden" : "visible";
    
  }
  getRoutingInfo = ()=>{
    this.setState({
      routing_info: true,
    })
    
    $('#loading_routing').css("visibility", "hidden")
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
        laboratories: res.laboratories_res,
        opticians: res.opticians_res,
        transfusion: res.transfusion_res,
        is_loaded: 1,
      })
    })
  }
  searchByBuffer(){

  }
 toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

  };
  render() {
    var data = [{data: this.state.clinics, icon: Icons['clinics']},
                  {data: this.state.pharmacies, icon: Icons['pharmacies']}, 
                  {data: this.state.dentists, icon: Icons['dentists']}, 
                  {data: this.state.laboratories, icon: Icons['laboratories']}, 
                  {data: this.state.opticians, icon: Icons['opticians']}, 
                  {data: this.state.transfusion, icon: Icons['transfusion']}]
    $(".map_container").on('click', ()=>{
      
      document.getElementsByClassName("search_container")[0].style.visibility = "hidden";
    })
    $("#buffer_button").on('click', ()=>{
      $("#buffer").css("visibility", "visible")
      $("#buffer").css("margin-left", "10px")
      $('#buffer_button').html('Cliquez entrer pour valider')
        this.getUserPosition()
    })
        
    $(".react-select").on('click', ()=>{
      
      document.getElementsByClassName("search_container")[0].style.visibility = "hidden";
    })
    if(this.state.searching){
      var data = []
      for ( const prop in this.state.search_items) {
        data.push({data: this.state.search_items[prop], icon: Icons[prop]})
      }
    } else{
      if(this.state.toggle_cat == 1){
        var data = []
      this.state.selected_options.forEach((item, i)=>{
        data.push({data: this.state[this.state.selected_options[i].value], icon: Icons[item.value]})
      })
      }
    }
      
    // }

    return (
      <div className="App">
        <div className="sidebar">
    </div>
        <NavBar toggleOptions = {this.toggleOptions} 
        getSearchQuery={this.getSearchQuery} 
        searchResult={this.state.searching ? this.state.search_items : []}
        search_found={this.state.search_found}
        onSearchFound={this.onSearchFound}
        getBuffer={this.getBuffer}
        handleBufferChange={this.handleBufferChange}/>
        {this.state.is_loaded == 0 ? <LoadingPage/> : 
        <>
        <InfoSideComponent scroll="true" backdrop="false" 
        showinfo={this.state.marker_clicked} info={this.state.marker_info} 
        handleClose={this.handleClose}
        routingClick={this.handleRoutingClicked}/>
        <BaseMap className="map" data={this.state.search_by_buffer ? this.state.buffer_result : data} handleMarkerClick={this.handleMarkerClick} 
        showRouting={this.state.show_routing}
        gotoLoc={[this.state.marker_info.lat, this.state.marker_info.lng]}
        getRoutingInfo={this.getRoutingInfo}
        handleLocationFound={this.handleLocationFound}
        search_center = {this.state.search_center!= [] ? this.state.search_center : [33.9724816,-6.7464094]}
        bufferRadius = {this.state.buffer_radius}
        userPosition = {this.state.user_position != [] ? this.state.user_position : [33.976501,-6.8673219]}/>
        <Slider/>
        </>
        }
        
      </div>
    // <CoroplethMap/>
    );
  }
  
}

export default App;
