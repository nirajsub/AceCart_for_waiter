import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Table from './Table';


function Login() {
  let {loginUser,islogged,pwerr,setPwerr,loadings} = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const handleCloseMessage = () => {
    setPwerr(false)
  }

  return (
    islogged ? <Table /> :
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>Login as Waiter</span></div>
        <form onSubmit={loginUser}>
          <div className="row">
            <input type="text" placeholder="Username" name="username" required value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="row">
            <input type="password" placeholder="Password" name="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          
          <div className="row button">
            <input type="submit" value="Login" />

            {pwerr && (
            <div className="alert-box-login">
              <span className="close-btn" onClick={handleCloseMessage}>&times;</span>
               <p>Invalid username or password</p>
            </div>
            )}

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
