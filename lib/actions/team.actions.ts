import { revalidatePath } from 'next/cache';
import createBrowserClient from '../db/clients/browser';


export const inviteUser = async ({ userId, teamId }: { userId: string, teamId: string }) => {
  const supabase = createBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);

  if(userError) {
    return {
      error: {
        invitingUser: [userError.message],
      },
    };
  }

  const { error: inviteError } = await supabase.auth.admin.updateUserById(userData.user.id, {
    user_metadata: {
      invitationLinks: [...userData.user.user_metadata.invitationLinks, teamId]
    }
  });

  if(inviteError) {
    return {
      error: {
        invitingError: [inviteError.message],
      },
    };
  }

  revalidatePath('/', 'layout');
};

export const acceptInvitation = async (teamId: string) => {
  const supabase = createBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if(userError) {
    return {
      error: {
        acceptInvitationRequest: [userError.message],
      },
    };
  }

  if(userData) {
    const unacceptedInitations = userData
      .user
      .user_metadata
      .invitationLinks
      .filter((unacceptedTeamId: string) => unacceptedTeamId !== teamId);

    const { data: updatedUserData, error: updatedUserError } = await supabase.auth.updateUser({
      data: {
        invitationLinks: unacceptedInitations,
        teams: [...userData.user.user_metadata.teams, teamId],
      }
    });

    if(updatedUserError) {
      return {
        error: {
          acceptInvitationRequest: [updatedUserError.message],
        },
      };
    }

    // TODO
    // 1. Find a team
    // 2. Add the user's ID to the memberIds field
  }

  revalidatePath('/', 'layout');
};

export const rejectInvitation = async (teamId: string) => {
  const supabase = createBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if(userError) {
    return {
      error: {
        acceptInvitationRequest: [userError.message],
      },
    };
  }

  if(userData && userData.user) {
    const unacceptedInitations = userData
      .user
      .user_metadata
      .invitationLinks
      .filter((unacceptedTeamId: string) => unacceptedTeamId !== teamId);

    const { error: updatedUserError } = await supabase.auth.updateUser({
      data: {
        invitationLinks: unacceptedInitations,
      }
    });

    if(updatedUserError) {
      return {
        error: {
          rejectInvitationRequest: [updatedUserError.message],
        },
      };
    }

    revalidatePath('/', 'layout');
  }
};

export const leaveTeam = async (teamId: string) => {
  const supabase = createBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if(userError) {
    return {
      error: {
        acceptInvitationRequest: [userError.message],
      },
    };
  }

  if(userData && userData.user) {
    const activeTeams = userData
      .user
      .user_metadata
      .teams
      .filter((activeTeamId: string) => activeTeamId !== teamId);

    const { data: updatedUser, error: updatedUserError } = await supabase.auth.updateUser({
      data: {
        teams: activeTeams,
      }
    });

    if(updatedUserError) {
      return {
        error: {
          rejectInvitationRequest: [updatedUserError.message],
        },
      };
    }
  }

  // TODO
  // 1. Find a team
  // 2. Remove the updated user's ID from the memeberIds field

  revalidatePath('/', 'layout');
};