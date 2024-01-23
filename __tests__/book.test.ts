// FILEPATH: /Users/denisnicolas/Documents/Developpement.nosync/switch_solution/mes-analyses/src/features/actions/book/book.actions.test.ts
import { createBook } from '@/src/features/actions/book/book.actions';
import { getAuthSession } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { jest } from 'jest';
import { BookFormSchema } from '@/src/helpers/definition';

jest.mock('path-to-your-auth-module');
jest.mock('path-to-your-prisma-instance');
jest.mock('path-to-your-routing-module');
jest.mock('path-to-your-schema');

describe('createBook', () => {
    it('throws an error if the user is not authenticated', async () => {
        (getAuthSession as jest.Mock).mockResolvedValue(null);

        await expect(createBook(new FormData())).rejects.toThrow("Vous devez être connecté pour effectuer cette action.");
    });

    it('throws an error if the user is not an editor', async () => {
        (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
        (userIsEditorClient as jest.Mock).mockResolvedValue(false);

        await expect(createBook(new FormData())).rejects.toThrow("Vous n'avez pas les droits pour effectuer cette action.");
    });

    it('creates a new book if the user is authenticated and an editor', async () => {
        const formData = new FormData();
        formData.append('name', 'Test Book');
        formData.append('softwareId', '1');

        (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
        (userIsEditorClient as jest.Mock).mockResolvedValue(true);
        (BookFormSchema.parse as jest.Mock).mockReturnValue({ name: 'Test Book', softwareId: '1' });
        (prisma.standard_Book.create as jest.Mock).mockResolvedValue({ id: '1' });

        await createBook(formData);

        expect(prisma.standard_Book.create).toHaveBeenCalledWith({
            data: {
                name: 'Test Book',
                softwareId: '1',
                createdBy: '1',
            }
        });
        expect(revalidatePath).toHaveBeenCalledWith('/editor/book/');
        expect(redirect).toHaveBeenCalledWith('/editor/book/1');
    });
});