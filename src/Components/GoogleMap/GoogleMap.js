import React from 'react';
import './GoogleMap.css';

const GoogleMap = () => {
    return (
        <div className="mapContainer">
            <iframe className="map" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703802988!2d90.27923923029098!3d23.780573257422212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1616354010401!5m2!1sen!2sbd" allowFullScreen loading="lazy"></iframe>
        </div>
    );
};

export default GoogleMap;