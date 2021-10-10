import {useEffect, useState} from 'react'
import {Table, Space, Button} from 'antd'
import axios from 'axios';
import Item from 'antd/lib/list/Item';


const GetDispositivos = () => {
  const { Column } = Table;

  const [dispositivos, setDispositivos] = useState([])

  useEffect( async() => {
    const response = await axios.get('http://127.0.0.1:4000/mvp')
    setDispositivos(response.data)
    console.log(dispositivos)
  }, [])

  const Image = (value) => {
    console.log(value)
  }
    
  return (
    <>
    <Table dataSource={dispositivos}>
        <Column title="ID" dataIndex="_id" key="_id"/>
        <Column title="Modelo" dataIndex="modelo" key="modelo" />
        <Column title="Index" dataIndex="index" key="index" />
        <Column
          title="Imagen"
          value="_id"
          render={(text, record) => (
            <Space size="middle">
              <Button onClick={Image()} >Ver Imagen</Button>
            </Space>
          )}
        />
      </Table>

    </>
  );
};

export default GetDispositivos