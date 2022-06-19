import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../store/slices/auth/thunk';

export const Navb = () => {

  const dispatch = useDispatch()

  const authlogout = () => {
    dispatch(startLogout())
}
  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href="#home">Telebendicion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink to = '/BannerImage' className = 'nav-link'>Imagenes del banner</NavLink>
            <NavLink to = '/BannerList' className = 'nav-link'>Listado de imagenes</NavLink>
            <NavLink to = '/Videos' className = 'nav-link'>Video para el carusel</NavLink>
            <NavLink to = '/VideosList' className = 'nav-link'>Listado de Videos</NavLink>
          </Nav>

          <Nav>
            <NavLink to = '/Login' onClick={authlogout} className = 'nav-link d-flex align-items-center'>Cerrar sesión</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}