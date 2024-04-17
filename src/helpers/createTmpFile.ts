import fs from 'fs';
import path from 'path';
export const ensureDirectoryExistence = () => {
    const project = process.cwd();
    const testPath = path.join(project, 'tmp');
    if (!fs.existsSync(testPath)) {
        fs.mkdirSync(testPath, { recursive: true });
    }

    const randomSubDirName = Math.random().toString(36).substring(2, 15);
    const randomSubDirPath = path.join(testPath, randomSubDirName);

    // Créer le sous-répertoire
    if (!fs.existsSync(randomSubDirPath)) {
        fs.mkdirSync(randomSubDirPath);
    }

    return randomSubDirPath;
}

