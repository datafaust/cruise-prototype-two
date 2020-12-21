import React from 'react';
var L = require('leaflet')

const Location = props => {
    return (
        <div>
            {
                L.easyButton('fa-globe', function(btn, map){
                    console.log('hellllooooo')
                }).addTo( props.map )
            }
        </div>
    );
};


export default Location;