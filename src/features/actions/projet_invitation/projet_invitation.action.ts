"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { InvitationProjectSchema, InvitationInternalProjectSchema } from "@/src/helpers/definition"
import z from "zod";
import { authentifcationActionUserIsAuthorizeToAdminProject, ActionError } from "@/lib/safe-actions";
import { getClientBySlug } from "@/src/query/client.query";
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { apiFetch } from "@/src/helpers/api";
import { Project } from "@/src/classes/project";
export const createInvitationProject = authentifcationActionUserIsAuthorizeToAdminProject(InvitationProjectSchema, async (values: z.infer<typeof InvitationProjectSchema>, { clientId, userId }) => {





})

export const createInternalInvitationProject = authentifcationActionUserIsAuthorizeToAdminProject(InvitationInternalProjectSchema, async (values: z.infer<typeof InvitationInternalProjectSchema>, { clientId, userId, projectLabel, softwareLabel }) => {


})