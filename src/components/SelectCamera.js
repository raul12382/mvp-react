import React, {useCallback, useState, useRef, useEffect} from 'react';
import Webcam from "react-webcam";
import UAParser from 'ua-parser-js';
import { Modal, Button, Select, Col, Tooltip, message, Spin} from "antd"
import Recomendations from './Recomendations';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
const { Option } = Select;

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [index, setIndex] = useState("selecciona la camera");
  const [camera, setCamera] = useState("sin camara seleccionada");
  const [display, setDisplay] = useState(true);
  const [recomendations, setRecomendations] = useState(false);
  const [titulo, setTitulo] = useState("Error");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reedirect, setReedirect] = useState(false);
  const [spin, setSpin] = useState(false);
  const [isPc, setIsPc] = useState(false);
  const webcamRef = useRef(null);
  const [modaltitle, setModaltitle] = useState("Camara no disponible");
  const [url, setUrl] = useState(null);

  const parser = new UAParser()
  const modelo = parser.getDevice().model
  const os = parser.getOS().name
  console.log(os)

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setTitulo("Imagen capturada");
    setModaltitle("¿Enviar data a TOC?");
    setIsModalVisible(true);
  }, [webcamRef]);

  const handleOkandCancel = () => {
    setIsModalVisible(false);
  };

  const onClickModal = async (e) => {
    setIsModalVisible(false);
    setSpin(true)
    localStorage.setItem("index", index)
    localStorage.setItem("selected", camera )
    document.cookie =`"index=${index};  expires=Thu, 31 Dec 2022 12:00:00 UTC;"`
    document.cookie =`"camera=${camera};  expires=Thu, 31 Dec 2022 12:00:00 UTC;"`
    try {
      const response = await axios.post('http://127.0.0.1:4000/mvp/', {
      index: camera, 
      photo : url, 
      modelo: modelo
    })
    setSpin(false)
    if (response.data.status == "200"){
      message.success("Data enviada con exito")
      setReedirect(true)
    } 
    } catch (error) {
      setSpin(false)
      message.error("Ah ocurrido un error, intente de nuevo")
    }
  };

  const onClickHidden = () =>{
    setDisplay(false)
    setRecomendations(true)
  }

  const handleOnChange= (value, options) => {
    setIndex(value);
    setCamera(options.key)
    console.log("optiones", options.key)
    index == "selecciona la camera" ? setDisplay("block") : setDisplay("none")

  };

  const cambiarCamara = () => {
    setDisplay(true)
    setRecomendations(false)
  }

  const handleDevices = useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );
  useEffect(
    () => {
      /* if (os === "Mac OS" || "Windows") {
        setIsPc(true)
      } */
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  let color = ""

  console.log("el index", index)
  console.log("el camera", camera)
  console.log("imagen", url)
  console.log("modelo", modelo)

  return (
    <>
      {isPc && (
          <Redirect to="/migration" />
        )
      }
      <Spin spinning={spin} tip="Enviando data..." >
      <div style={{ paddingBottom:'10px'}} hidden={recomendations}>
        <label style={{color:'#00AFDC'}}>
          Seleccione la mejor camara para Autocaptura
        </label>
      </div>
      <Tooltip placement="right" title={camera}>
      <Select hidden={recomendations} onChange={handleOnChange}  defaultValue="Selecciona la camara" style={{width:200, textAlign:'center'}}>
      {devices.map((device, key) => (
              <Option value={device.deviceId} key={device.label}>{device.label}</Option>
            ))}
      </Select>
      </Tooltip>
      <div style={{paddingTop:'10px'}} hidden={recomendations}>
      <p style={{padding:'5px'}} >Recuerda seguir las siguientes instrucciones para una captura adecuada:</p>
      <Recomendations/>
      {camera && (<Col>la camara seleccionada es: {camera}</Col>)}
      </div>
      <div hidden={display}>
       <Webcam 
       audio={false} 
       width={'100%'}
       height={'100%'}
       videoConstraints={{ deviceId:index }} 
       ref={webcamRef}
       onUserMediaError={error => setIsModalVisible(true)}
      screenshotFormat="image/jpeg" 
      />
      <Button onClick={capturePhoto}>Capture</Button>
      <Button style={{backgroundColor:'#00AFDC', color:'white'}} onClick={cambiarCamara}>Cambiar camara</Button>
      <ul>
      {
      devices.map((device, key) => (
              (camera == device.label ? color = "#00AFDC" : color="black"),
              <li value={device.deviceId} style={{color: color}} key={device.label}>{device.label}</li>
            ))}
      </ul>
      </div>
      <div style={{paddingTop:'10px'}}>
      {( camera === "sin camara seleccionada" ? <div></div> : <Button onClick={onClickHidden}  hidden={recomendations}>capturar cedula</Button>)}
      </div>
      <Modal title={titulo} visible={isModalVisible} style={{textAlign:'center', height:'400px'}} onOk={onClickModal} onCancel={handleOkandCancel}>
        <p>{modaltitle}</p>
          {url && (
            <div>
              <img src={url} alt="Screenshot" style={{WebkitTransform:'rotate(180deg)', padding:'10px'}} width={200}/>
            </div>
          )}
      </Modal>
      </Spin>
      {reedirect && (
          <Redirect to="/" />
        )
      }
    </>
  );
};

export default WebcamCapture