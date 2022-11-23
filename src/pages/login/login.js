import React, { useState } from "react";
import { FooterAuth } from "../../components/footer";
import { Inputs } from "../../components/inputs";
import logo from '../../assets/logo.svg';
import './login.css'
import '../../style.css'
import { login, saveToken } from "../../contexts/api";
import { useNavigate } from 'react-router-dom';
import { errorMessage } from "../../errors/error";

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const error = errorMessage.error;

	const loginEvent = (e) => {
		e.preventDefault();
		const tagErrorMessage = document.querySelector('#error-message');
		if (email === '' || password === '') {
			tagErrorMessage.innerHTML = 'Preencha todos os campos'
		} else {
			login(email, password)
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					}
					tagErrorMessage.innerHTML = error[0].login[response.status];
				})
				.then((data) => {
					if (!data) return;
					if (data.role === 'atendente') {
						navigate('/salon')
					} else if (data.role === 'cozinheiro(a)') {
						navigate('/kitchen')
					}
					saveToken(data.token);
				})
				.catch((erro) => console.log(erro));
		};
	};

	return (
		<section className='div-auth'>
			<img className='logo' src={logo} alt='logo'></img>
			<form>
				<Inputs type='email' placeholder='E-MAIL' onChange={(e) => setEmail(e.target.value)} class /><br />
				<Inputs type='password' placeholder='SENHA' onChange={(e) => setPassword(e.target.value)} /><br />
				<p id='error-message'></p>
				<Inputs type='submit' value='ENTRAR' onClick={loginEvent}/>
			</form>
			<FooterAuth text1='Não possui uma conta?' text2='Cadastre-se!' href='register' />
		</section>
	);
};
