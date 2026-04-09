import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import pokemonService from "../services/pokemonService";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import typeService from "../services/typeService";
import API from "../services/api";
import PokemonCard from "../components/PokemonCard";
import TypeButton from "../components/TypeButton";

const PokemonDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [isExisting, setIsExisting] = useState(true);
    const [stats, setStats] = useState([]);
    const [type, setType] = useState({});
    const [chain, setChain] = useState({});
    const navigate = useNavigate();

    const data = {
        labels: ['HP', 'Attaque', 'Defense', 'Attaque Spéciale', 'Défense Spéciale', 'Rapidité'],
        datasets: [
            {
                label: 'Stats',
                data: stats,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
            },
        ],
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await pokemonService.getPokemon(name);
                setIsExisting(true)
                setPokemon(response.data);
                // Traitement pour générer le tableau stats
                setStats(response.data.stats.map((stat) => {
                    return stat.base_stat;
                }));

                const responseBis = await typeService.getType(response.data.types[0].type.name)
                setType(responseBis.data);

            } catch (error) {
                console.error(error);
                setIsExisting(false)
            }
        }

        const fetchPokemonSpecies = async () => {
            try {
                const response = await pokemonService.getPokemonSpecies(name)
                setPokemonSpecies(response.data)
                const responseBis = await API.get(response.data.evolution_chain.url)
                setChain(responseBis.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPokemon();
        fetchPokemonSpecies();
    }, [name])


    return <>
        <Container>
            {isExisting ? <>
                {/* {pokemon.cries && <audio src={pokemon.cries.latest} autoPlay />} */}
                <h1 className="text-capitalize text-center">{pokemonSpecies.names && pokemonSpecies.names.find(entry => entry.language.name == "fr").name} #{pokemon.id}</h1>
                <Row>
                    <Col className="d-flex flex-column align-items-center">
                        {pokemon.sprites && <Image className="col-8" src={pokemon.sprites.other.dream_world.front_default} />}
                        <Radar id="1" data={data} />
                    </Col>
                    <Col>
                        <h4>{pokemonSpecies.flavor_text_entries && pokemonSpecies.flavor_text_entries.find(entry => entry.language.name == "fr")?.flavor_text || "Pas de description"}</h4>
                        <h6 className="border-top border-dark">Game versions : </h6>
                        <div className="d-flex gap-2 flex-wrap">
                            {pokemon.game_indices && pokemon.game_indices.map((game) => {
                                return <Button onClick={()=> {navigate('/game/'+game.version.name)}} key={game.version.name} className={game.version.name + " text-capitalize border-0"}>{game.version.name}</Button>
                            })}
                        </div>
                        <Row className="mt-4 border-top border-dark pt-2">
                            <Col>
                                <p>Poids : {pokemon.weight / 10}Kg</p>
                                <p>Taille : {pokemon.height / 10}M</p>
                            </Col>
                            <Col className="d-flex flex-column gap-3">
                                {pokemon.abilities && pokemon.abilities.map((ability) => {
                                    return <Button key={ability.ability.name} variant="dark">{ability.ability.name}</Button>
                                })}
                            </Col>
                        </Row>
                        <h3 className="border-top border-dark mt-4 border-top border-dark">Types : </h3>
                        <div className="d-flex gap-2">
                            {pokemon.types && pokemon.types.map((type) => {
                                return <TypeButton key={type.type.name} type={type.type.name} />
                            })}
                        </div>
                        <h3 className="border-top border-dark mt-4 border-top border-dark">Faible contre : </h3>
                        <div className="d-flex gap-2">
                            {type.damage_relations && type.damage_relations.double_damage_from.map((type) => {
                                return <TypeButton key={type.name} type={type.name} />
                            })}
                        </div>
                        <h3 className="border-top border-dark mt-4 border-top border-dark">Fort contre : </h3>
                        <div className="d-flex gap-2">
                            {type.damage_relations && type.damage_relations.double_damage_to.map((type) => {
                                return <TypeButton key={type.name} type={type.name} />
                            })}
                        </div>
                        <h3 className="border-top border-dark mt-4 border-top border-dark">Chaine d'évolution : </h3>
                        <Row>
                            <Col>{chain.chain && <PokemonCard pokemonCard={chain.chain.species} width="10rem" />}</Col>
                            <Col>{chain.chain && chain.chain.evolves_to[0] && <PokemonCard pokemonCard={chain.chain.evolves_to[0].species} width="10rem" />}</Col>
                            <Col>{chain.chain && chain.chain.evolves_to[0] && chain.chain.evolves_to[0].evolves_to[0] && <PokemonCard pokemonCard={chain.chain.evolves_to[0].evolves_to[0].species} width="10rem" />}</Col>
                        </Row>
                    </Col>
                </Row>
            </> : <>
                <h1>Le pokemon {name} n'existe pas</h1>
            </>}
        </Container>
    </>;
}

export default PokemonDetails;