import { useParams } from "react-router-dom";
import typeService from "../services/typeService";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import PokemonCard from "../components/PokemonCard";

const PokemonByType = () => {
    const { type } = useParams();
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const fetchType = async () => {
            try {
                const response = await typeService.getType(type);
                setPokemons(response.data.pokemon);
                setFilteredPokemons(response.data.pokemon)
            } catch (error) {
                console.error(error);
            }
        }
        fetchType();
    }, [type])

    useEffect(() => {
        // Chercher les pokemons qui commencent par ma valeur
        const filteredPokemons = pokemons.filter((pokemon) => {return pokemon.pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())})
        setFilteredPokemons(filteredPokemons);
        
    }, [searchValue])

    return <>
        <Container className="d-flex flex-column align-items-center gap-3">
            <h1 className="text-capitalize">{type}</h1>
            <Form className="col-11">
                <Form.Control type="text" placeholder="Bulbasaur, Charizard..."
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </Form>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {filteredPokemons.map((pokemon) => {
                    return <PokemonCard pokemonCard={pokemon.pokemon} key={pokemon.name} />
                })}
            </div>
        </Container>
    </>;
}

export default PokemonByType;