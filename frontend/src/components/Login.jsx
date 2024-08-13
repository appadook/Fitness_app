import React from 'react';
import {supabase} from '../services/supabaseClient'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import './Login.css'

const AuthPage = () => {
  return (
    <div className="login-page">
      <div className='login-container'>
        <h2>Login</h2>
      <div className='supabase-auth-container'>
        <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} 
        providers={['google']}  />
      </div>
    </div>
    </div>
    
  );
};

export default AuthPage;