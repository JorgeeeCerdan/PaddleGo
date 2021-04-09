import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utility/PrivateRouter";
import './App.css';

// PROMO APP
import InicioPromo from "./components/InicioPromo";
import Login from "./components/Login.jsx";
import Registro from "./components/Registro.jsx";

// APP PADDLEGO
import InicioApp from "./components/InicioApp";

// APP PISTAS
import Pistas from "./components/Pista/Pistas.jsx";
import PistaCrear from "./components/Pista/PistaCrear.jsx";
import PistaReserva from "./components/Pista/PistaReserva.jsx";

// APP RESERVAS
import Reservas from "./components/Reserva/Reservas.jsx";
import ReservasUsuario from "./components/Reserva/ReservasUsuario";
import ReservaConcreta from './components/Reserva/ReservaConcreta.jsx'

// APP USUARIO
import Usuarios from "./components/Usuario/Usuarios.jsx";
import PerfilUsuario from "./components/Usuario/PerfilUsuario.jsx";

function App () {
  

  return (    
    <Router>
      <Switch>
        <PrivateRoute path="/reservas/usuario/" component={ReservasUsuario} />
        <PrivateRoute path="/reservas/:id" component={ReservaConcreta} />
        <PrivateRoute path="/reservas" component={Reservas} />
        <PrivateRoute path="/pista/:id" component={PistaReserva} />
        <PrivateRoute path="/pista" component={PistaCrear} />
        <PrivateRoute path="/pistas" component={Pistas} />
        <PrivateRoute path="/usuarios" component={Usuarios} />
        <PrivateRoute path="/usuario" component={PerfilUsuario} />
        <PrivateRoute path="/inicio" component={InicioApp} />

        <Route path="/registro" component={Registro} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={InicioPromo}/>
      </Switch>
    </Router>
  )
}

export default App;
