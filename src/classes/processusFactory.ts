import { StandardProcessusSociety } from "./standardProcessusSociety"
import { StandardProcessusEstablishment } from "./standardProcessusEstablishment"
import { StandardProcessusUrssaf } from "./standardProcessusURSSAF"
import { StandardProcessusRateAt } from "./standardProcessusRateAt"
import { StandardProcessusJob } from "./standardProcessusJob"
import { StandardProcessusCcn } from "./standardProcessusCcn"
import { StandardProcessusCoefficient } from "./standardProcessusCoefficient"
import { StandardProcessusNiveau } from "./standardProcessusNiveau"
import { StandardProcessusEchelon } from "./standardProcessusEchelon"
import { StandardProcessusDsn } from "./standardProcessusDsn"
import { StandardProcessusIndice } from "./standardProcessusIndice"
import { StandardProcessusQualification } from "./standardProcessusQualification"
import { StandardProcessusAgircArrco } from "./standardProcessusAGIRCARRCO"
import { StandardProcessusPrevoyance } from "./standardProcessusPrevoyance"
import { StandardProcessusMutual } from "./standardProcessusMutuelle"
import { StandardProcessusPaidLeave } from "./standardProcessusCP"
import { StandardProcessusService } from "./standardProcessusService"
import { StandardProcessusBank } from "./standardProcessusBank"
import { StandardProcessusEstablishmentBank } from "./standardProcessusEstablishmentBank"
import { StandardProcessusFreeZone } from "./standardProcessusFreeZone"
import { StandardProcessusSocietyFreeZone } from "./standardProcessusSocietyFreeZone"
import { StandardProcessusAbsence } from "./standardProcessusAbsences"
import { StandardProcessusSalary } from "./standardProcessusSalary"
import { StandardProcessusTableSeniority } from "./standardProcessusTableSeniority"
import { StandardProcessusTableSeniorityRow } from "./standardProcessusTableSeniorityRow"
import { StandardProcessusContribution } from "./standardProcessusContribution"
export class ProcessusFactory {

    static create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel
    }: {
        processusSlug: string,
        clientId: string,
        projectLabel: string,
        sofwareLabel: string

    }) {

        switch (processusSlug) {
            case 'Standard_Processus_DSN':
                return new StandardProcessusDsn(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Society':
                return new StandardProcessusSociety(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Establishment':
                return new StandardProcessusEstablishment(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_URSSAF':
                return new StandardProcessusUrssaf(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_RateAt':
                return new StandardProcessusRateAt(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_job':
                return new StandardProcessusJob(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_ccn':
                return new StandardProcessusCcn(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_coefficient':
                return new StandardProcessusCoefficient(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_niveau':
                return new StandardProcessusNiveau(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_echelon':
                return new StandardProcessusEchelon(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_indice':
                return new StandardProcessusIndice(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_qualification':
                return new StandardProcessusQualification(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_AGIRC-ARRCO':
                return new StandardProcessusAgircArrco(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Prevoyance':
                return new StandardProcessusPrevoyance(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Mutuelle':
                return new StandardProcessusMutual(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_CP':
                return new StandardProcessusPaidLeave(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_services':
                return new StandardProcessusService(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Bank':
                return new StandardProcessusBank(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Establisment_Bank':
                return new StandardProcessusEstablishmentBank(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Free_Zones':
                return new StandardProcessusFreeZone(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Society_Free_Zone':
                return new StandardProcessusSocietyFreeZone(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Absences':
                return new StandardProcessusAbsence(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Salary':
                return new StandardProcessusSalary(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Table_Seniority':
                return new StandardProcessusTableSeniority(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Table_Seniority_Row':
                return new StandardProcessusTableSeniorityRow(projectLabel, sofwareLabel, clientId, processusSlug)
                break
            case 'Standard_Processus_Contribution':
                return new StandardProcessusContribution(projectLabel, sofwareLabel, clientId, processusSlug)
                break

            default:
                throw new Error("Processus introuvable")
        }
    }

}