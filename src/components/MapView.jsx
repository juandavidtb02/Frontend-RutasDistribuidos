import { MapContainer, TileLayer,Marker,Popup,useMap } from 'react-leaflet'
import React from 'react';

import Clock from './Clock';
import "leaflet/dist/leaflet.css"
import data from '../../data';
import L from "leaflet";
import Spinner from './spinner/spinner';
import ButtonOptions from './auth/Button';

import useUserContext from "../../hooks/useUser";


import Swal from 'sweetalert2';
import Welcome from './auth/Welcome';

const myIcon = L.icon({
    iconUrl: "https://icones.pro/wp-content/uploads/2021/02/icone-de-broche-de-localisation-rouge.png",
    iconSize: [45, 43],
    iconAnchor: [23.5, 41],
    popupAnchor: [0, -33]
  });

export default function MapView() {
    const {userLog,setUserLog} = useUserContext();
    
    
    const [modal,setModal] = React.useState(false)
    
    const [position, setPosition] = React.useState([0,0]);
    
    
    const alertModal = (message,icon) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: icon,
            title: message
          })
    }
    
    React.useEffect(() => {
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'geolocation' }).then(result => {
            if (result.state === 'granted') {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setPosition([position.coords.latitude, position.coords.longitude]);
                },
                (error) => console.error(error),
                { enableHighAccuracy: true }
              );
            } else {
                setPosition([4.146693142883072, -73.63678437430272])
                alertModal('Activa la ubicación del navegador para conocer tu paradero más cercano','warning')
            }
          });
        } else {
            setPosition([4.146693142883072, -73.63678437430272])
            alertModal('Este navegador no cuenta con ubicación en tiempo real!','error')
        }
      }, []);

      
    

      
      

    if (position[0] === 0) return(<Spinner/>)
    return (
        <>
            
            <div className='md:w-1/2 h-screen'>
                {userLog !== '' && (<Welcome name={userLog}/>)}
                <ButtonOptions/>
                <Clock/>
                
                <MapContainer center={position} zoom={17}>
                  
                    
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />  
                    
                    <Marker
                        position={position}
                        icon={myIcon}
                    >
                            <Popup>
                                Tu ubicación actual
                            </Popup>
                    </Marker>
                    {data?.map((item,index)=>(
                        <div key={index}>
                            
                                <Marker position={item?.coordenadas}
                                    eventHandlers={{
                                        click: (e) => {
                                            setModal(true)
                                        },
                                    }} 
                                >
                                    <Popup>
                                        {item?.hora}
                                    </Popup>
                                    
                                </Marker>
                        </div>
                    ))} 
                </MapContainer>     
            </div>
                           
        </>
    );
};
