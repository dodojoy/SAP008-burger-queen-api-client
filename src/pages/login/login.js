import React, { useState } from "react";
import { FooterAuth } from "../../components/footer";
import { Inputs } from "../../components/inputs";
import logo from '../../assets/logo.svg';
import './login.css'
import '../../style.css'
import '../../components/footer.css'
import { login, saveToken } from "../../contexts/api";
import { useNavigate } from 'react-router-dom';
import { errorMessage } from "../../errors/error";
import { saveUser } from "../../contexts/api";

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [handleError, setHandleError] = useState('');
	const navigate = useNavigate();
	const error = errorMessage.error;

	const loginEvent = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setHandleError('Preencha todos os campos')
		} else {
			login(email, password)
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					}
					setHandleError(error[0].login[response.status]);
				})
				.then((data) => {
					if (!data) return;
					if (data.role === 'atendente') {
						navigate('/salon')
					} else if (data.role === 'cozinheiro(a)') {
						navigate('/kitchen')
					}
					saveToken(data.token);
					saveUser(data.name);
				})
				.catch((error) => setHandleError(error));
		};
	};

	return (
		<div className="login-content">
			<section className='div-auth'>
				<img className='logo' src={logo} alt='logo'></img>
				<form>
					<Inputs type='email' placeholder='E-MAIL' onChange={(e) => setEmail(e.target.value)} class /><br />
					<Inputs type='password' placeholder='SENHA' onChange={(e) => setPassword(e.target.value)} /><br />
					<p id='error-message'>{handleError}</p>
					<Inputs type='submit' value='ENTRAR' onClick={loginEvent}/>
				</form>
				<FooterAuth text1='Não possui uma conta?' text2='Cadastre-se!' onClick={() => navigate('/register')} />
			</section>
		</div>
	);
};
