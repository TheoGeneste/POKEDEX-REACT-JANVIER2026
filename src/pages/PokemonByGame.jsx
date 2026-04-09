import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gameService from "../services/gameService";
import { Container, Form, Spinner } from "react-bootstrap";
import PokemonCard from "../components/PokemonCard";

const PokemonByGame = () => {
    const { game } = useParams();
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const fetchGame = async () => {
            try {
                const response = await gameService.getGame(game);
                const responseBis = await gameService.getGroupeGame(response.data.version_group.name);
                let pokemons = [];
                for (let index = 0; index < responseBis.data.pokedexes.length; index++) {
                    const pokedex = responseBis.data.pokedexes[index];
                    const r = await gameService.getPokedex(pokedex.name);
                    pokemons = pokemons.concat(r.data.pokemon_entries);
                }

                setPokemons(pokemons);
                setFilteredPokemons(pokemons);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchGame();
    }, [game])

    useEffect(() => {
        // Chercher les pokemons qui commencent par ma valeur
        const filteredPokemons = pokemons.filter((pokemon) => { return pokemon.pokemon_species.name.toLowerCase().startsWith(searchValue.toLowerCase()) })
        setFilteredPokemons(filteredPokemons);

    }, [searchValue])

    return <>
        {loading ? <div className="d-flex justify-content-center"><Spinner /></div> :
            <Container className="d-flex flex-column align-items-center gap-3">
                <h1 className="text-capitalize">{game}</h1>
                <Form className="col-11">
                    <Form.Control type="text" placeholder="Bulbasaur, Charizard..."
                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </Form>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {filteredPokemons.map((pokemon) => {
                        return <PokemonCard pokemonCard={pokemon.pokemon_species} key={pokemon.pokemon_species.name} />
                    })}
                </div>
            </Container>}
    </>;
}

export default PokemonByGame;