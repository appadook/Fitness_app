import React from 'react';
import {supabase} from '../services/supabaseClient'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const AuthPage = () => {
  return (
    <div>
      <h2>Login</h2>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  );
};

export default AuthPage;