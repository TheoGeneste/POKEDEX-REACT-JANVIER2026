import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import pokemonService from "../services/pokemonService";
import { Container } from "react-bootstrap";
import PokemonCard from "../components/PokemonCard";

const SearchPage = () => {
    const location = useLocation();
const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        console.log(location.state?.searchValue);
        
        const fetchPokemons = async () => {
            try {
                const response = await pokemonService.getPokemons(0, 5000);
                setPokemons(response.data.results.filter((element) => element.name.toLowerCase().startsWith(location.state?.searchValue)));
            } catch (error) {
                console.error(error);
            }
        }
        fetchPokemons();
    }, [location.state])



    return <>
        <Container className="d-flex flex-column align-items-center gap-3">
            <h1>Recherche</h1>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {pokemons.map((pokemon) => {
                    return <PokemonCard pokemonCard={pokemon} key={pokemon.name} />
                })}
            </div>
        </Container>
    </>;
}

export default SearchPage;