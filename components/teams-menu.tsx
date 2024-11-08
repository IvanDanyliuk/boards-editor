'use client';

import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import clsx from 'clsx';
import { ChevronsUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Team } from '@/lib/types';
import { setCurrentTeam } from '@/lib/actions/team.actions';


interface ITeamsMenu {
  teams: Team[];
};


export const TeamsMenu = ({ teams }: ITeamsMenu) => {
  const currentTeamId = getCookie('currentTeam');
  const [currentTeamName, setCurrentTeamName] = useState('No teams');

  useEffect(() => {
    if(teams.length > 0) {
      if(currentTeamId) {
        const currentTeam = teams.find(team => team.id === currentTeamId);
        if(currentTeam) {
          setCurrentTeamName(currentTeam.name);
        }
      } else {
        setCurrentTeamName(teams[0].name);
        setCookie('currentTeam', teams[0].id);
      }
    }
  }, [teams, currentTeamId])

  if(teams.length === 0) {
    return (
      <div>No teams</div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='px-3 py-2 flex justify-between items-center text-sm text-left font-semibold border border-spacing-1 rounded-md'>
        {currentTeamName}
        <ChevronsUpDown className='w-5 h-3' />
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