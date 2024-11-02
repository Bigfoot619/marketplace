import { Link } from 'react-router-dom';
import './toolbar.css';
import ColorPicker from '../colorPicker/colorPicker';

const Toolbar = () => {

    return (
        <div className="toolbar">
            <Link className='toolbar-link' to="/home">Home</Link>
            <Link className='toolbar-link' to="/register">Register</Link>
            <Link className='toolbar-link' to="/login">Login</Link>
            <Link className='toolbar-link' to="/productNavigator">Products</Link>
            <Link className='toolbar-link' to="/userNavigator">Users</Link>
            <Link className='toolbar-link' to="/activities">Activites</Link>
            <Link className='toolbar-link' to="/tradeCenter">Trade Center</Link>
            <ColorPicker/>
            <Link className='toolbar-link' to="/contact">Contact</Link>
            <Link className='toolbar-link' to="/logout">Logout</Link>
        </div>
    );
};

export default Toolbar;
