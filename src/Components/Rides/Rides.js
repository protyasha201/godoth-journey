import React from 'react';
import { useHistory } from 'react-router-dom';
import './Rides.css';

const Rides = (props) => {
    const { name, imgUrl } = props.rides;
    let history = useHistory();
    const handleRideDetail = () => {
        history.push(`/rideDetail/${name}`);
    }
    return (
        <div onClick={handleRideDetail} className="ridesContainer">
            <div className="rideImage">
                <img src={imgUrl} alt="ride"></img>
            </div>
            <h1>{name}</h1>
        </div>
    );
};

export default Rides;