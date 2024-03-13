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

class FormV0007Seed extends Seed {
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

                //Update etablissement

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "NIC",
                        },
                        dsnType: 'DSN_NIC'
                    },
                    data: {
                        dsnItem: 'S21.G00.11.001'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "SIREN",
                        },
                        dsnType: 'DSN_SIREN'
                    },
                    data: {
                        dsnItem: 'S21.G00.06.001'
                    }
                })



                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "Adresse",
                        },
                        dsnType: 'DSN_Etablissement_Adresse_1'
                    },
                    data: {
                        dsnItem: 'S21.G00.11.003'
                    }
                })

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "Complément adresse",

                        },
                        dsnType: 'DSN_Etablissement_Adresse_2'

                    },
                    data: {
                        dsnItem: 'S21.G00.11.006'
                    }
                })

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "Adresse 3",

                        },
                        dsnType: 'DSN_Etablissement_Adresse_3'

                    },
                    data: {
                        dsnItem: 'S21.G00.11.007'
                    }
                })

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "code postal",

                        },
                        dsnType: 'DSN_Etablissement_Code_Postal'

                    },
                    data: {
                        dsnItem: 'S21.G00.11.004'
                    }
                })

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Etablissement",
                            formType: "DSN_ETABLISSEMENT",
                            formVersion: 1,
                            label: "Ville",

                        },
                        dsnType: 'DSN_Etablissement_Ville'

                    },
                    data: {
                        dsnItem: 'S21.G00.11.005'
                    }
                })

                //Update Job
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Emploi",
                            formType: "DSN_EMPLOI",
                            formVersion: 1,
                            label: "Libellé emploi",

                        },
                        dsnType: 'DSN_Emploi_Libelle'

                    },
                    data: {
                        dsnItem: 'S21.G00.40.006'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Emploi",
                            formType: "DSN_EMPLOI",
                            formVersion: 1,
                            label: "Libellé emploi",

                        },
                        dsnType: 'DSN_Emploi_Libelle'

                    },
                    data: {
                        dsnItem: 'S21.G00.40.006'
                    }
                })

                //Code Idcc

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Convention collective",
                            formType: "DSN_CONVENTION_COLLECTIVE",
                            formVersion: 1,
                            label: "Code IDCC",

                        },
                        dsnType: 'DSN_Convention_Collective_IDCC'

                    },
                    data: {
                        dsnItem: 'S21.G00.11.022'
                    }
                })

                //Rate AT

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Taux AT",
                            formType: "DSN_TAUX_AT",
                            formVersion: 1,
                            label: "Code taux AT",

                        },
                        dsnType: 'DSN_Code_AT'
                    },
                    data: {
                        dsnItem: 'S21.G00.40.040'
                    }
                })

                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Taux AT",
                            formType: "DSN_TAUX_AT",
                            formVersion: 1,
                            label: "Taux AT",

                        },
                        dsnType: 'DSN_Taux_AT'
                    },
                    data: {
                        dsnItem: 'S21.G00.40.043'
                    }
                })


                //Contrat mutuelle, prévoyance, retraite supplémentaire
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1,
                            label: "Code organisme DSN",

                        },
                        dsnType: 'DSN_Contrat_Organisme_ID'
                    },
                    data: {
                        dsnItem: 'S21.G00.15.001'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1,
                            label: "Numéro ordre dans la DSN",

                        },
                        dsnType: 'DSN_Contrat_ID'
                    },
                    data: {
                        dsnItem: 'S21.G00.15.001'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1,
                            label: "Libellé de organisme",

                        },
                        dsnType: 'DSN_Contrat_Organime'
                    },
                    data: {
                        dsnItem: 'S21.G00.15.002'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1,
                            label: "Libellé du délégataire",

                        },
                        dsnType: 'DSN_Contrat_Deleguataire'
                    },
                    data: {
                        dsnItem: 'S21.G00.15.003'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1,
                            label: "Libellé population",

                        },
                        dsnType: 'DSN_Population_Contrat'
                    },
                    data: {
                        dsnItem: 'S21.G00.15.004'
                    }
                })
                await prisma.form_Input.update({
                    where: {
                        formTitle_formType_formVersion_label: {
                            formTitle: "Contrat DSN",
                            formType: "DSN_CONTRAT",
                            formVersion: 1,
                            label: "Numéro ordre dans la DSN",

                        },
                        dsnType: 'DSN_Contrat_ID'
                    },
                    data: {
                        dsnItem: 'S21.G00.15.005'
                    }
                })




                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const formV0007Seed = new FormV0007Seed("FORM_V0007", "Update des FORM_INPUT avec les structures DSN", 29, "ITEM_V0001")

