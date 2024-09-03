'use client'

import { useAuth } from "@/lib/providers/AuthProvider";

export const UserMenu = () => {
  const { user, loading, handleLogin, handleSignOut } = useAuth();

  return (
    <div>
      {user ? 'Logged In' : 'Logged Out'}
    </div>
  );
};