import { Layout, Menu, Breadcrumb } from 'antd';
import '../index.css';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const Navbar = ({children}) => {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item  key="1">
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/select_camera">
                            Seleccionar camara
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/dispositivos">
                            Lista de dispositivos
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 630, minWidth:350}}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default Navbar

