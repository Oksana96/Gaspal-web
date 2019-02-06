import React, { PureComponent } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import Popup from './Popup'
import { connect } from 'react-redux'
import Geocoder from 'react-map-gl-geocoder'
import Bubble from '../img/bubble.png'
import { easeCubic } from 'd3-ease';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const bubbleStyle = {
  backgroundImage: `url(${Bubble})`,
  width: '60px',
  height: '60px',
  backgroundSize: '62px 56px',
  backgroundRepeat: 'no-repeat'
}

class Map extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (this.props.displayList && !nextProps.displayList) {
      const station = nextProps.stationSelected;
      const viewport = {
        ...this.state.viewport,
        longitude: station.location.coordinates[0],
        latitude: station.location.coordinates[1],
        zoom: 14,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      };
      this.setState({ viewport });
    }
    if (this.props.carbu !== nextProps.carbu) {
      this.fetchStations()
    }
  }

  state = {
    showPopup: true,
    stations: [],
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 50.6333,
      longitude: 3.0667,
      zoom: 14
    },
    isDragging: false
  };

  componentDidMount = () => {
    if (this.props.longitude !== null) {
      const viewport = {
        ...this.state.viewport,
        longitude: this.props.longitude,
        latitude: this.props.latitude,
        zoom: 14,
      };
      this.setState({ viewport });
    }
  }

  mapRef = React.createRef()

  onViewportChange = (viewport) => {
    this.setState({
      ...this.state,
      viewport: viewport
    });
  }


  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.onViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
  fetchStations = () => {
    axios.get('https://apiv2.gaspalapp.com/v1/stations', {
      params: {
        latitude: this.state.viewport.latitude,
        longitude: this.state.viewport.longitude
      }
    })
      .then(res => {
        this.props.addStations(res.data)
      })

  }

  onInteractionStateChange = (interactionState) => {
    if (this.state.isDragging && !interactionState.isDragging) {
      this.fetchStations()
    }

    this.setState({
      isDragging: interactionState.isDragging
    })

  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  stationDetails = (station) => {
    this.props.setSelectedStation(station)
    this.props.changeColumn()
  };

  render() {
    const { stations } = this.props;
    const { carbu } = this.props;

    const stationList = stations.map(station => {
      const fuel = station.fuels.find(fuel => { return fuel.code_name === carbu })
      return (
        <Marker key={station.id} latitude={station.location.coordinates[1]} longitude={station.location.coordinates[0]} offsetLeft={-30} offsetTop={-30}>
          <div onClick={() => { this.stationDetails(station) }} className="d-flex flex-row" style={bubbleStyle}>
            <div className="map-color" style={{ backgroundColor: station.color }}></div>
            <div className="d-flex flex-column align-items-center flex-grow-1">
              <img src={station.brand.logo} width='26px' height="26px" style={{ objectFit: 'contain' }} alt="" />
              <div className="mt-1">{fuel.price}</div>
            </div>
          </div>
        </Marker>
      )
    })



    return (

      <div className="ml-0 mr-0" style={{ height: '600px' }}>
        <ReactMapGL

          ref={this.mapRef}

          minZoom={10}
          mapStyle={"mapbox://styles/maxenceh/cjjlfn6cj39112rqt99p9sk84"}
          {...this.state.viewport}
          onViewportChange={this.onViewportChange}
          onInteractionStateChange={this.onInteractionStateChange} mapboxApiAccessToken={MAPBOX_TOKEN}>

          {stationList}

          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </ReactMapGL>

        {this.state.showPopup &&
          <Popup closePopup={this.togglePopup.bind(this)} />
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    carbu: state.carbu,
    stations: state.stations,
    displayList: state.displayList,
    stationSelected: state.stationSelected,
    latitude: state.latitude,
    longitude: state.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStations: (addstations) => { dispatch({ type: 'ADD_STATIONS', addstations: addstations }) },
    changeColumn: () => { dispatch({ type: 'CHANGE_COLUMN', display: false }) },
    setSelectedStation: (station) => { dispatch({ type: 'SELECTED_STATION', station: station }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);