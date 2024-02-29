import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";
import { userIsAdminClient, userIsAuthorizeInThisProject, userIsEditorProject, userIsValid, userIsEditorClient } from "@/src/query/security.query";
export class ActionError extends Error { }

export const action = createSafeActionClient({
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (e instanceof ActionError) {
            return e.message;
        }
        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware() {
        const userId = await getAuthSession()
        if (!userId) throw new ActionError("Vous devez etre connecté pour acceder à cette page.")
        return userId.user.id
    }
});

export const authentifcationAction = createSafeActionClient({
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (e instanceof ActionError) {
            return e.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware() {
        const userId = await userIsValid()
        if (!userId) {
            throw new ActionError("Vous devez etre connecté pour acceder à cette page.")
        }
        return userId
    }
})



export const authentifcationActionUserIsAuthorizeToEditProject = createSafeActionClient({
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (e instanceof ActionError) {
            return e.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const user = await userIsEditorProject((values as { projectSlug: string; }).projectSlug);
            return { clientId: user.clientId, userId: user.userId, projectLabel: user.projectLabel, softwareLabel: user.softwareLabel }

        }
        throw new ActionError("Une erreur est survenue.")
    }
})

export const authentifcationActionUserIsAuthorizeToProject = createSafeActionClient({
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (e instanceof ActionError) {
            return e.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const user = await userIsAuthorizeInThisProject((values as { projectSlug: string; }).projectSlug);
            return { clientId: user.clientId, userId: user.userId, projectLabel: user.projectLabel, softwareLabel: user.softwareLabel }

        }
        throw new ActionError("Une erreur est survenue.")
    }
})

export const authentificationActionUserIsAdminClient = createSafeActionClient({
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (e instanceof ActionError) {
            return e.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {

        if (typeof values === 'object' && values !== null && 'clientSlug' in values && typeof (values as any).clientSlug === 'string') {
            const user = await userIsAdminClient((values as { clientSlug: string; }).clientSlug);
            return { clientId: user.clientId, userId: user.userId }
        }
        throw new ActionError("Une erreur est survenue.")
    }
})

export const authentificationActionUserIsEditorClient = createSafeActionClient({
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (e instanceof ActionError) {
            return e.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {

        if (typeof values === 'object' && values !== null && 'clientSlug' in values && typeof (values as any).clientSlug === 'string') {
            const user = await userIsEditorClient((values as { clientSlug: string; }).clientSlug);
            return { clientId: user.clientId, userId: user.userId }
        }
        throw new ActionError("Une erreur est survenue.")
    }
})



