import logo from '../assets/logo.svg';
import logout from '../assets/logout.svg';

export function HeaderSalon({ role, nameRole, handleOnClick }) {
	return (
		<div className='header-salon'>
            <img className='logo' src={logo} alt='logo'></img>
            <p className="role-name">{role}: {nameRole}</p>
            <img className='logout' src={logout} alt='logout logo' onClick={handleOnClick}></img>
        </div>
	);
}