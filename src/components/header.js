export function HeaderSalon({ atendente, logo, logout }) {
	return (
		<div className='header-salon'>
            <img className='logo' src={logo} alt='logo'></img>
            <p className="role-name">Atendente: {atendente}</p>
            <img className='logout' src={logout} alt='logout logo'></img>
        </div>
	);
}