import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import pokemonService from "../services/pokemonService";
import PokemonCard from "../components/PokemonCard";
import PersoPagination from "../components/PersoPagination";


const HomePage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const elementsPerPage = 20;
    const [maxPage, setMaxPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        // On met la function fleché fetchPokemons dans le useEffect pour que la fonction soit créé que au
        // chargement de la page vu des dépendances vide du useEffect
        const fetchPokemons = async () => {
            try {
                let offset = (currentPage - 1) * 20
                const response = await pokemonService.getPokemons(offset, elementsPerPage);
                setMaxPage(Math.ceil(response.data.count / elementsPerPage));
                setPokemons(response.data.results);
                setFilteredPokemons(response.data.results)
            } catch (error) {
                console.error(error);
            }
        }

        fetchPokemons();
    }, [currentPage])

    useEffect(() => {
        // Cherche les pokemons qui contiennent ma valeur
        // const filteredPokemons = pokemons.filter((pokemon) => {return pokemon.name.toLowerCase().includes(searchValue.toLowerCase())})
        // for (let index = 0; index < pokemons.length; index++) {
        //     const element = pokemons[index];
        //     if (element.name.toLowerCase().includes(searchValue.toLowerCase())) {
        //         filteredPokemons.push(element)
        //     }
        // }

        // Chercher les pokemons qui commencent par ma valeur
        const filteredPokemons = pokemons.filter((pokemon) => {return pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())})
        setFilteredPokemons(filteredPokemons);
        
    }, [searchValue])


    return <>
        <Container className="d-flex flex-column align-items-center gap-3">
            <h1>Pokedex</h1>
            <Form className="col-11">
                <Form.Control type="text" placeholder="Bulbasaur, Charizard..."
                 value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </Form>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {filteredPokemons.map((pokemon) => {
                    return <PokemonCard pokemonCard={pokemon} key={pokemon.name} />
                })}
            </div>
            <PersoPagination maxPage={maxPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Container>
    </>;
}

export default HomePage;