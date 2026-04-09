import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({pokemonCard, width = "25rem"}) => {
    const navigate = useNavigate();
    let id = pokemonCard.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");

    return <>
        <Card style={{ width: width }} className="d-flex flex-column align-items-center" onClick={() => { navigate("/pokemon/"+pokemonCard.name)}}>
            <Card.Img variant="top" style={{ width: "200px", minHeight: "70%" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + id + ".svg"} />
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title className="text-center text-capitalize">{pokemonCard.name}</Card.Title>
                <Button variant="warning">Voir détails</Button>
            </Card.Body>
        </Card>
    </>;
}

export default PokemonCard;