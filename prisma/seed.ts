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

async function main() {
    try {
        await prisma.setting.upsert({
            where: {
                code_dateStart_dateEnd: {
                    code: "PRICING",
                    dateStart: new Date("2024-01-01"),
                    dateEnd: new Date("4000-01-01")
                }
            },
            update: {},
            create: {
                code: "PRICING",
                label: "Prix",
                dateStart: new Date("2024-01-01"),
                dateEnd: new Date("4000-01-01"),
                description: "Prix par default pour un utilisateur par mois",
                value: "10",
                createdBy: "admin"
            }


        })
        await prisma.standard_Input.upsert({
            where: {
                type: "text",
            },
            update: {},
            create: {
                name: "Input_text",
                type: "text",
                label: "Champ texte",
                createdBy: "admin"
            }


        })
        console.log("Input_text created")
        await prisma.standard_Input.upsert({
            where: {
                type: "number",
            },
            update: {},
            create: {
                name: "Input_number",
                type: "number",
                label: "Champ numérique",
                createdBy: "admin"
            }


        })
        console.log("Input_number created")
        await prisma.standard_Input.upsert({
            where: {
                type: "date",
            },
            update: {},
            create: {
                name: "Input_date",
                type: "date",
                label: "Champ date",
                createdBy: "admin"
            }


        })
        console.log("Input_date created")
        await prisma.standard_Input.upsert({
            where: {
                type: "select",
            },
            update: {},
            create: {
                name: "Select",
                type: "select",
                label: "Liste déroulante",
                createdBy: "admin"
            }


        })
        console.log("Select created")
        await prisma.standard_Input.upsert({
            where: {
                type: "switch",
            },
            update: {},
            create: {
                name: "Switch",
                type: "switch",
                label: "Bouton switch",
                createdBy: "admin"
            }


        })
        console.log("Switch created")
        await prisma.standard_Input.upsert({
            where: {
                type: "Textarea",
            },
            update: {},
            create: {
                name: "Textarea",
                type: "Textarea",
                label: "Zone de texte",
                createdBy: "admin"
            }


        })
        console.log("Textarea created")
        await prisma.standard_Input.upsert({
            where: {
                type: "Image",
            },
            update: {},
            create: {
                name: "Image",
                type: "Image",
                label: "Image",
                createdBy: "admin"
            }
        })
        console.log("Image created")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietySiren",
            },
            update: {},
            create: {
                name: "Siren DSN",
                type: "dsnSocietySiren",
                label: "Siren de la société",
                createdBy: "admin"
            }
        })
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietySiren",
            },
            update: {},
            create: {
                name: "Raison sociale de la société",
                type: "dsnSocietySiren",
                label: "Raison sociale de la société",
                createdBy: "admin"
            }
        })
        console.log("Siren dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentSiret",
            },
            update: {},
            create: {
                name: "Siret DSN",
                type: "dsnEstablishmentSiret",
                label: "Siret de l'établissement",
                createdBy: "admin"
            }
        })
        console.log("Siren dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentApe",
            },
            update: {},
            create: {
                name: "APE DSN",
                type: "dsnEstablishmentApe",
                label: "APE DSN",
                createdBy: "admin"
            }
        })
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyAddress1",
            },
            update: {},
            create: {
                name: "Société adresse 1 DSN",
                type: "dsnSocietyAddress1",
                label: "Adresse 1",
                createdBy: "admin"
            }
        })
        console.log("Adresse 1 socitety dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyAddress2",
            },
            update: {},
            create: {
                name: "Société adresse 2 DSN",
                type: "dsnSocietyAddress2",
                label: "Adresse 2",
                createdBy: "admin"
            }
        })
        console.log("Adresse 2 society dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyAddress3",
            },
            update: {},
            create: {
                name: "Society adresse 3 DSN",
                type: "dsnSocietyAddress3",
                label: "Adresse 3",
                createdBy: "admin"
            }
        })
        console.log("Adresse 3 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyZipCode",
            },
            update: {},
            create: {
                name: "Société code postal DSN",
                type: "dsnSocietyZipCode",
                label: "Code postal",
                createdBy: "admin"
            }
        })
        console.log("ZipCode establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnSocietyCity",
            },
            update: {},
            create: {
                name: "Société ville DSN",
                type: "dsnSocietyCity",
                label: "Ville",
                createdBy: "admin"
            }
        })
        console.log("City society dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentAddress1",
            },
            update: {},
            create: {
                name: "Etablissement adresse 1 DSN",
                type: "dsnEstablishmentAddress1",
                label: "Adresse 1",
                createdBy: "admin"
            }
        })
        console.log("Adresse 1 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentAddress2",
            },
            update: {},
            create: {
                name: "Etablissement adresse 2 DSN",
                type: "dsnEstablishmentAddress2",
                label: "Adresse 2",
                createdBy: "admin"
            }
        })
        console.log("Adresse 1 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentAddress3",
            },
            update: {},
            create: {
                name: "Etablissement adresse 3 DSN",
                type: "dsnEstablishmentAddress3",
                label: "Adresse 3",
                createdBy: "admin"
            }
        })
        console.log("Adresse 3 establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentZipCode",
            },
            update: {},
            create: {
                name: "Etablissement code postal DSN",
                type: "dsnEstablishmentZipCode",
                label: "Code postal",
                createdBy: "admin"
            }
        })
        console.log("ZipCode establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnEstablishmentCity",
            },
            update: {},
            create: {
                name: "Etablissement ville DSN",
                type: "dsnEstablishmentCity",
                label: "Ville",
                createdBy: "admin"
            }
        })
        console.log("City establish dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsnJobLabel",
            },
            update: {},
            create: {
                name: "Libellé emploi DSN",
                type: "dsnJobLabel",
                label: "Libellé emploi",
                createdBy: "admin"
            }
        })
        console.log("Job label dsn")
        await prisma.standard_Input.upsert({
            where: {
                type: "dsncode",
            },
            update: {},
            create: {
                name: "Code convention collective DSN",
                type: "dsncode",
                label: "Code code",
                createdBy: "admin"
            }
        })
        console.log("Job label dsn")
        await prisma.idcc.createMany({
            data: [
                {
                    "code": "0016",
                    "label": "Convention collective nationale des transports routiers et activités auxiliaires du transport"
                },
                {
                    "code": "0018",
                    "label": "Convention collective nationale des industries textiles"
                },
                {
                    "code": "0029",
                    "label": "Convention collective nationale des établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP, convention de 1951)"
                },
                {
                    "code": "0043",
                    "label": "Convention collective nationale de l'Import-export et du Commerce international"
                },
                {
                    "code": "0044",
                    "label": "Convention collective nationale des industries chimiques et connexes"
                },
                {
                    "code": "0045",
                    "label": "Convention collective nationale du caoutchouc"
                },
                {
                    "code": "0086",
                    "label": "Convention collective nationale des entreprises de publicité et assimilées"
                },
                {
                    "code": "0087",
                    "label": "Convention collective nationale des ouvriers des industries de carrières et de matériaux"
                },
                {
                    "code": "0112",
                    "label": "Convention collective nationale de l'industrie laitière"
                },
                {
                    "code": "0135",
                    "label": "Convention collective nationale des employés techniciens et agents de maîtrise des industries de carrières et de matériaux"
                },
                {
                    "code": "0158",
                    "label": "Convention collective nationale du travail mécanique du bois, des scieries, du négoce et de l'importation des bois"
                },
                {
                    "code": "0172",
                    "label": "Convention collective interrégionale de l'industrie du bois de pin maritime en forêt de Gascogne (Charente, Aquitaine) (annexée à la convention collective nationale du travail mécanique du bois, des scieries, du négoce et de l'importation des bois 0158)"
                },
                {
                    "code": "0176",
                    "label": "Convention collective nationale de l'industrie pharmaceutique"
                },
                {
                    "code": "0184",
                    "label": "Convention collective nationale de l'imprimerie de labeur et des industries graphiques"
                },
                {
                    "code": "0200",
                    "label": "Convention collective nationale des exploitations frigorifiques"
                },
                {
                    "code": "0207",
                    "label": "Convention collective nationale de l'industrie des cuirs et peaux (annexée à la convention collective nationale de travail des industries de la maroquinerie, articles de voyage, chasse sellerie, gainerie, bracelets en cuir 2528)"
                },
                {
                    "code": "0211",
                    "label": "Convention collective nationale des cadres des industries de carrières et matériaux (UNICEM)"
                },
                {
                    "code": "0214",
                    "label": "Convention collective régionale des ouvriers des entreprises de presse de la région parisienne"
                },
                {
                    "code": "0218",
                    "label": "Convention collective nationale des organismes de sécurité sociale"
                },
                {
                    "code": "0247",
                    "label": "Convention collective nationale des industries de l'habillement"
                },
                {
                    "code": "0275",
                    "label": "Convention collective nationale du personnel au sol des entreprises de transport aérien"
                },
                {
                    "code": "0292",
                    "label": "Convention collective nationale de la plasturgie (transformation des matières plastiques)"
                },
                {
                    "code": "0303",
                    "label": "Convention collective nationale de la couture parisienne et des autres métiers de la mode"
                },
                {
                    "code": "0306",
                    "label": "Convention collective régionale des cadres techniques de la presse quotidienne parisienne"
                },
                {
                    "code": "0379",
                    "label": "Convention collective départementale du travail des commerces de la Martinique"
                },
                {
                    "code": "0394",
                    "label": "Convention collective régionale des employés de la presse quotidienne parisienne"
                },
                {
                    "code": "0405",
                    "label": "Convention collective nationale des établissements médico-sociaux de l'union intersyndicale des secteurs sanitaires et sociaux (UNISSS, FFESCPE, convention de 1965, enfants, adolescents )"
                },
                {
                    "code": "0413",
                    "label": "Convention collective nationale de travail des établissements et services pour personnes inadaptées et handicapées (convention de 1966, SNAPEI)"
                },
                {
                    "code": "0418",
                    "label": "Convention collective nationale de la chemiserie sur mesure (annexée à la convention collective nationale de la couture parisienne 0303)"
                },
                {
                    "code": "0438",
                    "label": "Convention collective nationale de travail des échelons intermédiaires des services extérieurs de production des sociétés d'assurances"
                },
                {
                    "code": "0440",
                    "label": "Convention collective départementale des sucreries et sucreries-distilleries de la Réunion"
                },
                {
                    "code": "0454",
                    "label": "Convention collective nationale des remontées mécaniques et domaines skiables"
                },
                {
                    "code": "0468",
                    "label": "Convention collective nationale du commerce succursaliste de la chaussure"
                },
                {
                    "code": "0478",
                    "label": "Convention collective nationale des sociétés financières"
                },
                {
                    "code": "0489",
                    "label": "Convention collective nationale du personnel des industries du cartonnage"
                },
                {
                    "code": "0493",
                    "label": "Convention collective nationale des vins, cidres, jus de fruits, sirops, spiritueux et liqueurs de France"
                },
                {
                    "code": "0500",
                    "label": "Convention collective nationale des entreprises de distribution en chaussure, jouet, textile et mercerie"
                },
                {
                    "code": "0509",
                    "label": "Convention collective régionale des cadres administratifs de la presse quotidienne parisienne"
                },
                {
                    "code": "0538",
                    "label": "Convention collective nationale du personnel des entreprises de manutention ferroviaire et travaux connexes"
                },
                {
                    "code": "0567",
                    "label": "Convention collective nationale de la bijouterie, joaillerie, orfèvrerie et des activités qui s'y rattachent"
                },
                {
                    "code": "0573",
                    "label": "Convention collective nationale des commerces de gros"
                },
                {
                    "code": "0614",
                    "label": "Convention collective nationale des industries de la sérigraphie et des procédés d'impression numérique connexes (annexée à la convention collective nationale de l'imprimerie de labeur et des industries graphiques 0184)"
                },
                {
                    "code": "0627",
                    "label": "Convention collective départementale des employés, techniciens et agents de maîtrise du bâtiment et des travaux publics de La Réunion"
                },
                {
                    "code": "0635",
                    "label": "Convention collective nationale du négoce en fournitures dentaires (annexée à la convention collective nationale des commerces de gros 0573)"
                },
                {
                    "code": "0637",
                    "label": "Convention collective nationale des industries et du commerce de la récupération (recyclage, régions Nord-Pas-de-Calais, Picardie)"
                },
                {
                    "code": "0653",
                    "label": "Convention collective nationale de travail des producteurs salariés de base des services extérieurs de production des sociétés d'assurances"
                },
                {
                    "code": "0669",
                    "label": "Convention collective nationale des industries de fabrication mécanique du verre"
                },
                {
                    "code": "0673",
                    "label": "Convention collective nationale de la fourrure (annexée à la convention collective nationale de la couture parisienne 0303)"
                },
                {
                    "code": "0675",
                    "label": "Convention collective nationale des maisons à succursales de vente au détail d'habillement"
                },
                {
                    "code": "0706",
                    "label": "Convention collective nationale du personnel de la reprographie (annexée à la convention collective nationale des commerces de détail de papeterie, fournitures de bureau, de bureautique et informatique et de librairie 1539)"
                },
                {
                    "code": "0715",
                    "label": "Convention collective nationale des instruments à écrire et des industries connexes (annexée à la convention collective du personnel des industries du cartonnage 0489)"
                },
                {
                    "code": "0716",
                    "label": "Convention collective nationale des employés et ouvriers de la distribution cinématographique"
                },
                {
                    "code": "0733",
                    "label": "Convention collective nationale des détaillants en chaussure"
                },
                {
                    "code": "0749",
                    "label": "Convention collective départementale des ouvriers du bâtiment et des travaux publics de la Martinique"
                },
                {
                    "code": "0759",
                    "label": "Convention collective nationale des pompes funèbres"
                },
                {
                    "code": "0771",
                    "label": "Convention collective départementale des ingénieurs assimilés et cadres du bâtiment et des travaux publics de La Réunion"
                },
                {
                    "code": "0780",
                    "label": "Convention collective régionale des tailleurs sur mesure de la région parisienne (annexée à la convention collective nationale de la couture parisienne 0303)"
                },
                {
                    "code": "0783",
                    "label": "Convention collective nationale des centres d'hébergement et de réadaptation sociale et dans les services d'accueil, d'orientation et d'insertion pour adultes (CHRS, SOP )"
                },
                {
                    "code": "0787",
                    "label": "Convention collective nationale des cabinets d'experts-comptables et de commissaires aux comptes"
                },
                {
                    "code": "0802",
                    "label": "Convention collective nationale de la distribution de papiers-cartons commerces de gros pour les ouvriers, employés, techniciens et agents de maîtrise"
                },
                {
                    "code": "0804",
                    "label": "Accord national interprofessionnel des voyageurs, représentants, placiers (VRP)"
                },
                {
                    "code": "0843",
                    "label": "Convention collective nationale de la boulangerie-pâtisserie -entreprises artisanales-"
                },
                {
                    "code": "0892",
                    "label": "Convention collective nationale des cadres et agents de maîtrise de la distribution de films de l'industrie cinématographique"
                },
                {
                    "code": "0897",
                    "label": "Convention collective nationale des services de santé au travail interentreprises"
                },
                {
                    "code": "0901",
                    "label": "Convention collective départementale des ouvriers de la boulangerie de la Martinique"
                },
                {
                    "code": "0915",
                    "label": "Convention collective nationale des sociétés d'expertises et d'évaluations"
                },
                {
                    "code": "0919",
                    "label": "Convention collective départementale du personnel des garages de la Martinique (Automobile, commerce, réparation)"
                },
                {
                    "code": "0925",
                    "label": "Convention collective nationale des ingénieurs et cadres de la distribution des papiers et cartons, commerce de gros"
                },
                {
                    "code": "0953",
                    "label": "Convention collective nationale de la charcuterie de détail"
                },
                {
                    "code": "0959",
                    "label": "Convention collective nationale des laboratoires de biologie médicale extra-hospitaliers"
                },
                {
                    "code": "0992",
                    "label": "Convention collective nationale de la boucherie, boucherie-charcuterie et boucherie hippophagique, triperie, commerce de volailles et gibiers"
                },
                {
                    "code": "0993",
                    "label": "Convention collective nationale des prothésistes dentaires et des personnels des laboratoires de prothèse dentaire"
                },
                {
                    "code": "0998",
                    "label": "Convention collective nationale des ouvriers, employés, techniciens et agents de maîtrise de l'exploitation d'équipements thermiques et de génie climatique"
                },
                {
                    "code": "1000",
                    "label": "Convention collective nationale du personnel des cabinets d'avocats"
                },
                {
                    "code": "1001",
                    "label": "Convention collective nationale des médecins spécialistes qualifiés au regard du conseil de l'ordre travaillant dans des établissements et services pour personnes inadaptées et handicapées (annexée à la convention collective nationale de travail des établissements et services pour personnes inadaptées et handicapées 0413)"
                },
                {
                    "code": "1016",
                    "label": "Convention collective nationale des cadres et agents de maîtrise de l'édition de musique (annexée à la convention collective nationale de l'édition 2121)"
                },
                {
                    "code": "1031",
                    "label": "Convention collective nationale de la fédération nationale des associations familiales rurales (FNAFR)"
                },
                {
                    "code": "1043",
                    "label": "Convention collective nationale des gardiens, concierges et employés d'immeubles"
                },
                {
                    "code": "1044",
                    "label": "Convention collective nationale de l'horlogerie (annexée à la convention collective nationale de la bijouterie, joaillerie, orfèvrerie et des activités qui s'y rattachent 0567)"
                },
                {
                    "code": "1049",
                    "label": "Convention collective départementale du bâtiment, des travaux publics et de toutes professions concourant à l'acte de bâtir ou d'aménager de Saint Pierre-et-Miquelon"
                },
                {
                    "code": "1050",
                    "label": "Convention collective départementale du commerce et des services commerciaux de Saint-Pierre-et-Miquelon"
                },
                {
                    "code": "1057",
                    "label": "Convention collective départementale des consignataires de navire et manutentionnaires de la Martinique"
                },
                {
                    "code": "1060",
                    "label": "Convention collective départementale de la métallurgie de la Martinique"
                },
                {
                    "code": "1069",
                    "label": "Convention collective départementale de la répartition et des dépôts pharmaceutiques de la Martinique"
                },
                {
                    "code": "1072",
                    "label": "Convention collective locale du travail règlementant le travail de manutention dans le port de Saint-Pierre"
                },
                {
                    "code": "1077",
                    "label": "Convention collective nationale entreprises du négoce et de l'industrie des produits du sol, engrais et produits connexes"
                },
                {
                    "code": "1090",
                    "label": "Convention collective nationale des services de l'automobile (commerce et réparation de l'automobile, du cycle et du motocycle, activités connexes, contrôle technique automobile, formation des conducteurs auto-écoles CNPA )"
                },
                {
                    "code": "1140",
                    "label": "Convention collective départementale des hôtels cafés restaurants de Saint-Pierre-et-Miquelon(HCR)"
                },
                {
                    "code": "1147",
                    "label": "Convention collective nationale du personnel des cabinets médicaux (médecin)"
                },
                {
                    "code": "1170",
                    "label": "Convention collective nationale de l'industrie des tuiles et briques (CCNTB)"
                },
                {
                    "code": "1182",
                    "label": "Convention collective nationale des personnels des ports de plaisance"
                },
                {
                    "code": "1194",
                    "label": "Convention collective nationale des employés de l'édition de musique (annexée à la convention collective nationale de l'édition 2121)"
                },
                {
                    "code": "1203",
                    "label": "Convention collective départementale du commerce et des services de la Guadeloupe"
                },
                {
                    "code": "1225",
                    "label": "Convention collective départementale du commerce de la Réunion"
                },
                {
                    "code": "1232",
                    "label": "Convention collective départementale des hôtels de la Guadeloupe"
                },
                {
                    "code": "1247",
                    "label": "Convention collective départementale auto moto de la Réunion"
                },
                {
                    "code": "1256",
                    "label": "Convention collective nationale des cadres, ingénieurs et assimilés des entreprises de gestion d'équipements thermiques et de climatisation"
                },
                {
                    "code": "1257",
                    "label": "Convention collective départementale des employés, agents de maîtrise et cadres de la pharmacie d'officine de la Réunion"
                },
                {
                    "code": "1261",
                    "label": "Convention collective nationale des acteurs du lien social et familial : centres sociaux et socioculturels, associations d'accueil de jeunes enfants, associations de développement social local (SNAECSO)"
                },
                {
                    "code": "1266",
                    "label": "Convention collective nationale du personnel des entreprises de restauration de collectivités"
                },
                {
                    "code": "1267",
                    "label": "Convention collective nationale de la pâtisserie"
                },
                {
                    "code": "1278",
                    "label": "Convention collective nationale des personnels PACT et ARIM -centres pour la protection l'amélioration et la conservation de l'habitat et associations pour la restauration immobilière- (annexée à la convention collective nationale de l'habitat et du logement accompagnés 2336)"
                },
                {
                    "code": "1285",
                    "label": "Convention collective nationale pour les entreprises artistiques et culturelles (SYNDEAC)"
                },
                {
                    "code": "1286",
                    "label": "Convention collective nationale des détaillants, détaillants-fabricants et artisans de la confiserie, chocolaterie, biscuiterie"
                },
                {
                    "code": "1307",
                    "label": "Convention collective nationale de l'exploitation cinématographique"
                },
                {
                    "code": "1311",
                    "label": "Convention collective nationale de la restauration ferroviaire"
                },
                {
                    "code": "1316",
                    "label": "Convention collective nationale des organismes de tourisme social et familial"
                },
                {
                    "code": "1341",
                    "label": "Convention collective départementale des industries agroalimentaires de la Réunion"
                },
                {
                    "code": "1351",
                    "label": "Convention collective nationale des entreprises de prévention et de sécurité"
                },
                {
                    "code": "1388",
                    "label": "Convention collective nationale de l'industrie du pétrole"
                },
                {
                    "code": "1391",
                    "label": "Convention collective régionale concernant le personnel de l'industrie, de la manutention et du nettoyage sur les aéroports ouverts à la circulation publique de la région parisienne (annexée à la convention collective nationale du personnel au sol des entreprises de transport aérien 0275)"
                },
                {
                    "code": "1396",
                    "label": "Convention collective nationale pour les industries de produits alimentaires élaborés"
                },
                {
                    "code": "1404",
                    "label": "Convention collective nationale des entreprises de commerce, de location et de réparation de tracteurs, machines et matériels agricoles, de matériels de travaux publics, de bâtiment et de manutention, de matériels de motoculture de plaisance, de jardins et d'espaces verts (SEDIMA)"
                },
                {
                    "code": "1405",
                    "label": "Convention collective nationale des entreprises d'expédition et d'exportation de fruits et légumes"
                },
                {
                    "code": "1408",
                    "label": "Convention collective nationale des entreprises du négoce et de distribution de combustibles solides, liquides, gazeux et produits pétroliers"
                },
                {
                    "code": "1411",
                    "label": "Convention collective nationale de la fabrication de l'ameublement"
                },
                {
                    "code": "1412",
                    "label": "Convention collective nationale des entreprises d'installation sans fabrication, y compris entretien, réparation, dépannage de matériel aéraulique, thermique, frigorifique et connexes"
                },
                {
                    "code": "1413",
                    "label": "Accord national professionnel relatif aux salariés permanents des entreprises de travail temporaire"
                },
                {
                    "code": "1424",
                    "label": "Convention collective nationale des réseaux de transports publics urbains de voyageurs"
                },
                {
                    "code": "1431",
                    "label": "Convention collective nationale de l'optique-lunetterie de détail"
                },
                {
                    "code": "1468",
                    "label": "Convention collective nationale de branche du Crédit mutuel"
                },
                {
                    "code": "1480",
                    "label": "Convention collective nationale de travail des journalistes"
                },
                {
                    "code": "1483",
                    "label": "Convention collective nationale du commerce de détail de l'habillement et des articles textiles"
                },
                {
                    "code": "1486",
                    "label": "Convention collective nationale applicable au personnel des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils(BET, SYNTEC)"
                },
                {
                    "code": "1487",
                    "label": "Convention collective nationale du commerce de détail de l'horlogerie-bijouterie"
                },
                {
                    "code": "1499",
                    "label": "Convention collective nationale de la miroiterie, de la transformation et du négoce du verre"
                },
                {
                    "code": "1501",
                    "label": "Convention collective nationale de la restauration rapide (restauration livrée)"
                },
                {
                    "code": "1504",
                    "label": "Convention collective nationale de la poissonnerie (commerce de détail, de demi-gros et de gros de la poissonnerie)"
                },
                {
                    "code": "1505",
                    "label": "Convention collective nationale du commerce de détail alimentaire non spécialisé"
                },
                {
                    "code": "1512",
                    "label": "Convention collective nationale de la promotion immobilière"
                },
                {
                    "code": "1513",
                    "label": "Convention collective nationale des activités de production des eaux embouteillées, des boissons rafraîchissantes sans alcool et de bière"
                },
                {
                    "code": "1516",
                    "label": "Convention collective nationale des organismes de formation"
                },
                {
                    "code": "1517",
                    "label": "Convention collective nationale des commerces de détail non alimentaires : antiquités, brocante, galeries d'art, arts de la table, coutellerie, droguerie, équipement du foyer, bazars, commerces ménagers, modélisme, jeux, jouets, périnatalité et maroquinerie(œuvres d'art)"
                },
                {
                    "code": "1518",
                    "label": "Convention collective nationale des métiers de l’Éducation, de la Culture, des Loisirs, et de l’Animation agissant pour l’utilité sociale et environnementale, au service des Territoires dite ECLAT (ex Animation)"
                },
                {
                    "code": "1527",
                    "label": "Convention collective nationale de l'immobilier"
                },
                {
                    "code": "1534",
                    "label": "Convention collective nationale des entreprises de l'industrie et des commerces en gros des viandes"
                },
                {
                    "code": "1536",
                    "label": "Convention collective nationale des distributeurs conseils hors domicile (entrepositaires-grossistes, bières, eaux minérales et de table, boissons gazeuses, non gazeuses, sirops, jus de fruits, CHD)"
                },
                {
                    "code": "1539",
                    "label": "Convention collective nationale des entreprises du bureau et du numérique Commerces et Services"
                },
                {
                    "code": "1555",
                    "label": "Convention collective nationale de la fabrication et du commerce des produits à usage pharmaceutique, parapharmaceutique et vétérinaire"
                },
                {
                    "code": "1557",
                    "label": "Convention collective nationale du commerce des articles de sports et d'équipements de loisirs (fusion entre la 1557 et la 1618)"
                },
                {
                    "code": "1558",
                    "label": "Convention collective nationale relative aux conditions de travail du personnel des industries céramiques de France"
                },
                {
                    "code": "1561",
                    "label": "Convention collective nationale de la cordonnerie multiservice (annexée à la convention collective nationale de travail des industries de la maroquinerie, articles de voyage, chasse sellerie, gainerie, bracelets en cuir 2528)"
                },
                {
                    "code": "1565",
                    "label": "Convention collective départementale des services de soins infirmiers à domicile pour personnes âgées de la Guadeloupe"
                },
                {
                    "code": "1578",
                    "label": "Convention collective départementale de la métallurgie de la Loire et de l'arrondissement d'Yssingeaux"
                },
                {
                    "code": "1580",
                    "label": "Convention collective nationale de l'industrie de la chaussure et des articles chaussants"
                },
                {
                    "code": "1586",
                    "label": "Convention collective nationale de l'industrie de la salaison, charcuterie en gros et conserves de viandes"
                },
                {
                    "code": "1588",
                    "label": "Convention collective nationale du personnel des sociétés coopératives d'HLM (annexée à la convention collective nationale du personnel des Offices Publics de l'Habitat 3220)"
                },
                {
                    "code": "1589",
                    "label": "Convention collective nationale des mareyeurs-expéditeurs"
                },
                {
                    "code": "1596",
                    "label": "Convention collective nationale concernant les ouvriers employés par les entreprises du bâtiment visées par le décret du 1er mars 1962 -c'est-à-dire occupant jusqu'à 10 salariés-"
                },
                {
                    "code": "1597",
                    "label": "Convention collective nationale concernant les ouvriers employés par les entreprises du bâtiment non visées par le décret 1er mars 1962 -c'est-à-dire occupant plus de 10 salariés-"
                },
                {
                    "code": "1605",
                    "label": "Convention collective nationale des entreprises de désinfection, désinsectisation, dératisation"
                },
                {
                    "code": "1606",
                    "label": "Convention collective nationale du bricolage"
                },
                {
                    "code": "1607",
                    "label": "Convention collective nationale des industries des jeux, jouets, articles de fêtes et ornements de Noël, articles de puériculture et voitures d'enfants modélisme et industries connexes"
                },
                {
                    "code": "1611",
                    "label": "Convention collective nationale des entreprises de logistique de communication écrite directe"
                },
                {
                    "code": "1612",
                    "label": "Convention collective nationale du personnel navigant des essais et réceptions"
                },
                {
                    "code": "1618",
                    "label": "Convention collective nationale du camping (fusion entre la 1557 et la 1618)"
                },
                {
                    "code": "1619",
                    "label": "Convention collective nationale des cabinets dentaires"
                },
                {
                    "code": "1621",
                    "label": "Convention collective nationale de la répartition pharmaceutique"
                },
                {
                    "code": "1626",
                    "label": "Convention collective départementale des industries métallurgiques, mécaniques, électriques, électro-céramiques et connexes des Hautes-Pyrénées"
                },
                {
                    "code": "1631",
                    "label": "Convention collective nationale de l'hôtellerie de plein air"
                },
                {
                    "code": "1659",
                    "label": "Convention collective nationale du rouissage teillage du lin"
                },
                {
                    "code": "1671",
                    "label": "Convention collective nationale des maisons d'étudiants"
                },
                {
                    "code": "1672",
                    "label": "Convention collective nationale des sociétés d'assurances"
                },
                {
                    "code": "1679",
                    "label": "Convention collective nationale de l'inspection d'assurance"
                },
                {
                    "code": "1686",
                    "label": "Convention collective nationale des commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager"
                },
                {
                    "code": "1700",
                    "label": "Convention collective départementale des sucreries, sucreries-distilleries et distilleries de la Guadeloupe"
                },
                {
                    "code": "1702",
                    "label": "Convention collective nationale des ouvriers de travaux publics"
                },
                {
                    "code": "1734",
                    "label": "Convention collective des artistes-interprètes engagés pour des émissions de télévision (annexée à la convention collective de la production audiovisuelle 2642)"
                },
                {
                    "code": "1747",
                    "label": "Convention collective nationale des activités industrielles de boulangerie et de pâtisserie (fusion entre la 1747 et la 2075)"
                },
                {
                    "code": "1760",
                    "label": "Convention collective nationale des jardineries et graineteries"
                },
                {
                    "code": "1790",
                    "label": "Convention collective nationale des espaces de loisirs, d'attractions et culturels"
                },
                {
                    "code": "1794",
                    "label": "Convention collective nationale du personnel des institutions de retraites complémentaires"
                },
                {
                    "code": "1800",
                    "label": "Convention collective nationale du personnel de la céramique d'art (annexée à la convention collective nationale relative aux conditions de travail du personnel des industries céramiques de France 1558)"
                },
                {
                    "code": "1801",
                    "label": "Convention collective nationale des sociétés d'assistance"
                },
                {
                    "code": "1813",
                    "label": "Convention collective locale de travail des industries de la transformation des métaux de la région de Maubeuge"
                },
                {
                    "code": "1821",
                    "label": "Convention collective nationale des professions regroupées du cristal, du verre et du vitrail "
                },
                {
                    "code": "1843",
                    "label": "Convention collective régionale des ingénieurs, assimilés et cadres du bâtiment de la région parisienne"
                },
                {
                    "code": "1850",
                    "label": "Convention collective nationale de l'avocat salarié"
                },
                {
                    "code": "1875",
                    "label": "Convention collective nationale des cabinets et cliniques vétérinaires : personnel salarié"
                },
                {
                    "code": "1880",
                    "label": "Convention collective nationale du négoce de l'ameublement"
                },
                {
                    "code": "1909",
                    "label": "Convention collective nationale des organismes de tourisme"
                },
                {
                    "code": "1921",
                    "label": "Convention collective nationale des huissiers de justice"
                },
                {
                    "code": "1922",
                    "label": "Convention collective nationale de la radiodiffusion"
                },
                {
                    "code": "1923",
                    "label": "Convention collective départementale de la manutention portuaire de la Guadeloupe"
                },
                {
                    "code": "1930",
                    "label": "Convention collective nationale des métiers de la transformation des grains (ex meunerie)"
                },
                {
                    "code": "1938",
                    "label": "Convention collective nationale des industries de la transformation des volailles (abattoirs, ateliers de découpe et centres de conditionnement de volailles, commerce de gros de volailles)"
                },
                {
                    "code": "1942",
                    "label": "Convention collective nationale des textiles artificiels et synthétiques et produits assimilés (annexée à la convention collective nationale de l’industrie textile 0018)"
                },
                {
                    "code": "1944",
                    "label": "Convention collective nationale du personnel navigant technique des exploitants d'hélicoptères"
                },
                {
                    "code": "1947",
                    "label": "Convention collective nationale du négoce de bois d'œuvre et produits dérivés"
                },
                {
                    "code": "1951",
                    "label": "Convention collective nationale des cabinets ou entreprises d'expertises en automobile"
                },
                {
                    "code": "1961",
                    "label": "Convention collective départementale pour les stations-service en Guadeloupe"
                },
                {
                    "code": "1967",
                    "label": "Convention collective départementale de l'industrie des métaux du Bas-Rhin"
                },
                {
                    "code": "1978",
                    "label": "Convention collective nationale des fleuristes, de la vente et des services des animaux familiers"
                },
                {
                    "code": "1979",
                    "label": "Convention collective nationale des hôtels, cafés, restaurants (HCR)"
                },
                {
                    "code": "1980",
                    "label": "Convention collective départementale des commissionnaires en douane et agents auxiliaires de la Martinique"
                },
                {
                    "code": "1982",
                    "label": "Convention collective nationale du négoce et prestations de services dans les domaines médico-techniques"
                },
                {
                    "code": "1987",
                    "label": "Convention collective nationale des pâtes alimentaires sèches et du couscous non préparé"
                },
                {
                    "code": "1996",
                    "label": "Convention collective nationale de la pharmacie d'officine"
                },
                {
                    "code": "2002",
                    "label": "Convention collective interrégionale de la blanchisserie, laverie, location de linge, nettoyage à sec, pressing et teinturerie"
                },
                {
                    "code": "2021",
                    "label": "Convention collective nationale du golf"
                },
                {
                    "code": "2025",
                    "label": "Convention collective régionale du travail des activités minières de Guyane"
                },
                {
                    "code": "2046",
                    "label": "Convention collective nationale du personnel non médical des centres de lutte contre le cancer"
                },
                {
                    "code": "2060",
                    "label": "Convention collective nationale des chaînes de cafétérias et assimilés"
                },
                {
                    "code": "2075",
                    "label": "Convention collective nationale des centres immatriculés de conditionnement, de commercialisation et de transformation des œufs et des industries en produits d'œufs (fusion entre la 1747 et la 2075)"
                },
                {
                    "code": "2089",
                    "label": "Convention collective nationale de l'industrie des panneaux à base de bois"
                },
                {
                    "code": "2098",
                    "label": "Convention collective nationale du personnel des prestataires de services dans le domaine du secteur tertiaire"
                },
                {
                    "code": "2104",
                    "label": "Convention collective nationale du thermalisme (fusion entre la 2264 et la 2104)"
                },
                {
                    "code": "2120",
                    "label": "Convention collective nationale de la banque"
                },
                {
                    "code": "2121",
                    "label": "Convention collective nationale de l'édition"
                },
                {
                    "code": "2128",
                    "label": "Convention collective nationale de la mutualité"
                },
                {
                    "code": "2147",
                    "label": "Convention collective nationale des entreprises des services d'eau et d'assainissement (entreprises en gérance, en concession ou en affermage assurent l'exploitation, le service, le pompage, le traitement et la distribution d'eau à usage public, particulier, domestique, agricole)"
                },
                {
                    "code": "2148",
                    "label": "Convention collective nationale des télécommunications"
                },
                {
                    "code": "2149",
                    "label": "Convention collective nationale des activités du déchet"
                },
                {
                    "code": "2150",
                    "label": "Convention collective nationale des personnels des sociétés anonymes et fondations d'HLM"
                },
                {
                    "code": "2156",
                    "label": "Convention collective nationale des grands magasins et des magasins populaires"
                },
                {
                    "code": "2190",
                    "label": "Convention collective nationale des missions locales et PAIO des maisons de l'emploi et PLIE"
                },
                {
                    "code": "2198",
                    "label": "Convention collective nationale des entreprises de vente à distance"
                },
                {
                    "code": "2205",
                    "label": "Convention collective nationale du notariat "
                },
                {
                    "code": "2216",
                    "label": "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire (entrepôts d'alimentation, supérettes, supermarchés, hypermarchés, grande distribution)"
                },
                {
                    "code": "2219",
                    "label": "Convention collective nationale des taxis"
                },
                {
                    "code": "2221",
                    "label": "Convention collective régionale des mensuels des industries des métaux de l'Isère et des Hautes-Alpes"
                },
                {
                    "code": "2230",
                    "label": "Convention collective nationale des associations agréées de surveillance de la qualité de l'air (annexée à la convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils 1486)"
                },
                {
                    "code": "2247",
                    "label": "Convention collective nationale des entreprises de courtage d'assurances et/ou de réassurances"
                },
                {
                    "code": "2250",
                    "label": "Convention collective régionale de la boulangerie-pâtisserie de la Guyane"
                },
                {
                    "code": "2257",
                    "label": "Convention collective nationale des casinos"
                },
                {
                    "code": "2264",
                    "label": "Convention collective nationalede l'hospitalisation privée (CCU, FHP, établissements pour personnes âgées, maison de retraite, établissements de suite et réadaptation, médicaux pour enfants et adolescents, UHP, sanitaires sociaux et médico-sociaux CRRR, hospitalisation privé à but lucratif FIEHP ) (fusion entre la 2264 et la 2104)"
                },
                {
                    "code": "2272",
                    "label": "Convention collective nationale de l'assainissement et de la maintenance industrielle"
                },
                {
                    "code": "2328",
                    "label": "Convention collective départementale des ouvriers du bâtiment et des travaux publics de la Guadeloupe et dépendances"
                },
                {
                    "code": "2332",
                    "label": "Convention collective nationale des entreprises d'architecture"
                },
                {
                    "code": "2335",
                    "label": "Convention collective nationale du personnel des agences générales d'assurances"
                },
                {
                    "code": "2336",
                    "label": "Convention collective nationale de l'habitat et du logement accompagnés"
                },
                {
                    "code": "2345",
                    "label": "Convention collective régionale du transport sanitaire en Martinique"
                },
                {
                    "code": "2357",
                    "label": "Accord professionnel national du 3 mars 1993 relatif aux cadres de direction des sociétés d'assurances"
                },
                {
                    "code": "2360",
                    "label": "Convention collective régionale des services de l'automobile de la Guyane"
                },
                {
                    "code": "2372",
                    "label": "Convention collective nationale des entreprises de la distribution directe"
                },
                {
                    "code": "2378",
                    "label": "Accords professionnels nationaux concernant le personnel intérimaire des entreprises de travail temporaire"
                },
                {
                    "code": "2389",
                    "label": "Convention collective régionale des ouvriers du bâtiment et des travaux publics région de La Réunion"
                },
                {
                    "code": "2397",
                    "label": "Convention collective nationale des mannequins adultes et des mannequins enfants de moins de seize ans employés par les agences de mannequins (fusion entre la 2717 et la 2397)"
                },
                {
                    "code": "2405",
                    "label": "Convention collective départementale des établissements d'hospitalisation privée de la Guadeloupe du 01/04/2003"
                },
                {
                    "code": "2412",
                    "label": "Convention collective nationale de la production de films d'animation"
                },
                {
                    "code": "2420",
                    "label": "Convention collective nationale des cadres du bâtiment du 1er juin 2004"
                },
                {
                    "code": "2480",
                    "label": "Convention collective locale de la manutention portuaire du port de Fort-de-France du 4 juillet 2003"
                },
                {
                    "code": "2494",
                    "label": "Convention collective nationale de la coopération maritime"
                },
                {
                    "code": "2511",
                    "label": "Convention collective nationale du sport"
                },
                {
                    "code": "2528",
                    "label": "Convention collective nationale de travail des industries de la maroquinerie, articles de voyage, chasse sellerie, gainerie, bracelets en cuir"
                },
                {
                    "code": "2534",
                    "label": "Convention collective départementale de l'industrie sucrière et rhumière de la Martinique"
                },
                {
                    "code": "2535",
                    "label": "Convention collective départementale dans la culture de la canne à sucre en Martinique"
                },
                {
                    "code": "2543",
                    "label": "Convention collective nationale des cabinets ou entreprises de géomètres experts, géomètres topographes photogrammètres, experts-fonciers"
                },
                {
                    "code": "2564",
                    "label": "Convention collective nationale des vétérinaires praticiens salariés"
                },
                {
                    "code": "2583",
                    "label": "Convention collective nationale de branche des sociétés concessionnaires ou exploitantes d'autoroutes ou d'ouvrages routiers"
                },
                {
                    "code": "2596",
                    "label": "Convention collective nationale de la coiffure et des professions connexes"
                },
                {
                    "code": "2603",
                    "label": "Convention collective nationale de travail des praticiens conseils du régime général de sécurité sociale"
                },
                {
                    "code": "2609",
                    "label": "Convention collective nationale des employés, techniciens et agents de maîtrise du bâtiment"
                },
                {
                    "code": "2614",
                    "label": "Convention collective nationale des employés, techniciens et agents de maîtrise des travaux publics"
                },
                {
                    "code": "2631",
                    "label": "Accord collectif national Branche de la télédiffusion. Salariés employés sous contrat à durée déterminée d'usage"
                },
                {
                    "code": "2642",
                    "label": "Convention collective nationale de la production audiovisuelle"
                },
                {
                    "code": "2658",
                    "label": "Convention collective régionale du travail des guides d'expédition, guides accompagnateurs et guides animateurs en milieu amazonien"
                },
                {
                    "code": "2666",
                    "label": "Convention collective nationale des conseils d'architecture, d'urbanisme et de l'environnement"
                },
                {
                    "code": "2668",
                    "label": "Convention collective nationale de travail des cadres supérieurs des sociétés de secours minières et de leurs établissements, des unions régionales et des assistants sociaux régionaux"
                },
                {
                    "code": "2683",
                    "label": "Convention collective nationale du portage de presse"
                },
                {
                    "code": "2691",
                    "label": "Convention collective nationale de l'enseignement privé indépendant (hors contrat)"
                },
                {
                    "code": "2697",
                    "label": "Convention collective nationale des personnels des structures associatives cynégétiques"
                },
                {
                    "code": "2701",
                    "label": "Convention collective départementale du travail du personnel des banques de la Guyane"
                },
                {
                    "code": "2702",
                    "label": "Convention collective départementale du travail du personnel des banques de la Martinique"
                },
                {
                    "code": "2704",
                    "label": "Convention collective départementale du travail du personnel des banques de la Guadeloupe, de Saint-Martin et de Saint-Barthélémy"
                },
                {
                    "code": "2717",
                    "label": "Convention collective nationale des entreprises techniques au service de la création et de l'événement (fusion entre la 2717 et la 2397)"
                },
                {
                    "code": "2727",
                    "label": "Convention collective nationale des omnipraticiens exerçant dans les centres de santé miniers"
                },
                {
                    "code": "2728",
                    "label": "Convention collective nationale des sucreries, sucreries-distilleries et raffineries de sucre"
                },
                {
                    "code": "2768",
                    "label": "Convention collective nationale de travail des pharmaciens du régime minier"
                },
                {
                    "code": "2770",
                    "label": "Convention collective nationale de l'édition phonographique (annexée à la convention collective nationale de l'édition 2121)"
                },
                {
                    "code": "2785",
                    "label": "Convention collective nationale des sociétés de ventes volontaires de meubles aux enchères publiques et des offices de commissaires-priseurs judiciaires"
                },
                {
                    "code": "2847",
                    "label": "Convention collective nationale de Pôle Emploi"
                },
                {
                    "code": "2870",
                    "label": "Convention collective régionale des ouvriers du bâtiment, des travaux publics et des industries et activités connexes de la Guyane"
                },
                {
                    "code": "2931",
                    "label": "Convention collective nationale des activités de marchés financiers"
                },
                {
                    "code": "2941",
                    "label": "Convention collective nationale de la branche de l'aide, de l'accompagnement, des soins et des services à domicile"
                },
                {
                    "code": "2964",
                    "label": "Accord collectif départemental relatif au transport de proximité public et privé de produits pétroliers et de liquides inflammables sur le territoire de la Martinique"
                },
                {
                    "code": "2972",
                    "label": "Convention collective nationale du personnel sédentaire des entreprises de navigation"
                },
                {
                    "code": "2978",
                    "label": "Convention collective nationale du personnel salarié des agences de recherches privées"
                },
                {
                    "code": "3013",
                    "label": "Convention collective nationale de la librairie"
                },
                {
                    "code": "3016",
                    "label": "Convention collective nationale des ateliers chantiers d'insertion"
                },
                {
                    "code": "3017",
                    "label": "Convention collective nationale unifiée ports et manutention"
                },
                {
                    "code": "3028",
                    "label": "Convention collective régionale des transports routiers et activités auxiliaires du transport de la Guadeloupe"
                },
                {
                    "code": "3032",
                    "label": "Convention collective nationale de l'esthétique - cosmétique et de l'enseignement technique et professionnel liés aux métiers de l'esthétique et de la parfumerie"
                },
                {
                    "code": "3043",
                    "label": "Convention collective nationale des entreprises de propreté et services associés du 26 juillet 2011."
                },
                {
                    "code": "3090",
                    "label": "Convention collective nationale des entreprises du secteur privé du spectacle vivant"
                },
                {
                    "code": "3097",
                    "label": "Convention collective nationale de la production cinématographique"
                },
                {
                    "code": "3105",
                    "label": "Convention collective nationale des régies de quartier"
                },
                {
                    "code": "3107",
                    "label": "Convention collective régionale des employés, techniciens et agents de maîtrise du bâtiment et des travaux publics et annexes de la Martinique"
                },
                {
                    "code": "3109",
                    "label": "Convention collective nationale des 5 branches industries alimentaires diverses"
                },
                {
                    "code": "3123",
                    "label": "Convention collective régionale des ambulances Guyane"
                },
                {
                    "code": "3127",
                    "label": "Convention collective nationale des services à la personne du 20 septembre 2012"
                },
                {
                    "code": "3128",
                    "label": "Convention collective régionale des employés, techniciens et agents de maîtrise du bâtiment, des travaux publics et des industries et activités connexes de la Guyane"
                },
                {
                    "code": "3144",
                    "label": "Convention collective régionale des ETAM du bâtiment et des travaux publics de la Guadeloupe"
                },
                {
                    "code": "3160",
                    "label": "Convention collective nationale des associations de gestion et de comptabilité (annexée à la convention collective nationale du personnel des cabinets d'experts-comptables et de commissaires aux comptes 0787)"
                },
                {
                    "code": "3168",
                    "label": "Convention collective nationale des professions de la photographie"
                },
                {
                    "code": "3203",
                    "label": "Convention collective nationale des structures associatives de pêche de loisir et de protection du milieu aquatique"
                },
                {
                    "code": "3204",
                    "label": "Convention collective régionale des ingénieurs et cadres du bâtiment, des travaux publics et des industries et activités connexes de la Guyane"
                },
                {
                    "code": "3205",
                    "label": "Convention collective nationale du personnel des coopératives de consommation"
                },
                {
                    "code": "3206",
                    "label": "Convention collective départementale du personnel des cabinets médicaux de Martinique"
                },
                {
                    "code": "3207",
                    "label": "Convention collective régionale des transports sanitaires de Guadeloupe"
                },
                {
                    "code": "3209",
                    "label": "Convention collective départementale des industries mécaniques, microtechniques et connexes du département du Doubs "
                },
                {
                    "code": "3210",
                    "label": "Convention collective nationale de la banque populaire"
                },
                {
                    "code": "3212",
                    "label": "Convention collective nationale des cadres des travaux publics"
                },
                {
                    "code": "3213",
                    "label": "Convention collective nationale des collaborateurs salariés des entreprises d'économistes de la construction et des métreurs-vérificateurs"
                },
                {
                    "code": "3216",
                    "label": "Convention collective nationale des salariés du négoce des matériaux de construction"
                },
                {
                    "code": "3217",
                    "label": "Convention collective nationale ferroviaire "
                },
                {
                    "code": "3218",
                    "label": "Convention collective nationale de l'enseignement privé non lucratif (EPNL)"
                },
                {
                    "code": "3219",
                    "label": "Convention collective nationale de branche des salariés en portage salarial"
                },
                {
                    "code": "3220",
                    "label": "Convention collective nationale des offices publics de l'habitat"
                },
                {
                    "code": "3221",
                    "label": "Convention collective nationale des agences de presse "
                },
                {
                    "code": "3222",
                    "label": "Convention collective nationale des menuiseries charpentes et constructions industrialisées et des portes planes"
                },
                {
                    "code": "3223",
                    "label": "Convention collective nationale des officiers des entreprises de transport et services maritimes"
                },
                {
                    "code": "3224",
                    "label": "\"Convention collective nationale de la distribution des papiers-cartons ",
                },
                {
                    "code": "3225",
                    "label": "Convention collective nationale des employés et des cadres des éditeurs de la presse magazine"
                },
                {
                    "code": "3227",
                    "label": "Convention collective nationale des industries de la fabrication de la chaux"
                },
                {
                    "code": "3228",
                    "label": "Convention collective nationale du groupement des armateurs de service de passages d'eau - personnel navigant"
                },
                {
                    "code": "3229",
                    "label": "Convention collective nationale du personnel sédentaire des entreprises de transports de marchandises de la navigation intérieure"
                },
                {
                    "code": "3230",
                    "label": "Convention collective nationale de la presse d'information spécialisée "
                },
                {
                    "code": "3231",
                    "label": "Convention collective départementale des industries métallurgiques, mécaniques, similaires et connexes du Jura"
                },
                {
                    "code": "3232",
                    "label": "Convention collective nationale de travail des agents de direction des organismes du régime général de sécurité sociale"
                },
                {
                    "code": "3233",
                    "label": "Convention collective nationale de la branche de l'industrie de la fabrication des ciments"
                },
                {
                    "code": "3235",
                    "label": "Convention collective de la parfumerie sélective "
                },
                {
                    "code": "3236",
                    "label": "Convention collective nationale de l’industrie et des services nautiques "
                },
                {
                    "code": "3237",
                    "label": "Convention collective nationale des métiers du commerce de détail alimentaire spécialisé"
                },
                {
                    "code": "3238",
                    "label": "Convention collective nationale de la production et de la transformation des papiers et cartons du 29 janvier 2021"
                },
                {
                    "code": "3239",
                    "label": "Convention collective de la branche du secteur des particuliers employeurs et de l'emploi à domicile résultant de la convergence des branches des assistants maternels et des salariés du particulier employeur"
                },
                {
                    "code": "3241",
                    "label": "Convention collective nationale de la Télédiffusion"
                },
                {
                    "code": "3242",
                    "label": "Convention collective nationale de la presse quotidienne et hebdomadaire en régions"
                },
                {
                    "code": "3243",
                    "label": "Convention collective nationale des commerces de quincaillerie, fournitures industrielles, fers, métaux et équipement de la maison "
                },
                {
                    "code": "3244",
                    "label": "Convention collective nationale des professions réglementées auprès des juridictions"
                },
                {
                    "code": "3245",
                    "label": "Convention collective nationale des opérateurs de voyages et des guides"
                },
                {
                    "code": "3248",
                    "label": "Convention collective nationale de la métallurgie"
                },
                {
                    "code": "3250",
                    "label": "Convention collective nationale des commissaires de justice et sociétés de ventes volontaires"
                },
                {
                    "code": "5001",
                    "label": "Statut des industries électriques et gazières"
                },
                {
                    "code": "5002",
                    "label": "Statut du Mineur"
                },
                {
                    "code": "5003",
                    "label": "Statut de la Fonction publique d'État"
                },
                {
                    "code": "5005",
                    "label": "Statut des Caisses d'épargne"
                },
                {
                    "code": "5008",
                    "label": "Statut de la Banque de France"
                },
                {
                    "code": "5010",
                    "label": "Statut des Chambres des métiers & de l'artisanat"
                },
                {
                    "code": "5011",
                    "label": "Statut de l'Aéroport de Paris"
                },
                {
                    "code": "5012",
                    "label": "Statut des chemins de fer"
                },
                {
                    "code": "5014",
                    "label": "Statut de la RATP"
                },
                {
                    "code": "5015",
                    "label": "Statut du CNRS"
                },
                {
                    "code": "5017",
                    "label": "Statut de l'Église ou convention diocésaine"
                },
                {
                    "code": "5018",
                    "label": "Statut des Chambres de commerce et d'industrie "
                },
                {
                    "code": "5019",
                    "label": "Statut des Chambres d'agriculture"
                },
                {
                    "code": "5021",
                    "label": "Statut de la Fonction publique territoriale"
                },
                {
                    "code": "5022",
                    "label": "Statut de la Fonction publique hospitalière"
                },
                {
                    "code": "5023",
                    "label": "Statut Vivea"
                },
                {
                    "code": "5024",
                    "label": "Statut des chefs d'établissement de l'enseignement catholique"
                },
                {
                    "code": "5025",
                    "label": "Statut des personnels des organismes de développement économique"
                },
                {
                    "code": "5100",
                    "label": "Statut divers ou non précisé"
                },
                {
                    "code": "5200",
                    "label": "Grille d'usage Mars PF (Non conventionnelle)"
                },
                {
                    "code": "5201",
                    "label": "Recommandations ANIL ADIL (Non conventionnelles)"
                },
                {
                    "code": "5203",
                    "label": "Ancienne convention collective nationale des peintres en lettres et publicité peinte (dénoncée, mais pouvant servir de grille d'usage d'établissements réputés sans convention)"
                },
                {
                    "code": "5204",
                    "label": "Grille d'usage MSF logistique (Non conventionnelle)"
                },
                {
                    "code": "5205",
                    "label": "Convention d'entreprise CSE Air France exploitation hub"
                },
                {
                    "code": "5501",
                    "label": "Convention d'entreprise indépendante ou texte assimilé non précisé"
                },
                {
                    "code": "5502",
                    "label": "Convention d'entreprise Croix Rouge"
                },
                {
                    "code": "5503",
                    "label": "Convention d'entreprise SEITA (LOGISTA France)"
                },
                {
                    "code": "5505",
                    "label": "Convention d'entreprise CEA"
                },
                {
                    "code": "5506",
                    "label": "Convention d'entreprise Crédit agricole SA"
                },
                {
                    "code": "5507",
                    "label": "Convention collective nationale des administratifs du football (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5509",
                    "label": "Convention d'entreprise PMU"
                },
                {
                    "code": "5513",
                    "label": "Convention d'entreprise IFREMER"
                },
                {
                    "code": "5514",
                    "label": "Convention d'entreprise Crédit Foncier"
                },
                {
                    "code": "5516",
                    "label": "Convention d'entreprise La Poste - France Télécom"
                },
                {
                    "code": "5519",
                    "label": "Convention collective nationale des salariés administratifs des sociétés de secours minières  (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5521",
                    "label": "Convention collective nationale du personnel navigant d'exécution du transport maritime"
                },
                {
                    "code": "5522",
                    "label": "Convention d'entreprise Établissement français du sang"
                },
                {
                    "code": "5524",
                    "label": "Convention d'entreprise France terre d'asile"
                },
                {
                    "code": "5526",
                    "label": "Charte du football professionnel (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5530",
                    "label": "Convention d'entreprise Adoma (ex Sonacotra)"
                },
                {
                    "code": "5531",
                    "label": "Convention d'entreprise Syngenta "
                },
                {
                    "code": "5532",
                    "label": "Convention d'entreprise INRS"
                },
                {
                    "code": "5533",
                    "label": "Convention du comité d'entreprise SNCF"
                },
                {
                    "code": "5537",
                    "label": "Convention collective nationale des dentistes des sociétés de secours minières (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5538",
                    "label": "Convention collective nationale des médecins spécialiste des sociétés de secours minières (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5539",
                    "label": "Convention d'entreprise AFPA"
                },
                {
                    "code": "5541",
                    "label": "Convention collective nationale du rugby professionnel (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5542",
                    "label": "Convention collective nationale du  basket ball professionnel (n'est pas considérée à l'heure actuelle comme une convention de branche)"
                },
                {
                    "code": "5545",
                    "label": "Convention d'entreprise des restaurants PTT"
                },
                {
                    "code": "5546",
                    "label": "Convention d'entreprise CNES"
                },
                {
                    "code": "5547",
                    "label": "Convention d'entreprise Club Méditerranée"
                },
                {
                    "code": "5548",
                    "label": "Convention du comité d'entreprise RATP"
                },
                {
                    "code": "5549",
                    "label": "Convention d'entreprise IRSN"
                },
                {
                    "code": "5551",
                    "label": "Convention d'entreprise Institut Pasteur"
                },
                {
                    "code": "5552",
                    "label": "Convention d'entreprise Société d'agences et de diffusion"
                },
                {
                    "code": "5553",
                    "label": "Convention d'entreprise CCAS"
                },
                {
                    "code": "5554",
                    "label": "Convention collective nationale des officiers du Remorquage maritime "
                },
                {
                    "code": "5555",
                    "label": "Convention collective nationale des navigants d'exécution du Remorquage maritime "
                },
                {
                    "code": "5558",
                    "label": "Accords-convention d'entreprise basés sur l'Accord national Multiservice immobilier et facilties management"
                },
                {
                    "code": "5559",
                    "label": "Convention d'entreprise Alliance emploi"
                },
                {
                    "code": "5562",
                    "label": "Convention d'entreprise Talc de Luzenac"
                },
                {
                    "code": "5563",
                    "label": "Convention d'entreprise Réunion des musées nationaux"
                },
                {
                    "code": "5564",
                    "label": "Convention d'entreprise APEC"
                },
                {
                    "code": "5566",
                    "label": "Convention d'entreprise Société Protectrice des Animaux"
                },
                {
                    "code": "5568",
                    "label": "Convention d'entreprise CIRAD"
                },
                {
                    "code": "5569",
                    "label": "Convention d'entreprise Comédie française"
                },
                {
                    "code": "5570",
                    "label": "Convention d'entreprise Opéra de Paris"
                },
                {
                    "code": "5571",
                    "label": "Convention d'entreprise Fondation d'Auteuil"
                },
                {
                    "code": "5572",
                    "label": "Convention d'entreprise Kiloutou"
                },
                {
                    "code": "5573",
                    "label": "Convention d'entreprise UGAP"
                },
                {
                    "code": "5576",
                    "label": "Convention du groupe AGEFOS PME"
                },
                {
                    "code": "5577",
                    "label": "Convention d'entreprise Agence Française de Développement"
                },
                {
                    "code": "5578",
                    "label": "Convention d'entreprise Agence Nationale pour les Chèques Vacances"
                },
                {
                    "code": "5580",
                    "label": "Convention d'entreprise Radio France "
                },
                {
                    "code": "5583",
                    "label": "Convention d'entreprise Voies navigables de France"
                },
                {
                    "code": "5584",
                    "label": "Accords-convention d'entreprise Laboratoire national de métrologie et d’essais"
                },
                {
                    "code": "5585",
                    "label": "Accords-convention d'entreprise Pioneer"
                },
                {
                    "code": "5586",
                    "label": "Accords-convention d'entreprise SACEM"
                },
                {
                    "code": "5587",
                    "label": "Accords-convention d'entreprise Cité de la musique"
                },
                {
                    "code": "5588",
                    "label": "Accords-convention d'entreprise SACD"
                },
                {
                    "code": "5589",
                    "label": "Convention d'entreprise ARPEJ"
                },
                {
                    "code": "5590",
                    "label": "Convention d'entreprise OPCALIM"
                },
                {
                    "code": "5591",
                    "label": "Convention d'entreprise Louis Vuitton services"
                },
                {
                    "code": "5592",
                    "label": "Convention d'entreprise UES CAMIF"
                },
                {
                    "code": "5593",
                    "label": "Accord de référence FNAB"
                },
                {
                    "code": "5594",
                    "label": "Convention d'entreprise Ortec Services"
                },
                {
                    "code": "5595",
                    "label": "Convention d'entreprise Sede environnement"
                },
                {
                    "code": "5596",
                    "label": "Convention d'entreprise Compagnie des Alpes"
                },
                {
                    "code": "5598",
                    "label": "Convention d'entreprise Eurotunnel"
                },
                {
                    "code": "5599",
                    "label": "Convention d'entreprise Havas"
                },
                {
                    "code": "5600",
                    "label": "Accords-convention d'entreprise CGG Services"
                },
                {
                    "code": "5601",
                    "label": "Accords-convention d'entreprise COSEM"
                },
                {
                    "code": "5602",
                    "label": "Accords-convention d'entreprise Bureau de recherche géologiques et minières "
                },
                {
                    "code": "5603",
                    "label": "Accords-convention d'entreprise Synchrotron Soleil"
                },
                {
                    "code": "5604",
                    "label": "Accords-convention d'entreprise Accor"
                },
                {
                    "code": "5605",
                    "label": "Convention d'entreprise Blondel aérologistique"
                },
                {
                    "code": "5606",
                    "label": "Convention d'entreprise ANFH"
                },
                {
                    "code": "5607",
                    "label": "Convention d'entreprise Danone"
                },
                {
                    "code": "5608",
                    "label": "Convention d'entreprise Arvalis institut du végétal"
                },
                {
                    "code": "5610",
                    "label": "Convention d'entreprise Cinémathèque française"
                },
                {
                    "code": "5611",
                    "label": "Accords-convention d'entreprise ADIE"
                },
                {
                    "code": "5614",
                    "label": "Convention d'entreprise Institut de l'élevage"
                },
                {
                    "code": "5615",
                    "label": "Convention d'entreprise Forum des images"
                },
                {
                    "code": "5616",
                    "label": "Accords-convention d'entreprise CTC"
                },
                {
                    "code": "5617",
                    "label": "Accords-convention d'entreprise Sodexo Justice Services"
                },
                {
                    "code": "5618",
                    "label": "Accords-convention d'entreprise ADEF"
                },
                {
                    "code": "5619",
                    "label": "Convention collective nationale provisoire de la pêche professionnelle maritime"
                },
                {
                    "code": "5620",
                    "label": "Convention d'entreprise Messageries lyonnaises de presse"
                },
                {
                    "code": "5621",
                    "label": "Convention d'entreprise Fondation Jean Moulin"
                },
                {
                    "code": "5622",
                    "label": "Accords-convention d'entreprise CCFD Terre Solidaire "
                },
                {
                    "code": "5623",
                    "label": "Convention d'entreprise du groupement national interprofessionnel des semences graines et plants"
                },
                {
                    "code": "5624",
                    "label": "Accords-convention d'entreprise Secours catholique"
                },
                {
                    "code": "5625",
                    "label": "Convention d'entreprise Médecins du monde"
                },
                {
                    "code": "5627",
                    "label": "Convention d'entreprise du Groupe Technique des Hippodromes Parisiens"
                },
                {
                    "code": "5628",
                    "label": "Statut-convention d'entreprise d'ACPPA"
                },
                {
                    "code": "5629",
                    "label": "Convention d'entreprise d'Unifomation"
                },
                {
                    "code": "5630",
                    "label": "Accords-convention d'entreprise France active"
                },
                {
                    "code": "5631",
                    "label": "Convention d'entreprise UNAF"
                },
                {
                    "code": "5632",
                    "label": "Accords-convention d'entreprise Sodiparc"
                },
                {
                    "code": "5633",
                    "label": "Accords CFA-BTP (numéro provisoire)"
                },
                {
                    "code": "5634",
                    "label": "Accords collaborateurs parlementaires de députés (numéro provisoire)"
                },
                {
                    "code": "7001",
                    "label": "Convention collective nationale des coopératives et SICA de production, transformation et vente du bétail et des viandes"
                },
                {
                    "code": "7002",
                    "label": "Convention collective nationale des coopératives et SICA de céréales, de meunerie, d'approvisionnement et d'alimentation du bétail et d'oléagineux"
                },
                {
                    "code": "7003",
                    "label": "Convention collective nationale des coopératives agricoles, union de coopératives agricoles et SICA fabriquant des conserves de fruits et de légumes, des plats cuisinés et des spécialités"
                },
                {
                    "code": "7004",
                    "label": "Convention collective nationale des coopératives laitières, unions de coopératives laitières et SICA laitières"
                },
                {
                    "code": "7005",
                    "label": "Convention collective nationale des caves coopératives et de leurs unions élargie aux SICA vinicoles"
                },
                {
                    "code": "7006",
                    "label": "Convention collective nationale des coopératives, unions de coopératives agricoles et SICA de fleurs, de fruits et légumes et de pommes de terre"
                },
                {
                    "code": "7007",
                    "label": "Convention collective nationale des coopératives, unions de coopératives agricoles et SICA de teillage de lin"
                },
                {
                    "code": "7008",
                    "label": "Convention collective nationale du personnel des organismes de contrôle laitier"
                },
                {
                    "code": "7009",
                    "label": "Convention collective nationale des entreprises d'accouvage et de sélection de produits avicoles"
                },
                {
                    "code": "7010",
                    "label": "Convention collective nationale du personnel des élévages aquacoles "
                },
                {
                    "code": "7012",
                    "label": "Convention collective nationale des centres équestres"
                },
                {
                    "code": "7013",
                    "label": "Convention collective nationale des établissements d'entraînement des chevaux de courses au trot"
                },
                {
                    "code": "7014",
                    "label": "Convention collective nationale des établissements d'entraînement des chevaux de courses au galop"
                },
                {
                    "code": "7017",
                    "label": "Convention collective nationale des parcs et jardins zoologiques ouverts au public"
                },
                {
                    "code": "7018",
                    "label": "Convention collective nationale des entreprises du paysage"
                },
                {
                    "code": "7019",
                    "label": "Convention collective nationale de la conchyliculture"
                },
                {
                    "code": "7020",
                    "label": "Convention collective nationale du réseau des centres d'économie rurale"
                },
                {
                    "code": "7021",
                    "label": "Convention collective nationale des entreprises relevant de la sélection et de la reproduction animale"
                },
                {
                    "code": "7023",
                    "label": "Convention collective nationale des entreprises agricoles de déshydratation"
                },
                {
                    "code": "7024",
                    "label": "Convention collective nationale PA/CUMA "
                },
                {
                    "code": "7025",
                    "label": "Convention collective nationale ETARF"
                },
                {
                    "code": "7501",
                    "label": "Convention collective nationale des caisses régionales du crédit agricole"
                },
                {
                    "code": "7502",
                    "label": "Convention collective nationale de la Mutualité sociale agricole"
                },
                {
                    "code": "7503",
                    "label": "Convention collective nationale des distilleries coopératives viticoles et SICA de distillation"
                },
                {
                    "code": "7508",
                    "label": "Convention collective nationale des Maisons familiales rurales, instituts ruraux et centres"
                },
                {
                    "code": "7509",
                    "label": "Convention collective nationale des organismes de formation et de promotion agricoles"
                },
                {
                    "code": "7513",
                    "label": "Convention collective nationale des centres d'initiatives pour valoriser l'agriculture et le milieu rural"
                },
                {
                    "code": "7514",
                    "label": "Convention collective nationale des organismes de la Confédération paysanne"
                },
                {
                    "code": "7515",
                    "label": "Convention collective nationale des sociétés d'aménagement foncier et d'établissement rural (SAFER)"
                },
                {
                    "code": "7520",
                    "label": "Convention collective nationale de l'enseignement agricole privé (CNEAP)"
                },
                {
                    "code": "8112",
                    "label": "Convention collective régionale de la polyculture Île-de-France non cadres"
                },
                {
                    "code": "8113",
                    "label": "Convention collective régionale de l'arboriculture maraîchage Île-de-France"
                },
                {
                    "code": "8114",
                    "label": "Convention collective régionale des champignonnières Île-de-France"
                },
                {
                    "code": "8115",
                    "label": "Convention collective régionale des hippodromes Île-de-France Cabourg Caen Chantilly Deauville"
                },
                {
                    "code": "8116",
                    "label": "Convention collective régionale de la polyculture Île-de-France cadres"
                },
                {
                    "code": "8117",
                    "label": "Convention collective régionale des exploitations polyculture élev CUMA Seine et Marne ETAR Ile de France"
                },
                {
                    "code": "8211",
                    "label": "Convention collective régionale des exploitations forestières Champagne Ardenne"
                },
                {
                    "code": "8212",
                    "label": "Convention collective régionale des scieries Champagne Ardenne"
                },
                {
                    "code": "8214",
                    "label": "Convention collective régionale des ETAR Aube Marne polyculture Marne"
                },
                {
                    "code": "8216",
                    "label": "Convention collective régionale de la viticulture Champagne"
                },
                {
                    "code": "8221",
                    "label": "Convention collective régionale des champignonnistes Oise Aisne"
                },
                {
                    "code": "8231",
                    "label": "Convention collective régionale des exploitations forestières Haute Normandie"
                },
                {
                    "code": "8233",
                    "label": "Convention collective régionale des ETAR Haute Normandie"
                },
                {
                    "code": "8234",
                    "label": "Convention collective régionale de l'horticulture et pépiniéristes Haute Normandie"
                },
                {
                    "code": "8241",
                    "label": "Convention collective régionale des exploitations forestières scieries Centre"
                },
                {
                    "code": "8243",
                    "label": "Convention collective régionale des champignonnières Centre"
                },
                {
                    "code": "8244",
                    "label": "Convention collective régionale maraîchère Indre Cher"
                },
                {
                    "code": "8251",
                    "label": "Convention collective régionale des exploitations forestières scieries Calvados Manche Orne"
                },
                {
                    "code": "8252",
                    "label": "Convention collective régionale des travaux agricoles Basse Normandie"
                },
                {
                    "code": "8262",
                    "label": "Convention collective régionale des exploitations agricoles Côte d'or Nièvre Yonne ETAR CUMA Côte d'or"
                },
                {
                    "code": "8311",
                    "label": "Convention collective régionale des exploitations forestières scieries Nord Pas de Calais"
                },
                {
                    "code": "8313",
                    "label": "Convention collective régionale des ETAR Nord Pas de Calais"
                },
                {
                    "code": "8412",
                    "label": "Convention collective régionale des scieries agricoles Alsace Lorraine"
                },
                {
                    "code": "8414",
                    "label": "Convention collective régionale maraîchère Meurthe et Moselle Meuse Moselle et Vosges "
                },
                {
                    "code": "8415",
                    "label": "Convention collective régionale des exploitations forestières Lorraine"
                },
                {
                    "code": "8416",
                    "label": "Convention collective régionale de polyculture Lorraine"
                },
                {
                    "code": "8421",
                    "label": "Convention collective régionale des exploitations forestières Alsace"
                },
                {
                    "code": "8422",
                    "label": "Convention collective régionale de polyculture Alsace"
                },
                {
                    "code": "8431",
                    "label": "Convention collective régionale des exploitations forestières Doubs Jura Haute-Saône Territoire de Belfort "
                },
                {
                    "code": "8432",
                    "label": "Convention collective régionale des scieries agricoles Franche Comté"
                },
                {
                    "code": "8433",
                    "label": "Convention collective régionale de l'horticulture Franche Comté"
                },
                {
                    "code": "8434",
                    "label": "Convention collective régionale des cultures CUMA ETAR Franche Comté"
                },
                {
                    "code": "8435",
                    "label": "Convention collective régionale des coopératives fruitières Ain Doubs Jura"
                },
                {
                    "code": "8522",
                    "label": "Convention collective régionale des exploitations forestières scieries Pays de la Loire"
                },
                {
                    "code": "8523",
                    "label": "Convention collective régionale des exploitations sylvicoles Pays de la Loire"
                },
                {
                    "code": "8525",
                    "label": "Convention collective régionale des ETAR Pays de la Loire"
                },
                {
                    "code": "8526",
                    "label": "Convention collective régionale de l'arboriculture fruitière Ouest de la France"
                },
                {
                    "code": "8531",
                    "label": "Convention collective régionale des exploitations forestières scieries Bretagne"
                },
                {
                    "code": "8532",
                    "label": "Convention collective régionale des ETAR Bretagne"
                },
                {
                    "code": "8534",
                    "label": "Convention collective régionale maraîchère Ille et Vilaine Morbihan"
                },
                {
                    "code": "8535",
                    "label": "Convention collective régionale des CUMA Bretagne Pays de la Loire"
                },
                {
                    "code": "8541",
                    "label": "Convention collective régionale des exploitations forestières scieries Poitou Charentes"
                },
                {
                    "code": "8542",
                    "label": "Convention collective régionale des ETAR Vienne Deux Sèvres production agricole Vienne"
                },
                {
                    "code": "8721",
                    "label": "Convention collective régionale des exploitations forestières scieries Massif Gascogne"
                },
                {
                    "code": "8722",
                    "label": "Convention collective régionale de gemmage forêt Gascogne"
                },
                {
                    "code": "8723",
                    "label": "Convention collective régionale de l'entretien forestier Gascogne"
                },
                {
                    "code": "8731",
                    "label": "Convention collective régionale des exploitations forestières scieries Midi Pyrénées"
                },
                {
                    "code": "8733",
                    "label": "Convention collective régionale des CUMA Tarn Haute Garonne"
                },
                {
                    "code": "8734",
                    "label": "Convention collective régionale de l'horticulture Midi Pyrénées"
                },
                {
                    "code": "8741",
                    "label": "Convention collective régionale des exploitations forestières Limousin"
                },
                {
                    "code": "8821",
                    "label": "Convention collective régionale des ouvriers forestiers communes ONF Rhône Alpes"
                },
                {
                    "code": "8822",
                    "label": "Convention collective régionale des exploitations forestières scieries Rhône Alpes"
                },
                {
                    "code": "8825",
                    "label": "Convention collective régionale de polyculture CUMA Rhône Alpes cadres"
                },
                {
                    "code": "8826",
                    "label": "Convention collective régionale des exploitations trav agricoles CUMA Savoie Hte Savoie"
                },
                {
                    "code": "8831",
                    "label": "Convention collective régionale des exploitations forestières scieries Auvergne"
                },
                {
                    "code": "8832",
                    "label": "Convention collective régionale de polyculture CUMA Haute Loire Lozère"
                },
                {
                    "code": "8912",
                    "label": "Convention collective régionale des ETAR Languedoc Roussillon"
                },
                {
                    "code": "9011",
                    "label": "Convention collective départementale des exploitations agricoles Ain"
                },
                {
                    "code": "9021",
                    "label": "Convention collective départementale des exploitations polyculture Aisne"
                },
                {
                    "code": "9022",
                    "label": "Convention collective départementale des exploitations forestières Aisne"
                },
                {
                    "code": "9032",
                    "label": "Convention collective départementale des exploitations agricoles Allier"
                },
                {
                    "code": "9041",
                    "label": "Convention collective départementale des exploitations agricoles Alpes de Haute Provence"
                },
                {
                    "code": "9051",
                    "label": "Convention collective départementale des exploitations polyculture Hautes Alpes"
                },
                {
                    "code": "9061",
                    "label": "Convention collective départementale des exploitations polyculture Alpes Maritimes"
                },
                {
                    "code": "9062",
                    "label": "Convention collective départementale des exploitations forestières scieries Alpes Maritimes"
                },
                {
                    "code": "9071",
                    "label": "Convention collective départementale des exploitations agricoles Ardèche"
                },
                {
                    "code": "9081",
                    "label": "Convention collective départementale des exploitations polyculture Ardennes"
                },
                {
                    "code": "9091",
                    "label": "Convention collective départementale des exploitations agricoles Ariège"
                },
                {
                    "code": "9101",
                    "label": "Convention collective départementale des exploitations polyculture Aube"
                },
                {
                    "code": "9111",
                    "label": "Convention collective départementale des exploitations agricoles zone céréalière Aude"
                },
                {
                    "code": "9112",
                    "label": "Convention collective départementale des exploitations agricoles zone viticole Aude"
                },
                {
                    "code": "9121",
                    "label": "Convention collective départementale des exploitations agricoles Aveyron"
                },
                {
                    "code": "9131",
                    "label": "Convention collective départementale des exploitations agricoles Bouches du Rhône "
                },
                {
                    "code": "9141",
                    "label": "Convention collective départementale des exploitations polyculture et CUMA Calvados"
                },
                {
                    "code": "9142",
                    "label": "Convention collective départementale des exploitations horticoles fruits Calvados"
                },
                {
                    "code": "9151",
                    "label": "Convention collective départementale des exploitations polyculture Cantal"
                },
                {
                    "code": "9161",
                    "label": "Convention collective départementale des exploitations agricoles Charente"
                },
                {
                    "code": "9171",
                    "label": "Convention collective départementale des exploitations polyculture Charente Maritime"
                },
                {
                    "code": "9181",
                    "label": "Convention collective départementale des exploitations polyculture Cher"
                },
                {
                    "code": "9182",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Cher"
                },
                {
                    "code": "9191",
                    "label": "Convention collective départementale des exploitations agricoles Corrèze"
                },
                {
                    "code": "9201",
                    "label": "Convention collective départementale des exploitations agricoles Corse du Sud"
                },
                {
                    "code": "9202",
                    "label": "Convention collective départementale des exploitations agricoles Haute Corse"
                },
                {
                    "code": "9211",
                    "label": "Convention collective départementale des exploitations forestières scieries Côte d'or"
                },
                {
                    "code": "9221",
                    "label": "Convention collective départementale des exploitations polyculture Côtes d'Armor"
                },
                {
                    "code": "9222",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Côtes d'Armor"
                },
                {
                    "code": "9231",
                    "label": "Convention collective départementale des exploitations agricoles Creuse"
                },
                {
                    "code": "9232",
                    "label": "Convention collective départementale des exploitations pépinières sylvicoles Creuse"
                },
                {
                    "code": "9241",
                    "label": "Convention collective départementale des exploitations agricoles Dordogne"
                },
                {
                    "code": "9261",
                    "label": "Convention collective départementale des exploitations agricoles Drôme"
                },
                {
                    "code": "9272",
                    "label": "Convention collective départementale des exploitations polyculture Eure non cadres"
                },
                {
                    "code": "9273",
                    "label": "Convention collective départementale des exploitations polyculture Eure cadres"
                },
                {
                    "code": "9281",
                    "label": "Convention collective départementale des exploitations polyculture, élevage et CUMA Eure et Loir"
                },
                {
                    "code": "9283",
                    "label": "Convention collective départementale des exploitations horticoles fruitières jardinerie Eure et Loire"
                },
                {
                    "code": "9291",
                    "label": "Convention collective départementale des exploitations polyculture, élevage et maraîchage Finistère"
                },
                {
                    "code": "9292",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Finistère"
                },
                {
                    "code": "9301",
                    "label": "Convention collective départementale des exploitations agricoles Gard"
                },
                {
                    "code": "9302",
                    "label": "Convention collective départementale des exploitations agricoles Gard cadres"
                },
                {
                    "code": "9311",
                    "label": "Convention collective départementale des exploitations agricoles Haute Garonne"
                },
                {
                    "code": "9321",
                    "label": "Convention collective départementale des exploitations agricoles Gers"
                },
                {
                    "code": "9331",
                    "label": "Convention collective départementale des exploitations agricoles Gironde"
                },
                {
                    "code": "9341",
                    "label": "Convention collective départementale des exploitations agricoles Hérault"
                },
                {
                    "code": "9351",
                    "label": "Convention collective départementale des exploitations polyculture, élevage et CUMA Ille et Vilaine"
                },
                {
                    "code": "9352",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Ille et Vilaine"
                },
                {
                    "code": "9361",
                    "label": "Convention collective départementale des exploitations polyculture, élevage et CUMA Indre"
                },
                {
                    "code": "9362",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Indre"
                },
                {
                    "code": "9371",
                    "label": "Convention collective départementale des exploitations polyculture, élevage viticulture Indre et Loire"
                },
                {
                    "code": "9372",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Indre et Loire"
                },
                {
                    "code": "9374",
                    "label": "Convention collective départementale des exploitations arboriculture fruitière Indre et Loire"
                },
                {
                    "code": "9383",
                    "label": "Convention collective départementale des exploitations agricoles CUMA Isère"
                },
                {
                    "code": "9401",
                    "label": "Convention collective départementale des exploitations agricoles Landes"
                },
                {
                    "code": "9411",
                    "label": "Convention collective départementale des exploitations agricoles Loir et Cher"
                },
                {
                    "code": "9412",
                    "label": "Convention collective départementale des ETAR CUMA Loir et Cher"
                },
                {
                    "code": "9413",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Loir et Cher"
                },
                {
                    "code": "9421",
                    "label": "Convention collective départementale des exploitations agricoles Loire"
                },
                {
                    "code": "9422",
                    "label": "Convention collective départementale des CUMA Loire"
                },
                {
                    "code": "9441",
                    "label": "Convention collective départementale des exploitations agricoles Loire Atlantique"
                },
                {
                    "code": "9442",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Loire Atlantique"
                },
                {
                    "code": "9444",
                    "label": "Convention collective départementale des exploitations maraîchères Loire Atlantique"
                },
                {
                    "code": "9451",
                    "label": "Convention collective départementale des exploitations polyculture élevage Loiret"
                },
                {
                    "code": "9452",
                    "label": "Convention collective départementale des CUMA Loiret"
                },
                {
                    "code": "9456",
                    "label": "Convention collective départementale des exploitations cultures spécialisées Loiret"
                },
                {
                    "code": "9461",
                    "label": "Convention collective départementale des exploitations agricoles Lot"
                },
                {
                    "code": "9471",
                    "label": "Convention collective départementale des exploitations agricoles Lot et Garonne"
                },
                {
                    "code": "9472",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Lot et Garonne"
                },
                {
                    "code": "9491",
                    "label": "Convention collective départementale des exploitations polyculture, élevage Maine et Loire"
                },
                {
                    "code": "9492",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Maine et Loire"
                },
                {
                    "code": "9493",
                    "label": "Convention collective départementale des champignonnières Maine et Loire"
                },
                {
                    "code": "9494",
                    "label": "Convention collective départementale des exploitations maraîchères Maine et Loire"
                },
                {
                    "code": "9497",
                    "label": "Convention collective départementale des producteurs graines Maine et Loire"
                },
                {
                    "code": "9501",
                    "label": "Convention collective départementale des exploitations agricoles Manche"
                },
                {
                    "code": "9502",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Manche"
                },
                {
                    "code": "9521",
                    "label": "Convention collective départementale des polyculture pépinières horticulture CUMA Haute Marne"
                },
                {
                    "code": "9531",
                    "label": "Convention collective départementale des exploitations polyculture élevage Mayenne"
                },
                {
                    "code": "9532",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Mayenne"
                },
                {
                    "code": "9561",
                    "label": "Convention collective départementale des exploitations polyculture élevage Morbihan"
                },
                {
                    "code": "9562",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Morbihan"
                },
                {
                    "code": "9581",
                    "label": "Convention collective départementale des exploitations forestières Nièvre"
                },
                {
                    "code": "9591",
                    "label": "Convention collective départementale des exploitations polyculture élevage Nord"
                },
                {
                    "code": "9592",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Nord"
                },
                {
                    "code": "9601",
                    "label": "Convention collective départementale des exploitations polyculture élevage Oise"
                },
                {
                    "code": "9602",
                    "label": "Convention collective départementale des exploitations forestières Oise"
                },
                {
                    "code": "9603",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Oise"
                },
                {
                    "code": "9612",
                    "label": "Convention collective départementale des exploitations polyculture élevage Orne"
                },
                {
                    "code": "9613",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Orne"
                },
                {
                    "code": "9621",
                    "label": "Convention collective départementale des exploitations polyculture élevage Pas de Calais"
                },
                {
                    "code": "9622",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Pas de Calais "
                },
                {
                    "code": "9631",
                    "label": "Convention collective départementale des exploitations agricoles Puy de Dôme"
                },
                {
                    "code": "9641",
                    "label": "Convention collective départementale des exploitations agricoles Pyrénées Atlantiques"
                },
                {
                    "code": "9651",
                    "label": "Convention collective départementale des exploitations agricoles Hautes Pyrénées"
                },
                {
                    "code": "9661",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Pyrénées Orientales"
                },
                {
                    "code": "9691",
                    "label": "Convention collective départementale des exploitations agricoles Rhône"
                },
                {
                    "code": "9711",
                    "label": "Convention collective départementale des exploitations forestières Saône et Loire"
                },
                {
                    "code": "9712",
                    "label": "Convention collective départementale des exploitations agricoles Saône et Loire"
                },
                {
                    "code": "9721",
                    "label": "Convention collective départementale des exploitations polyculture élevage Sarthe"
                },
                {
                    "code": "9722",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Sarthe"
                },
                {
                    "code": "9723",
                    "label": "Convention collective départementale des exploitations maraîchères Sarthe"
                },
                {
                    "code": "9725",
                    "label": "Convention collective départementale des champignonnières Sarthe"
                },
                {
                    "code": "9761",
                    "label": "Convention collective départementale des exploitations agricoles Seine Maritime"
                },
                {
                    "code": "9762",
                    "label": "Convention collective départementale des exploitations maraîchères Seine Maritime"
                },
                {
                    "code": "9791",
                    "label": "Convention collective départementale des exploitations agricoles Deux Sèvres"
                },
                {
                    "code": "9801",
                    "label": "Convention collective départementale des exploitations forestières Somme"
                },
                {
                    "code": "9802",
                    "label": "Convention collective départementale des exploitations polyculture élevage et CUMA, ETAR Somme"
                },
                {
                    "code": "9811",
                    "label": "Convention collective départementale des exploitations agricoles Tarn"
                },
                {
                    "code": "9821",
                    "label": "Convention collective départementale des exploitations agricoles Tarn et Garonne"
                },
                {
                    "code": "9831",
                    "label": "Convention collective départementale des exploitations agricoles Var"
                },
                {
                    "code": "9841",
                    "label": "Convention collective départementale des exploitations agricoles Vaucluse"
                },
                {
                    "code": "9851",
                    "label": "Convention collective départementale des exploitations polyculture élevage Vendée"
                },
                {
                    "code": "9852",
                    "label": "Convention collective départementale des exploitations pépinières horticulture Vendée"
                },
                {
                    "code": "9853",
                    "label": "Convention collective départementale des exploitations maraîchères Vendée"
                },
                {
                    "code": "9862",
                    "label": "Convention collective départementale des  champignonnières Vienne"
                },
                {
                    "code": "9871",
                    "label": "Convention collective départementale des exploitations agricoles Haute Vienne"
                },
                {
                    "code": "9891",
                    "label": "Convention collective départementale des exploitations forestières Yonne"
                },
                {
                    "code": "9971",
                    "label": "Convention collective départementale des exploitations bananières Martinique"
                },
                {
                    "code": "9972",
                    "label": "Convention collective départementale des exploitations agricoles Guyane"
                },
                {
                    "code": "9998",
                    "label": "___Convention non encore en vigueur___"
                },
                {
                    "code": "9999",
                    "label": "___Sans convention collective___"
                }
            ],
            skipDuplicates: true, // Note skipDuplicates is not supported when using MongoDB or SQLServer.


        })

    } catch (err) {
        console.error(err)
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })