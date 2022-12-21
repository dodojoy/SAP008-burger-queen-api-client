import React, { useState } from "react";
import { Inputs } from "../../components/inputs";
import { FooterAuth } from "../../components/footer";
import { OptionSelect } from "../../components/select";
import logo from '../../assets/logo.svg';
import '../login/login.css';
import '../../style.css';
import './register.css';
import '../../components/footer.css';
import { createUser } from '../../contexts/api';
import { errorMessage } from "../../errors/error";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const error = errorMessage.error;
  const [handleError, setHandleError] = useState('');
  const navigate = useNavigate();

  const teste = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setHandleError('As senhas devem combinar');
    } else {
      createUser(name, email, password, role)
        .then((response) => {
          if (response.status === 200) {
            navigate('/login');
            return response.json();
          }
          setHandleError(error[0].register[response.status]);
        })
        .then((data) => {
          if (!data) return;
          console.log(data.token);
          console.log(data);
        })
        .catch((error) => setHandleError(error));
    }
  }

  return (
    <div className="register-content">
      <section className='div-auth'>
        <img className='logo' src={logo} alt='logo'></img>
        <form>
          <Inputs className={'input-auth'} type='text' onChange={(e) => setName(e.target.value)} placeholder='NOME' class /><br />
          <Inputs className={'input-auth'} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='E-MAIL' class /><br />
          <Inputs className={'input-auth'} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='SENHA' /><br />
          <Inputs className={'input-auth'} type='password' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='CONFIRMAR SENHA' /><br />
          <select className="select-register input-auth" onChange={(e) => setRole(e.target.value)}  >
            <OptionSelect value='SUA FUNÇÃO' />
            <OptionSelect value='Atendente' />
            <OptionSelect value='Cozinheiro(a)' />
          </select>
          <p id='error-message'>{handleError}</p>
          <Inputs className={'input-auth'} type='submit' value='CADASTRAR' onClick={teste} />
        </form>
        <FooterAuth text1='Já possui uma conta?' text2='Faça login!' route={'/login'} />
      </section>
    </div>
  );
}
