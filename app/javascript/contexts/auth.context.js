import { createContext } from 'react';
import { initialAuthState } from './auth.reducer';

export const AuthContext = createContext(initialAuthState);
