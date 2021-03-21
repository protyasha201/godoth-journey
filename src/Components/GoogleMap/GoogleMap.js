import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './GoogleMap.css';

export class GoogleMap extends Component {
    render() {
        const mapStyle = {
            width: '100%',
            height: '100%',
            borderRadius: '20px'
        }

        const containerStyle = {
            borderRadius: '20px',
            width: '50%',
            position: 'absolute',
            right: '20px',
            height: '500px',
            marginTop: '30px'
        }
        return (
            <Map containerStyle={containerStyle} style={mapStyle} google={this.props.google} zoom={13}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>

                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAXr83Q-c5RwMkdm1Kgq5rIAZyZP5XUJQA')
})(GoogleMap)