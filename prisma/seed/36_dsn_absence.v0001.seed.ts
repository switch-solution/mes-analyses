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

class DsnAbsenceV0001 extends Seed {
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
                const absences = [
                    { id: '112', label: 'Invalidité catégorie 1' },
                    { id: '114', label: 'Invalidité catégorie 2' },
                    { id: '116', label: 'Invalidité catégorie 3' },
                    { id: '200', label: 'COP (Congés payés)' },
                    { id: '301', label: 'Congé de Formation Professionnelle' },
                    { id: '501', label: 'Congé divers non rémunéré' },
                    { id: '507', label: 'Chômage intempéries' },
                    { id: '601', label: 'Mobilité (volontaire sécurisée, internationale des alternants, …)' },
                    { id: '602', label: 'Chômage sans rupture de contrat' },
                    { id: '603', label: 'Détention provisoire' },
                    { id: '605', label: 'Congé statutaire' },
                    { id: '606', label: "Détachement d'un salarié IEG en France" },
                    { id: '607', label: 'Congé de présence parentale' },
                    { id: '608', label: "CASA-CATS (Cessation d'Activité des Travailleurs Salariés)" },
                    { id: '609', label: 'CIF (Congé Individuel de Formation)' },
                    { id: '610', label: 'Projet de Transition Professionnelle (PTP) ou Congé de Reconversion Professionnelle (CRP)' },
                    { id: '611', label: 'Congé de bilan de compétences' },
                    { id: '612', label: 'Congé de candidat parlementaire ou élu à un mandat local' },
                    { id: '615', label: "Congé de formation de cadres et d'animateurs pour la jeunesse" },
                    { id: '617', label: 'Congé de formation pour les salariés de moins de 25 ans' },
                    { id: '618', label: 'Congé de formation économique, sociale et syndicale' },
                    { id: '620', label: 'Congé de mobilité' },
                    { id: '621', label: "Congé de participation aux instances d'emploi ou de formation professionnelle" },
                    { id: '625', label: 'Congé de reclassement' },
                    { id: '626', label: 'Congé de représentation' },
                    { id: '627', label: 'Congé de solidarité familiale' },
                    { id: '628', label: 'Congé de solidarité internationale' },
                    { id: '630', label: "Congé d'enseignement ou de recherche" },
                    { id: '631', label: 'Congé mutualiste de formation' },
                    { id: '632', label: "Congé parental d'éducation" },
                    { id: '633', label: 'Congé pour acquisition de la nationalité' },
                    { id: '634', label: 'Congé pour catastrophe naturelle' },
                    { id: '635', label: "Congé pour création ou reprise d'entreprise" },
                    { id: '636', label: 'Congé pour enfant malade' },
                    { id: '637', label: 'Congé pour évènement familial' },
                    { id: '638', label: "Congé pour validation des acquis de l'expérience" },
                    { id: '639', label: 'Congé sabbatique' },
                    { id: '642', label: "Convention FNE d'aide au passage à temps partiel" },
                    { id: '643', label: "Congé de conversion avec prise en charge par l'Etat" },
                    { id: '644', label: "Congé de conversion sans prise en charge par l'Etat" },
                    { id: '645', label: 'Préretraite progressive' },
                    { id: '646', label: "Préretraite d'entreprise sans rupture de contrat de travail" },
                    { id: '647', label: "Réduction temps d'emploi" },
                    { id: '648', label: "Conventions d'Allocations Spéciales du FNE(ASFNE)" },
                    { id: '650', label: 'Congé de proche aidant' },
                    { id: '651', label: 'Congé pour mandat parlementaire' },
                    { id: '652', label: 'Inaptitude temporaire liée à la grossesse' },
                    { id: '653', label: 'Maintien de salaire – personnel navigant de l’aéronautique civile' },
                    { id: '654', label: 'Inactivité temps alterné – personnel navigant de l’aéronautique civile' },
                    { id: '655', label: '[FP] Détachement conduisant à pension (ECP)' },
                    { id: '656', label: '[FP] Congé pour cessation anticipée d’activité du fait d’une maladie professionnelle provoquée par l’amiante' },
                    { id: '657', label: '[FP] Absence concertée de travail' },
                    { id: '658', label: '[FP] Congé spécial' },
                    { id: '659', label: "[FP] Période d'instruction militaire ou réserve opérationnelle" },
                    { id: '660', label: "[FP] Congé avec traitement période d'instruction militaire obligatoire" },
                    { id: '661', label: 'FP] Congé organisations de jeunesse' },
                    { id: '662', label: '[FP] Congé pour siéger auprès d’une association, d’une mutuelle, d’une instance de l’Etat ou d’une collectivité' },
                    { id: '663', label: "[FP] Congé non rémunéré de 18 jours pour mandats municipaux ou départementaux ou régionaux" },
                    { id: '664', label: "[FP] Congé avec traitement pour période d'activité dans la réserve de sécurité civile" },
                    { id: '665', label: "[FP] Congé pour période d'activité dans la réserve sanitaire" },
                    { id: '666', label: '[FP] Congé pour recherches ou conversions thématiques' },
                    { id: '667', label: '[FP] Congé pour raisons opérationnelles et activités privées des sapeurs-pompiers professionnels' },
                    { id: '668', label: '[FP] Congé pour raisons opérationnelles cotisé des sapeurs-pompiers professionnels' },
                    { id: '669', label: '[FP] Congé pour difficultés opérationnelles des sapeurs-pompiers professionnels' },
                    { id: '670', label: "[FP] Congé pour période d'activité dans la réserve civile de la police" },
                    { id: '671', label: '[FP] Exclusion temporaire de fonctions' },
                    { id: '672', label: '[FP] Suspension' },
                    { id: '673', label: '[FP] Absences irrégulières (service non fait)' },
                    { id: '674', label: '[FP] Détachement ne conduisant pas à pension (ENCP)' },
                    { id: '675', label: '[FP] Disponibilité' },
                    { id: '676', label: '[FP] Disponibilité pour maladie' },
                    { id: '677', label: 'Disponibilité pour élever un enfant âgé de moins de 12 ans' },
                    { id: '678', label: '[FP] Position hors cadres' },
                    { id: '680', label: 'Congé sans solde cotisés' },
                    { id: '681', label: 'Détachement hors IEG' },
                    { id: '683', label: 'Potentiel nouveau motif de suspension A' },
                    { id: '684', label: 'Potentiel nouveau motif de suspension B' },
                    { id: '685', label: 'Potentiel nouveau motif de suspension C' },
                    { id: '686', label: 'Contrat suspendu pour expatriation' },
                    { id: '687', label: 'Potentiel nouveau motif de suspension D' },
                    { id: '688', label: 'Potentiel nouveau motif de suspension E' },
                    { id: '998', label: 'Annulation' },
                    { id: '01', label: 'Maladie' },
                    { id: '02', label: 'Maternité' },
                    { id: '03', label: 'paternité / accueil de l’enfant' },
                    { id: '05', label: 'congé suite à maladie professionnelle' },
                    { id: '06', label: 'congé suite à accident de travail ou de service' },
                    { id: '07', label: 'femme enceinte dispensée de travail' },
                    { id: '09', label: 'adoption' },
                    { id: '10', label: '[FP] Congé suite à une maladie imputable au service' },
                    { id: '11', label: '[FP] Congé de maladie des victimes ou réformés de guerre (art 41)' },
                    { id: '12', label: '[FP] Congé de longue durée' },
                    { id: '13', label: '[FP] Congé de longue maladie' },
                    { id: '14', label: '[FP] Congé pour invalidité temporaire imputable au service' },
                    { id: '15', label: 'temps partiel thérapeutique (risque maladie)' },
                    { id: '16', label: 'temps partiel thérapeutique (risque accident de travail)' },
                    { id: '17', label: 'temps partiel thérapeutique (risque accident de trajet)' },
                    { id: '18', label: 'temps partiel thérapeutique (risque maladie professionnelle)' },
                    { id: '19', label: "Deuil d'enfant" },
                    { id: '20', label: "Potentiel nouveau motif d’arrêt A" },
                    { id: '21', label: "Potentiel nouveau motif d’arrêt B" },
                    { id: '22', label: "Potentiel nouveau motif d’arrêt C" },
                    { id: '23', label: "Potentiel nouveau motif d’arrêt D" },
                    { id: '24', label: "Potentiel nouveau motif d’arrêt E" },

                ]

                await prisma.dsn_Absence.createMany({
                    data: absences
                })
                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }

}

export const dsnAbsenceV0001 = new DsnAbsenceV0001("DSN_ABSENCE_V0001", "Paramétrage des absences DSN", 36, "SETTING_V0002")

