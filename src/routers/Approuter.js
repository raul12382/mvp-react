import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SelectCamera from "../pages/SelectCamera"
import HomePage from "../pages/HomePage"
import CaptureCamera from "../pages/CaptureCamera"
import GetDispositivo from "../pages/GetDispositivo"
import GetDispositivos from "../pages/GetDispositivos"
import NotFoundPage from "../pages/NotFoundPage"
import Migration from '../components/Migration'
import Navbar from "../components/Navbar"

const AppRouter = () => {


    return(
        <Router>
                <Navbar>
                <Switch>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/select_camera" component={SelectCamera} />
                    <Route exact path="/capture_camera" component={CaptureCamera} />
                    <Route exact path="/dispositivos" component={GetDispositivos} />
                    <Route exact path="/dispositivo/:dispositivoId" component={GetDispositivo} />
                    <Route exact path="/migration" component={Migration} />

                    <Route path="*" component={NotFoundPage} />
                </Switch>
                </Navbar>
        </Router>
    )
}

export default AppRouter