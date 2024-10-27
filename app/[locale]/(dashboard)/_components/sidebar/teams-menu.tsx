'use client';

import { getCookie } from 'cookies-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Team } from '@/lib/types';
import clsx from 'clsx';
import { ChevronsUpDown } from 'lucide-react';
import { setCurrentTeam } from '@/lib/actions/team.actions';
import { useEffect, useState } from 'react';


interface ITeamsMenu {
  teams: Team[];
};


export const TeamsMenu = ({ teams }: ITeamsMenu) => {
  const currentTeamId = getCookie('currentTeam');
  const [currentTeamName, setCurrentTeamName] = useState('No teams');

  useEffect(() => {
    if(teams.length > 0) {
      const currentTeam = teams.find(team => team.id === currentTeamId);
      if(currentTeam) {
        setCurrentTeamName(currentTeam.name);
      }
    }
  }, [teams, currentTeamId])

  if(teams.length === 0) {
    return (
      <div>No teams</div>
    )
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex justify-between items-center text-left'>
        {currentTeamName}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {teams.map(team => (
          <DropdownMenuItem 
            key={crypto.randomUUID()} 
            onClick={() => setCurrentTeam(team.id)}
            className={clsx('bg-white', team.id === currentTeamId && 'bg-slate-400')}
          >
            {team.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};