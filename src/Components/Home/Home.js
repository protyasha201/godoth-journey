import React from 'react';
import './Home.css';
import rideData from '../../rideData';
import Rides from '../Rides/Rides';



const Home = () => {
    return (
        <div className="home">
            <div className="rides">
                {
                    rideData.map(rides => <Rides key={rides.id} rides={rides}></Rides>)
                }
            </div>
        </div>
    );
};

export default Home;