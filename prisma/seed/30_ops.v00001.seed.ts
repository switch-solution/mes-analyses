import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    }
)
import { Seed } from "./seedModel"

class OpsV00001Seed extends Seed {
    constructor(
        protected label: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(label, description, order, previousLabel)
    }

    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")

                await prisma.dsn_OPS.createMany({
                    data: [
                        {
                            id: '79448723100019',
                            label: 'URSSAF Provence-Alpes-Côte d\'Azur',
                            address1: '20, avenue Viton',
                            codeZip: '13299',
                            city: 'MARSEILLE CEDEX 20'
                        },
                        {
                            id: '90209799700016',
                            label: 'URSSAF Normandie',
                            address1: '22, rue d\'Isigny',
                            codeZip: '14045',
                            city: 'CAEN CEDEX 9'
                        },
                        {
                            id: '78299314100038',
                            label: 'URSSAF de Corse',
                            address1: 'BP 901',
                            codeZip: '20701',
                            city: 'AJACCIO CEDEX 9'
                        },
                        {
                            id: '79471473300019',
                            label: 'URSSAF Bourgogne',
                            address1: '8, boulevard Georges Clemenceau',
                            codeZip: '21037',
                            city: 'DIJON CEDEX 9'
                        },
                        {
                            id: '79507010100071',
                            label: 'URSSAF Franche-Comté',
                            address1: '3, Rue de Chatillon',
                            codeZip: '25480',
                            city: 'ECOLE-VALENTIN'
                        },
                        {
                            id: '53514650090018',
                            label: 'URSSAF Midi-Pyrénées (TGE)',
                            address1: '166, rue Pierre et Marie Curie',
                            codeZip: '31061',
                            city: 'TOULOUSE CEDEX 09'
                        },
                        {
                            id: '53514650000017',
                            label: 'URSSAF Midi-Pyrénées',
                            address1: '166, rue Pierre et Marie Curie',
                            codeZip: '31061',
                            city: 'TOULOUSE CEDEX 09'
                        },
                        {
                            id: '78877877700011',
                            label: 'URSSAF Aquitaine',
                            address1: '3, rue Théodore Blanc',
                            codeZip: '33084',
                            city: 'BORDEAUX CEDEX'
                        },
                        {
                            id: '75366412700077',
                            label: 'URSSAF Languedoc-Roussillon',
                            address1: '35, rue de La Haye',
                            codeZip: '34937',
                            city: 'MONTPELLIER'
                        },
                        {
                            id: '75375957000108',
                            label: 'URSSAF Bretagne',
                            address1: '6, rue Robert d\'Arbrissel',
                            codeZip: '35052',
                            city: 'RENNES CEDEX 9'
                        },
                        {
                            id: '53510475600015',
                            label: 'URSSAF Pays de la Loire',
                            address1: '3, rue Gaëtan Rondeau',
                            codeZip: '44000',
                            city: 'NANTES'
                        },
                        {
                            id: '79512003900107',
                            label: 'URSSAF Centre-Val de Loire',
                            address1: 'Parc du Moulin - 258 boulevard Duhamel du Monceau',
                            codeZip: '45166',
                            city: 'OLIVET CEDEX'
                        },
                        {
                            id: '79512003900081',
                            label: 'URSSAF Centre (TGE)',
                            address1: 'Place du Général de Gaulle',
                            codeZip: '45000',
                            city: 'ORLEANS'
                        },
                        {
                            id: '50933451200019',
                            label: 'CCSS de la Lozère',
                            address1: 'Quartier des Carmes',
                            codeZip: '48003',
                            city: 'MENDE CEDEX'
                        },
                        {
                            id: '75285582500010',
                            label: 'URSSAF Champagne-Ardenne',
                            address1: '202, rue des Capucins',
                            codeZip: '51089',
                            city: 'REIMS CEDEX'
                        },
                        {
                            id: '75333448100011',
                            label: 'URSSAF Lorraine',
                            address1: '6, rue Pasteur',
                            codeZip: '57032',
                            city: 'METZ CEDEX 1'
                        },
                        {
                            id: '75367340900011',
                            label: 'URSSAF Nord Pas-de-Calais',
                            address1: '293, avenue du President Hoover',
                            codeZip: '59032',
                            city: 'LILLE CEDEX'
                        },
                        {
                            id: '78366205990022',
                            label: 'URSSAF Nord Pas-de-Calais (TGE)',
                            address1: '293, avenue du President Hoover',
                            codeZip: '59032',
                            city: 'LILLE CEDEX'
                        },
                        {
                            id: '53513821800016',
                            label: 'URSSAF Auvergne',
                            address1: '4, rue Patrick Depailler',
                            codeZip: '63054',
                            city: 'CLERMONT FERRAND CEDEX 9'
                        },
                        {
                            id: '75357004300012',
                            label: 'URSSAF Alsace',
                            address1: '16, rue Contades',
                            codeZip: '67300',
                            city: 'SCHILTIGHEIM'
                        },
                        {
                            id: '79484650100011',
                            label: 'URSSAF Rhône-Alpes',
                            address1: '6, rue du 19 mars 1962',
                            codeZip: '69200',
                            city: 'VENISSIEUX'
                        },
                        {
                            id: '75366327700014',
                            label: 'URSSAF Picardie',
                            address1: '1, avenue du Danemark',
                            codeZip: '80000',
                            city: 'AMIENS'
                        },
                        {
                            id: '75364415200013',
                            label: 'URSSAF Poitou-Charentes',
                            address1: '3, avenue de la Révolution',
                            codeZip: '86046',
                            city: 'POITIERS CEDEX 9'
                        },
                        {
                            id: '75391952100017',
                            label: 'URSSAF Limousin',
                            address1: '11, rue Camille Pelletan',
                            codeZip: '87047',
                            city: 'LIMOGES CEDEX'
                        },
                        {
                            id: '78861779300013',
                            label: 'URSSAF Ile-de-France',
                            address1: '',
                            codeZip: '93518',
                            city: 'MONTREUIL CEDEX'
                        },
                        {
                            id: '31457202500307',
                            label: 'CGSS de la Guadeloupe',
                            address1: 'Quartier de l\'Hôtel de ville',
                            codeZip: '97159',
                            city: 'POINTE A PITRE CEDEX'
                        },
                        {
                            id: '31402496900029',
                            label: 'CGSS de la Martinique',
                            address1: 'LD Place d\'armes',
                            codeZip: '97210',
                            city: 'LE LAMENTIN'
                        },
                        {
                            id: '31519076900028',
                            label: 'CGSS de la Guyane',
                            address1: 'Espace Turenne-Radamonthe',
                            codeZip: '97307',
                            city: 'CAYENNE CEDEX'
                        },
                        {
                            id: '31463548300014',
                            label: 'CGSS de la Réunion',
                            address1: '4, boulevard Doret',
                            codeZip: '97703',
                            city: 'SAINT DENIS'
                        },


                    ]
                })


                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const opsV00001Seed = new OpsV00001Seed("OPS_V0001", "Ajout des organismes URSSAF", 30, "FORM_V0007")

