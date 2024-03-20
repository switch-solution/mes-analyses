import { PrismaClient } from '@prisma/client'
import { formV0001Seed } from './seed/3_form.v0001.seed'
import { idccV0001Seed } from './seed/2_idcc.v0001.seed'
import { settingV0001 } from './seed/1_setting.v0001.seed'
import { bookV0001Seed } from './seed/4_book.v0001.seed'
import { formV0002Seed } from './seed/9_form.v0002.seed'
import { bookV0002Seed } from './seed/8_book.v0002.seed'
import { legalV0001Seed } from './seed/5_legal.v0001.seed'
import { chapterFormV0001Seed } from './seed/6_chapterForm.v0001.seed'
import { taskV0001Seed } from './seed/7_task.v0001.seed'
import { bookV0003Seed } from './seed/10_book.v0003.seed'
import { bookV0004Seed } from './seed/11_book.v0004.seed'
import { bookV0005Seed } from './seed/12_book.v0005.seed'
import { formV0003Seed } from './seed/13_form.v0003.seed'
import { bookV0006Seed } from './seed/14_book.v0006.seed'
import { formV0004Seed } from './seed/15_form.v0004.seed'
import { bookV0007Seed } from './seed/16_book.v0007.seed'
import { bookV0008Seed } from './seed/17_book.v0008.seed'
import { absenceV0001 } from './seed/18_absence.v0001.seed'
import { formV0005Seed } from './seed/19_form.v0005.seed'
import { bookV0009Seed } from './seed/20_book.v0009.seed'
import { bookV0010Seed } from './seed/21_book.v0010.seed'
import { formV0006Seed } from './seed/22_form.v0006.seed'
import { bookV0011Seed } from './seed/23_book.v0011.seed'
import { bookV0012Seed } from './seed/24_book.v0012.seed'
import { bookV0013Seed } from './seed/25_book.v0013.seed'
import { inputV0001Seed } from './seed/26_input.v0001.seed'
import { itemV0001Seed } from './seed/28_item.v0001.seed'
import { defaultSettingV0001 } from './seed/27_defaultSetting.v0001.seed'
import { formV0007Seed } from './seed/29_form.v0007.seed'
import { opsV00001Seed } from './seed/30_ops.v00001.seed'
import { opsV00002Seed } from './seed/31_ops.v00002.seed'
import { opsV00003Seed } from './seed/32_ops.v00003.seed'
import { opsV00004Seed } from './seed/33_ops.v00004.seed'
import { textareaV0001 } from './seed/34_textarea.v0001.seed'
import { settingV0002 } from './seed/35_setting.v0002.seed'
import { dsnAbsenceV0001 } from './seed/36_dsn_absence.v0001.seed'
import { settingV0003 } from './seed/37_setting.v0003.seed'
import { absenceV0002 } from './seed/38_absence.v0002.seed'
import { counterV0001 } from './seed/39_counter.v0001.seed'
import { accumulationV0001 } from './seed/40_accumulation.v0001.seed'
import { tableV0001 } from './seed/41_table.v0001.seed'
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

const main = async () => {
    await settingV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await idccV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })

    await legalV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await chapterFormV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await taskV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0003Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0004Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0005Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0003Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0006Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0004Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0007Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0008Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await absenceV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0005Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0009Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0010Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0006Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0011Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0012Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await bookV0013Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await inputV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await defaultSettingV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await itemV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0007Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await opsV00001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await opsV00002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await opsV00003Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await opsV00004Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await textareaV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await settingV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await dsnAbsenceV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await settingV0003.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await absenceV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await counterV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await accumulationV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await tableV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })


}

main()