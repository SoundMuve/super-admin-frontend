import { useNavigate } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface _Props {
    _onClick?: () => void
};

const BackNavigationArrowBtn: React.FC<_Props> = ({
    _onClick 
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (_onClick) {
            _onClick()
        } else {
            navigate(-1)
        }
    }
    

    return (
        <IconButton size='small' onClick={() => handleClick()}>
            <NavigateBeforeIcon sx={{ fontSize: "24px" }} />
        </IconButton>
    );
}

export default BackNavigationArrowBtn;