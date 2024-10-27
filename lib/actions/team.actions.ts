'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z as zod } from 'zod';
import db from '../db';
import { PROFILE_IMAGE_FILE_TYPES, PROFILE_IMAGE_MAX_FILE_SIZE } from '../constants';
import { teams } from '../db/schema';
import { getRandomHexColor } from '../helpers';
import { uploadImage } from '../db/storage/client';
import { createServerClient } from '../db/clients/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


const teamSchema = zod.object({
  name: zod.string().min(1, 'Name is required').max(100),
  profilePhoto: zod
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size !== 0 || file.size < PROFILE_IMAGE_MAX_FILE_SIZE, 'File size must be less than 3Mb')
    .refine(file => !file || file.type === '' || PROFILE_IMAGE_FILE_TYPES.includes(file.type), 'The image must have one of the following formats: JPEG, PNG, SVG')
});


export const inviteUser = async ({ userId, teamId }: { userId: string, teamId: string }) => {
  const supabase = createServerClient();
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
  const supabase = createServerClient();
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
  const supabase = createServerClient();
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
  const supabase = createServerClient();
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

export const createTeam = async (prevState: any, formData: FormData) => {
  try {
    const name = formData.get('name') as string;
    const teamLogo = formData.get('teamLogo') as any;

    const validatedFields = teamSchema.safeParse({
      name, teamLogo
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    };

    const supabase = createServerClient();
    const { data, error } = await supabase.auth.getUser();

    if(error) {
      return {
        error: {
          getUserError: [error.message],
        },
      };
    }

    const uploadedTeamLogo = teamLogo.size !== 0 ? await uploadImage({
      file: teamLogo,
      bucket: process.env.SUPABASE_STORAGE_BUCKET!,
    }) : null;

    if(uploadedTeamLogo && uploadedTeamLogo.message) {
      throw new Error(uploadedTeamLogo.message)
    }

    const teamLogoUrl = uploadedTeamLogo ? uploadedTeamLogo.imageUrl : '';
    const teamId = crypto.randomUUID();

    await db.insert(teams).values({
      id: teamId,
      name,
      admin: data.user.id,
      teamColor: getRandomHexColor(),
      teamLogo: teamLogoUrl,
      memberIds: [data.user.id],
      projectIds: [],
    });

    cookies().set('currentTeam', teamId);

    revalidatePath('/', 'layout');
  } catch (error: any) {
    return {
      error: {
        team: [error.message],
      },
    };
  }
};

export const fetchTeams = async (userId: string) => {
  try {
    const userTeams = await db.select().from(teams).where(eq(teams.memberIds, [userId]));
    return {
      data: userTeams,
      error: null,
    };
  } catch (error: any) {
    return {
      data: [],
      error: {
        fetchTeams: [error.message],
      },
    };
  }
};

export const setCurrentTeam = (teamId: string) => {
  cookies().set('currentTeam', teamId);
};