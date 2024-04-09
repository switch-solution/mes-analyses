import { createSafeActionClient } from "next-safe-action";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { User } from "@/src/classes/user";
export class ActionError extends Error { }

export const action = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }
        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware() {
        const security = new Security()
        const session = await security.session()
        if (!session) throw new ActionError("Vous devez etre connecté pour acceder à cette page.")
        return session.user.id
    }
});

export const authentifcationAction = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware() {
        const security = new Security()
        const userId = await security.userIsValid()
        if (!userId) {
            throw new ActionError("Vous devez etre connecté pour acceder à cette page.")
        }
        return userId.id
    }
})



export const authentifcationActionUserIValidatorProject = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const security = new Security()
            const user = await security.isValidatorInThisProject((values as { projectSlug: string; }).projectSlug);
            return { clientId: user.projectClientId, userId: user.userId, projectLabel: user.projectLabel, softwareLabel: user.projectSoftwareLabel }

        }
        throw new ActionError("Une erreur est survenue.")
    }
})


export const authentifcationActionUserIsAuthorizeToEditProject = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const security = new Security()
            const user = await security.isEditorInThisProject((values as { projectSlug: string; }).projectSlug);
            return { clientId: user.projectClientId, userId: user.userId, projectLabel: user.projectLabel, softwareLabel: user.projectSoftwareLabel }

        }
        throw new ActionError("Une erreur est survenue.")
    }
})
export const authentifcationActionUserIsAuthorizeToAdminProject = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const security = new Security()
            const user = await security.isAdministratorInThisProject((values as { projectSlug: string; }).projectSlug);
            return { clientId: user.projectClientId, userId: user.userId, projectLabel: user.projectLabel, softwareLabel: user.projectSoftwareLabel }

        }
        throw new ActionError("Une erreur est survenue.")
    }
})

export const authentifcationActionUserIsAuthorizeToProject = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const security = new Security()
            const user = await security.isAuthorizedInThisProject((values as { projectSlug: string; }).projectSlug);
            return { clientId: user.projectClientId, userId: user.userId, projectLabel: user.projectLabel, softwareLabel: user.projectSoftwareLabel }

        }
        throw new ActionError("Une erreur est survenue.")
    }
})

export const authentificationActionUserIsAdminClient = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {

        if (typeof values === 'object' && values !== null && 'clientSlug' in values && typeof (values as any).clientSlug === 'string') {
            const security = new Security()
            const client = new Client((values as { clientSlug: string; }).clientSlug)
            const clientExist = await client.clientExist()
            if (!clientExist) throw new ActionError("Le client n'existe pas.")
            const clientDetail = await client.clientDetail()
            if (!clientDetail) throw new ActionError("La fiche client est incomplète.")
            const user = await security.isAdministratorClient(clientDetail.siren);
            return { clientId: user.clientId, userId: user.userId, clientSlug: user.client.slug }
        }
        throw new ActionError("Une erreur est survenue.")
    }
})

export const authentificationActionUserIsEditorClient = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'clientSlug' in values && typeof (values as any).clientSlug === 'string') {
            const security = new Security()
            const client = new Client((values as { clientSlug: string; }).clientSlug)
            const clientExist = await client.clientExist()
            if (!clientExist) throw new ActionError("Le client n'existe pas.")
            const clientDetail = await client.clientDetail()
            if (!clientDetail) throw new ActionError("La fiche client est incomplète.")
            const userIsEditor = await security.isEditorClient(clientDetail.siren);
            const user = new User(userIsEditor.userId)
            const software = await user.getMySoftwareActive()
            return { clientId: userIsEditor.clientId, userId: userIsEditor.userId, clientSlug: userIsEditor.client.slug, softwareSlug: software.softwareSlug, softwareLabel: software.softwareLabel }
        }

        throw new ActionError("Une erreur est survenue lors de la vérification de vos droits.")
    }
})

export const authentificationActionUserIsEditorClientFormData = createSafeActionClient({

    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }

        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {

        if (typeof values === 'object' && values !== null && 'clientSlug' in values && typeof (values as any).clientSlug === 'string') {
            const security = new Security()
            const user = await security.isEditorClient((values as { clientSlug: string; }).clientSlug);
            return { clientId: user.clientId, userId: user.userId, clientSlug: user.client.slug }
        }
        throw new ActionError("Une erreur est survenue lors de la verification du formData.")
    }
})



