import { DsnParser } from "@fibre44/dsn-parser";

export const extractDsn = async (path: string) => {
    try {
        const options = {
            controleDsnVersion: true,
            deleteFile: true
        }
        const dsnParser = new DsnParser()
        await dsnParser.asyncInit(path, options)
        const society = dsnParser.smartExtraction.society
        const dsn = dsnParser.dsn
        const statement = dsnParser.statement
        const rateAt = dsnParser.rateAt
        const contributionFund = dsnParser.contributionFund
        const idcc = dsnParser.workContract.map((contract) => contract.idcc).flat(1)
        const job = dsnParser.smartExtraction.employees.map((employee) => employee.workContracts.map((contract) => contract.employmentLabel)).flat(3)
        const sender = dsnParser.sender
        const mutual = dsnParser.mutual
        const datas = {
            dsn,
            society,
            statement,
            rateAt,
            contributionFund,
            idcc,
            job,
            sender,
            mutual
        }
        return datas
    } catch (err) {
        console.error(err);
        throw new Error(`Erreur lors de l'analyse du fichier DSN : ${err}`)
    }
}


