'use client';

import { useEffect, useState } from 'react';
import createBrowserClient from '@/lib/db/clients/browser';
import { User } from '@supabase/supabase-js';

export const UserMenu = () => {
  const supabase = createBrowserClient();

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(res => setUserData(res.data.user));
  }, []);

  return (
    <div>
      {userData ? userData.email : 'Logged Out'}
    </div>
  );
};