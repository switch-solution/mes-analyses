
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

class InputV0001Seed extends Seed {
    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(name, description, order, previousLabel)
    }
    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Input_text",
                        typeHtml: "text",
                        label: "Champ texte",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "number",
                    },
                    update: {},
                    create: {
                        code: "Input_number",
                        typeHtml: "number",
                        label: "Champ numérique",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "date",
                    },
                    update: {},
                    create: {
                        code: "Input_date",
                        typeHtml: "date",
                        label: "Champ date",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "select",
                    },
                    update: {},
                    create: {
                        code: "Select",
                        typeHtml: "select",
                        label: "Liste déroulante",
                        createdBy: "system"
                    }
                })

                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_SIRET",
                        typeHtml: "text",
                        isDsn: true,
                        label: "SIRET de l'établissement",
                        createdBy: "system"
                    }
                })

                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_NIC",
                        typeHtml: "text",
                        isDsn: true,
                        label: "NIC de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_APE",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code APE de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Champ adresse 1 de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Champ adresse 2 de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Champ adresse 3 de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Etablissement_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de l'établissement",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Emploi_Libelle",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Libellé de l'emploi",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Convention_Collective_IDCC",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code IDCC de la convention collective",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Libelle_Convention_Collective",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code IDCC de la convention collective",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Contrat_Deleguataire",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Délégataire du contrat DSN",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Population_Contrat",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Population du contrat DSN",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Contrat_ID",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Identifiant du contrat DSN",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Contrat_Organime",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Organisme du contrat DSN",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Taux_AT",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Taux AT",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Code_Risque_AT",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code risque AT",
                        createdBy: "system"
                    }
                })

                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_URSSAF_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "URSSAF_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_URSSAF_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_URSSAF_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_URSSAF_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_URSSAF_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_URSSAF_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de l'URSSAF",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_MSA_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de la MSA",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_MSA_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de la MSA",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_MSA_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de la MSA",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_MSA_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de la MSA",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_MSA_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de la MSA",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_MSA_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de la MSA",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de la caisse de retraite",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de la caisse de retraite",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de la caisse de retraite",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de la caisse de retraite",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de la caisse de retraite",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de la caisse de retraite",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Prevoyance_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de la caisse de prévoyance",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Prevoyance_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de la caisse de prévoyance",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Prevoyance_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de la caisse de prévoyance",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Prevoyance_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de la caisse de prévoyance",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Prevoyance_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de la caisse de prévoyance",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Prevoyance_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de la caisse de prévoyance",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Mutuelle_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Mutuelle_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Mutuelle_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Mutuelle_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Mutuelle_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Mutuelle_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Supplementaire_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Supplementaire_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Supplementaire_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Supplementaire_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Supplementaire_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Retraite_Supplementaire_Ville",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Ville de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Caisse_Conge_Paye_Code",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code de la caisse de la caisse de congé payé",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Caisse_Conge_Paye_Adresse_1",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 1 de la caisse de la caisse de congé payé",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Caisse_Conge_Paye_Adresse_2",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 2 de la caisse de la caisse de retraite supplémentaire",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Conge_Paye_Adresse_3",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Adresse 3 de la caisse de la caisse de congé payé",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Conge_Paye_Code_Postal",
                        typeHtml: "text",
                        isDsn: true,
                        label: "Code postal de la caisse de congé payé",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "DSN_Caisse_Conge_Paye_Ville",
                        typeHtml: "text",
                        label: "Ville de la caisse de congé payé",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Caisse_CP_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Retraite_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "MSA_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Mutuelle_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Prevoyance_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Retraite_Supplementaire_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "Taux_AT_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Code postal de la caisse de mutuelle",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "STD_Absence_Sécurité_Sociale_Code",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Absences SS",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "STD_Absence_Hors_Sécurité_Sociale_Code",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Absences SS",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "STD_Absence_Hors_Sécurité_Sociale_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Absences SS libellé",
                        createdBy: "system"
                    }
                })
                await prisma.input.upsert({
                    where: {
                        code: "text",
                    },
                    update: {},
                    create: {
                        code: "STD_Absence_Sécurité_Sociale_Libelle",
                        typeHtml: "text",
                        isOtherData: true,
                        label: "Absences SS libellé",
                        createdBy: "system"
                    }
                })


                await this.seedUpdateStatus("completed")

            }
        } catch (err) {
            console.log(err)
            await this.seedUpdateStatus("error")
            await this.updateError(JSON.stringify(err))
        }

    }
}

export const inputV0001Seed = new InputV0001Seed("INPUT_V0001", "Création des champs pour le constructeur de formulaire", 26, "BOOK_V0013")

