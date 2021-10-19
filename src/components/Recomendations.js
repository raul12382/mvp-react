import {useEffect, useState} from 'react'
import {Carousel} from 'antd'
import Lottie from 'react-lottie'
import Angulo from '../autocapture-animations/angulo.json'
import Fondo from '../autocapture-animations/fondo.json'
import Manos from '../autocapture-animations/manos.json'
import Reflejo from '../autocapture-animations/reflejo.json'


const Recomendations = () => {

    const contenStyle = {
        color:'white', padding:'3px', textAlign:'center'
    }
    
  return (
      <Carousel style={{width:'200px', height:'350px', backgroundColor:'black', textAlign:'center'}} autoplay={true}>
        <div>
        <Lottie  options={{ loop: true, autoplay: true, animationData: Angulo, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } }}
        /> 
        <p style={contenStyle}>Posiciona el celular en paralelo al documento para capturar la imagen en el angulo correcto</p>       
        </div>
        <div>
        <Lottie  options={{ loop: true, autoplay: true, animationData: Fondo, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } }}
        />
        <p style={contenStyle}> Evita fondos similares al color de tu rostro</p>
        </div>
        <div>
        <Lottie  options={{ loop: true, autoplay: true, animationData: Manos, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } }}
        />
        <p style={contenStyle}>Pon el documento sobre una superficie plana</p>
        </div>
        <div>
        <Lottie options={{ loop: true, autoplay: true, animationData: Reflejo, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } }}
        />
        <p style={contenStyle}>Evita ubicarte a contraluz</p>
        </div>
      </Carousel>
  );
};

export default Recomendations