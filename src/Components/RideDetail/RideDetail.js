import React from 'react';
import { useParams } from 'react-router';
import rideData from '../../rideData';

const RideDetail = () => {
    const {rideName} = useParams();
    return (
        <div>
            <h1>This is ride Detail of {rideName}</h1>
            {
                rideData.map(rides => rides.name === rideName  && <div key={rides.name}>
                    <h2>{rides.des}</h2>
                    <img src={rides.imgUrl}/>
                </div>)
            }
        </div>
    );
};

export default RideDetail;