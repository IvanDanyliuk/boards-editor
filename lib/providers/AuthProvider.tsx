import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import createBrowserClient from '../db/clients/browser';
import { toast } from 'sonner';


interface AuthContextValue {
  user: User | null;
  loading: boolean;
  handleSignOut: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (
    email: string,
    name: string,
    password: string,
    imageUrl: string | null,
    role: string,
    company: string | null,
    industry: string | null
  ) => Promise<void>;
  updateUser: (
    name: string,
    email: string | null,
    password: string | null,
    imageUrl: string | null,
    company: string | null,
    industry: string | null
  ) => Promise<{ success: boolean }>;
};


const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if(event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') {
        setUser(session?.user ?? null);
      } else if(event === 'SIGNED_OUT') {
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if(error) {
      toast.error(error.message);
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  async function handleLogin(email: string, password: string) {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if(error) {
      toast.error(error.message);
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  async function handleSignUp(
    email: string,
    name: string,
    password: string,
    imageUrl: string | null,
    role: string,
    company: string | null,
    industry: string | null
  ) {
    setLoading(true);

    const { error } = await supabase.auth.signUp({ 
      email, 
      password, 
      options: {
        data: {
          name,
          role, 
          imageUrl, 
          company, 
          industry,
        },
      },
    });

    if(error) {
      if(error.message === 'Database error saving new user') {
        toast.error('Username already taken');
      } else {
        toast.error(error.message);
      }
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  async function updateUser(
    name: string,
    email: string | null,
    password: string | null,
    imageUrl: string | null,
    company: string | null,
    industry: string | null
  ) {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ 
      data: {
        name,
        email, 
        password, 
        imageUrl,
        company,
        industry,
      }
    });

    setLoading(false);

    if(error) {
      if(error.message === 'Database error saving new user') {
        toast.error('Username already taken');
      } else {
        toast.error(error.message);
      }
      return { success: false };
    } else {
      router.refresh();
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        handleSignOut, 
        handleLogin, 
        handleSignUp, 
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }

  return context;
};