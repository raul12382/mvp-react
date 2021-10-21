import {useEffect, useState} from 'react'
import {Table, Space, Button, Select, Modal, Image} from 'antd'
import axios from 'axios';
import Item from 'antd/lib/list/Item';


const GetDispositivos = () => {
  const { Column } = Table;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dispositivos, setDispositivos] = useState([])
  const [imagenes, setImagenes] = useState("")


  const showModal = async (record) => {
    /* const response = await axios.get(`http://127.0.0.1:4000/mvp/${record}`)
    setImagenes(response.data.photo) */
    setImagenes("https://raul12382.github.io/MVP-/img/cedula.jpg")
    setIsModalVisible(true)
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

  useEffect( async() => {
    const response = await axios.get('http://127.0.0.1:4000/mvp')
    setDispositivos(response.data)
    console.log(dispositivos)
  }, [setDispositivos])
    
  return (
    <>
    <Table dataSource={columns} style={{minWidth:'300px'}} scroll={{ x: 1000 }}>
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

    </>
  );
};

export default GetDispositivos