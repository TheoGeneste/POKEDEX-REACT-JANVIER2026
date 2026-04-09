import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import generationService from "../services/generationService";
import { Container, Form } from "react-bootstrap";
import PokemonCard from "../components/PokemonCard";

const PokemonByGeneration = () => {
    const { gen } = useParams();
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const fetchGeneration = async () => {
            try {
                const response = await generationService.getGeneration(gen);
                setPokemons(response.data.pokemon_species);
                setFilteredPokemons(response.data.pokemon_species);

            } catch (error) {
                console.error(error);
            }
        }

        fetchGeneration();
    }, [gen])


    useEffect(() => {
        // Chercher les pokemons qui commencent par ma valeur
        const filteredPokemons = pokemons.filter((pokemon) => { return pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase()) })
        setFilteredPokemons(filteredPokemons);

    }, [searchValue])


    return <>
        <Container className="d-flex flex-column align-items-center gap-3">
            <h1 className="text-capitalize">{gen}</h1>
            <Form className="col-11">
                <Form.Control type="text" placeholder="Bulbasaur, Charizard..."
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </Form>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {filteredPokemons.map((pokemon) => {
                    return <PokemonCard pokemonCard={pokemon} key={pokemon.name} />
                })}
            </div>
        </Container>
    </>;
}

export default PokemonByGeneration;