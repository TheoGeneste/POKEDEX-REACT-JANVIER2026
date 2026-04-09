import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TypeButton = ({type}) => {
    const navigate = useNavigate();

    return <>
        <Button className={type + " border-0 text-capitalize"} onClick={() => navigate('/type/'+type)}>{type}</Button>
    </>;
}
 
export default TypeButton;