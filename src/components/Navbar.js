import { Layout, Menu, Breadcrumb } from 'antd';
import '../index.css';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const Navbar = ({ children }) => {
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <NavLink to="/mvp-react">
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <NavLink to="/select_camera">
                            Seleccionar camara
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        <NavLink to="/dispositivos">
                            Lista de dispositivos
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                    <div className="site-layout-background" style={{ padding: 24 , height:'100vh', textAlign:'center'}}>
                        {children}
                    </div>
            </Layout>
        </Layout>
    )
}

export default Navbar

