import {useEffect, useState} from 'react'
import {Table, Space, Button, Select, Modal, Image, Col, Spin} from 'antd'
import axios from 'axios';
import Item from 'antd/lib/list/Item';
const { Option } = Select;


const GetDispositivos = () => {
  const { Column } = Table;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dispositivos, setDispositivos] = useState([])
  const [modelosUnicos, setModelosUnicos] = useState([])
  const [spin, setSpin] = useState(false);
  const [imagenes, setImagenes] = useState("")


  const showModal = async (record) => {
    setSpin(true)
    const response = await axios.get(`https://api-devices-mvp.herokuapp.com/mvp/${record}`)
    setImagenes(response.data.photo)
    //setImagenes("https://raul12382.github.io/MVP-/img/cedula.jpg")
    setIsModalVisible(true)
    setSpin(false)
    //let imagen = document.getElementById("imagen").parentNode.parentNode
  };

  const columns = [
    {
      _id : "1",
      photo: "https://raul12382.github.io/MVP-/img/cedula.jpg", 
      modelo: "moto g8",
      index: "1"
    },
    {_id : "2",
    photo: "https://raul12382.github.io/MVP-/img/cedula.jpg", 
    modelo: "iphone se",
    index: "2"
    }, 
    {_id : "3",
    photo: "https://raul12382.github.io/MVP-/img/cedula.jpg", 
    modelo: "Pixel 2",
    index: "0"
    },
  ]
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOnChange = async(value) => {
    console.log(value);
    setSpin(true)
    let url = ""
    if (value == "modelos") {
      url = 'https://api-devices-mvp.herokuapp.com/mvp'
    } else {
      url = `https://api-devices-mvp.herokuapp.com/mvp/modelo/${value}`
    }
    const response = await axios.get(url)
    setDispositivos(response.data)
    setSpin(false)
  };

  const modelos = async () => {
    const response = await axios.get('https://api-devices-mvp.herokuapp.com/mvp/modelos')
    setModelosUnicos (response.data)
  }

  useEffect( async() => {
    setSpin(true)
    const response = await axios.get('https://api-devices-mvp.herokuapp.com/mvp')
    setDispositivos(response.data)
    modelos()
    console.log(dispositivos)
    setSpin(false)
  }, [setDispositivos], [setModelosUnicos])
    
  return (
    <>
    <Spin spinning={spin} tip="Cargando data..." >
    Selecciona el modelo: <Select onChange={handleOnChange} style={{width:'200px', padding:'10px'}} defaultValue={'Selecciona modelo'} > 
    <Option value={"modelos"}>Ver todos</Option>
    {modelosUnicos.map((modelo, key) => (
              <Option value={modelo} key={key}>{modelo}</Option>
            ))}
    </Select>
    <Table dataSource={dispositivos} style={{minWidth:'300px'}} scroll={{ x: 1000 }}>
        <Column title="ID" dataIndex="_id" key="_id"/>
        <Column title="Modelo" dataIndex="modelo" key="modelo" />
        <Column title="Index" dataIndex="index" key="index" />
        <Column
          title="Imagen"
          render={(text, record) => (
                <Space size="middle">
                <Button onClick={(_id)=>showModal(record._id)}>Ver Imagen</Button>
                </Space>
          )}
        />
      </Table>

      <Modal title="Captura realizada" visible={isModalVisible} style={{textAlign:'center'}} onCancel={handleCancel} onOk={handleOk} >
        {imagenes &&(
          <Image src={imagenes} width={250}></Image>
        )}
      </Modal>
    </Spin>
    </>
  );
};

export default GetDispositivos