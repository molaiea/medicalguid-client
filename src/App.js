import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import BaseMap from './components/BaseMap/BaseMap';
import LoadingPage from './components/LoadingPage/LoadingPage';
import InfoSideComponent from './components/InfoSideComponent/InfoSideComponent';
import Icons from './components/Icons/Icons';
import $ from 'jquery'
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
      search_center: []
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

  toggleOptions = (e)=>{
    this.setState({toggle_cat: 1, selected_options: e})
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
      if(this.state.selected_options == [])
      {fetch(`https://medicalguide-api-production.up.railway.app/api/get/search?search_query=${e}`, 
      {method: 'get'})
      .then(res=>res.json())
      .then(res=>{      
        this.setState({
          search_items: res,
          searching: true
        })
      })}
      else{
        fetch(`https://medicalguide-api-production.up.railway.app/api/get/search?search_query=${e}&elements`, 
      {method: 'get'})
      .then(res=>res.json())
      .then(res=>{      
        this.setState({
          search_items: res,
          searching: true
        })
      })
      }
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
        labos: res.laboratories_res,
        opticians: res.opticians_res,
        transfusion: res.transfusion_res,
        is_loaded: 1,
      })
    })
  }

  
  render() {
    var data = [{data: this.state.clinics, icon: Icons['clinics']},
                  {data: this.state.pharmacies, icon: Icons['pharmacies']}, 
                  {data: this.state.dentists, icon: Icons['dentists']}, 
                  {data: this.state.labos, icon: Icons['labos']}, 
                  {data: this.state.opticians, icon: Icons['opticians']}, 
                  {data: this.state.transfusion, icon: Icons['transfusion']}]

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
    // if (this.state.toggle_cat == 1 && this.state.search_items==[]){
    //   var data = []
    //   this.state.selected_options.forEach((item, i)=>{
    //     data.push({data: this.state[this.state.selected_options[i].value], icon: Icons[item.value]})
    //   })
    // }else if(this.state.searching){
      

    // }

    return (
      <div className="App">
        <div className="sidebar">
    </div>
        <NavBar toggleOptions = {this.toggleOptions} 
        getSearchQuery={this.getSearchQuery} 
        searchResult={this.state.searching ? this.state.search_items.clinics : []}
        search_found={this.state.search_found}
        onSearchFound={this.onSearchFound}/>
        {this.state.is_loaded == 0 ? <LoadingPage/> : 
        <>
        <InfoSideComponent scroll="true" backdrop="false" 
        showinfo={this.state.marker_clicked} info={this.state.marker_info} 
        handleClose={this.handleClose}
        routingClick={this.handleRoutingClicked}/>
        <BaseMap className="map" data={data} handleMarkerClick={this.handleMarkerClick} 
        showRouting={this.state.show_routing}
        gotoLoc={[this.state.marker_info.lat, this.state.marker_info.lng]}
        getRoutingInfo={this.getRoutingInfo}
        handleLocationFound={this.handleLocationFound}
        search_center = {this.state.search_center!= [] ? this.state.search_center : [33.9724816,-6.7464094]}/>
        </>
        }
        
      </div>
    );
  }
  
}

export default App;
