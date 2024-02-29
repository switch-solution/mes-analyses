export const generateSlug = async (str: string) => {
    return str
        .toLowerCase() // Convertit la chaîne en minuscules
        .replace(/[àáâãäå]/g, 'a') // Remplace les caractères accentués par leur équivalent sans accent
        .replace(/[^a-z0-9]+/g, '-') // Remplace tous les caractères non alphanumériques par des tirets
        .replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
}

export const syncGenerateSlug = (str: string) => {

    return str
        .toLowerCase() // Convertit la chaîne en minuscules
        .replace(/[àáâãäå]/g, 'a') // Remplace les caractères accentués par leur équivalent sans accent
        .replace(/[^a-z0-9]+/g, '-') // Remplace tous les caractères non alphanumériques par des tirets
        .replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
}