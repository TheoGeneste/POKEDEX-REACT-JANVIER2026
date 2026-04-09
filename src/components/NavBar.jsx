import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import typeService from '../services/typeService';
import { useEffect, useState } from 'react';
import gameService from '../services/gameService';
import generationService from '../services/generationService';

function NavBar() {
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [games, setGames] = useState([]);
    const [generations ,setGenerations] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/search", {state : {searchValue}});
        
    }

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await typeService.getTypes();
                setTypes(response.data.results);
            } catch (error) {
                console.error(error);
            }
        }

         const fetchGames = async () => {
            try {
                const response = await gameService.getGames();
                setGames(response.data.results);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchGenerations = async () => {
            try {
                const response = await generationService.getGenerations();
                setGenerations(response.data.results);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTypes();
        fetchGames();
        fetchGenerations();
    }, [])
    return (
        <Navbar expand="lg" bg='dark' color='dark' variant='dark' >
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")}>Pokedex</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <NavDropdown title="Types" id="navbarScrollingDropdown">
                            {types.map((type) => {
                                return <NavDropdown.Item key={type.name} className='text-capitalize' onClick={() => navigate("/type/"+type.name)}>{type.name}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        <NavDropdown title="Games" id="games">
                            {games.map((game) => {
                                return <NavDropdown.Item key={game.name} className='text-capitalize' onClick={() => navigate("/game/"+game.name)}>{game.name}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        <NavDropdown title="Générations" id="gen">
                            {generations.map((gen) => {
                                return <NavDropdown.Item key={gen.name} className='text-capitalize' onClick={() => navigate("/generation/"+gen.name)}>{gen.name}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button variant="outline-success" type='submit'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;