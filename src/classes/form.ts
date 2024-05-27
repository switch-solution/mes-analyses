import { prisma } from '@/lib/prisma'
export class Form {
    slug: string;
    constructor(slug: string) {
        this.slug = slug;
    }

    async editForm({
        label,
        description,
        status,
        repository
    }: {
        label: string,
        description?: string,
        status: 'Validé' | 'Archivé' | 'En attente',
        repository?: string
    }) {
        try {
            await prisma.form.update({
                where: {
                    slug: this.slug

                },
                data: {
                    label,
                    description,
                    status,
                    repository

                }
            })
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de modifier le formulaire');
        }
    }

    async formExist() {
        try {
            const form = await prisma.form.findUniqueOrThrow({
                where: {
                    slug: this.slug
                }
            });
            return form;
        } catch (err) {
            console.error(err);
            throw new Error('Le formulaire n\'existe pas');
        }
    }
    async getPage() {
        try {
            const pages = await prisma.form.findMany({
                where: {
                    slug: this.slug
                },
                include: {
                    Page_Block_Form: true
                }

            })
            return pages;
        } catch (err) {
            console.error(err);
            throw new Error('La page n\'a pas pu être récupérée');
        }
    }
    async getFiedls() {
        try {
            const fields = await prisma.form.findMany({
                where: {
                    slug: this.slug

                },
                include: {
                    FormField: true
                }
            })
            return fields;
        } catch (err) {
            console.error(err);
            throw new Error('Les champs du formulaire n\'ont pas pu être récupérés');
        }
    }


    async addField({
        formId,
        formVersion,
        label,
        type,
        userId
    }: {
        formId: string,
        formVersion: number,
        label: string,
        userId: string,
        type: "Champ texte" | "Champ numérique" | "Boite à cocher" | "Liste déroulante"

    }) {
        try {
            let htmlElement
            switch (type) {
                case 'Champ texte':
                    htmlElement = 'input';
                    break;
                case 'Liste déroulante':
                    htmlElement = 'select';
                    break;
                case 'Boite à cocher':
                    htmlElement = 'switch';
                    break;
                case 'Champ numérique':
                    htmlElement = 'input';
                    break;
                default:
                    throw new Error('Le type de champ n\'est pas valide');
                    break;
            }
            const count = await prisma.formField.count()
            const order = await prisma.formField.count({
                where: {
                    formId,
                    formVersion
                }
            })
            await prisma.formField.create({
                data: {
                    formId,
                    formVersion,
                    label,
                    type,
                    htmlElement,
                    id: `LOG_FIELD_${count + 1}`,
                    slug: `LOG_FIELD_${count + 1}`,
                    order: order + 1,
                    createdBy: userId
                }
            })
        } catch (err) {
            console.error(err);
            throw new Error('Le champ n\'a pas pu être ajouté');
        }
    }
    async duplicate({
        pageBlockId,
        softwareLabel,
        clientId
    }: {
        pageBlockId: string,
        softwareLabel: string,
        clientId: string
    }) {
        try {
            const form = await this.formExist();
            const fields = await this.getFiedls();
            const countForm = await prisma.form.count()
            const newId = `LOG_FORM_${countForm + 1}`
            const newForm = await prisma.form.create({
                data: {
                    ...form,
                    id: newId,
                    slug: newId,
                    clientId,
                    softwareLabel,
                    originalFormId: form.id,
                    originalFormVersion: form.version,
                    level: 'Logiciel',
                }
            })
            await prisma.page_Block_Form.create({
                data: {
                    formId: newForm.id,
                    formVersion: newForm.version,
                    pageBlockId,
                    clientId,
                    softwareLabel
                }
            })
            let countField = await prisma.formField.count()
            const newFields = fields.map(form => {
                return form.FormField.map(field => {
                    countField = countField + 1
                    let id = `LOG_FIELD_${countField}`
                    return {
                        ...field,
                        formId: newForm.id,
                        id,
                        slug: id,
                        originalFieldId: field.id,
                        originalFormId: field.formId
                    }

                })
            }).flat(1)
            await prisma.formField.createMany({
                data: newFields
            })

        } catch (err) {
            console.error(err);
            throw new Error('Le formulaire n\'a pas pu être dupliqué');
        }
    }
    async editValue({
        formGroup,
        data
    }: {
        formGroup: string,
        data: { [key: string]: string }
    }) {
        try {

            Object.keys(data).map(async key => {
                try {
                    await prisma.form_Value.updateMany({
                        where: {
                            formGroupId: formGroup,
                            label: key
                        },
                        data: {
                            value: data[key]
                        }
                    })
                } catch (err) {
                    console.error(err);
                    throw new Error('Impossible de modifier les valeurs du formulaire');
                }
            })

        } catch (err) {
            console.error(err);
            throw new Error('Impossible de modifier les valeurs du formulaire');
        }
    }

    async initValue({
        clientId,
        softwareLabel,
        projectLabel,
        mode,
        pageId
    }: {
        clientId: string,
        softwareLabel: string,
        projectLabel?: string | null,
        mode: 'Project' | 'Editeur',
        pageId: string | null

    }) {
        try {
            const formExist = await this.formExist();
            const fields = await this.getFiedls();

            const datas = fields.map(form => {
                return form.FormField.map(field => {
                    return {
                        value: '',
                        type: field.type,
                        fieldId: field.id,
                        label: field.label,
                        order: field.order,
                        projectLabel: projectLabel,
                        clientId,
                        softwareLabel,

                    }
                })

            }).flat(1)

            await prisma.form_Group.create({
                data: {
                    formId: formExist.id,
                    formVersion: formExist.version,
                    clientId,
                    softwareLabel,
                    projectLabel,
                    mode,
                    pageId,
                    Form_Value: {
                        create: datas
                    }
                }

            })
            return

        } catch (err) {
            console.error(err);
            throw new Error('Impossible d\'initialiser les valeurs du formulaire');
        }
    }

    async getDynamicFormElements({
        clientId,
        softwareLabel,
        mode,
        projectLabel,
        pageId
    }: {
        clientId: string,
        softwareLabel: string,
        mode: 'Project' | 'Editeur',
        projectLabel?: string | null,
        pageId?: string | null
    }) {
        try {
            const form = await this.formExist();
            const formGroup = await prisma.form.findUnique({
                where: {
                    slug: this.slug
                },
                include: {
                    Form_Group: {
                        where: {
                            clientId,
                            softwareLabel: softwareLabel,
                            mode,
                            projectLabel,
                            pageId
                        }
                    }

                }
            })
            const fieldsList = await this.getFiedls()
            const fields = fieldsList.map(form => {
                return form.FormField.map(field => {
                    return {
                        id: field.id,
                        label: field.label,
                        type: field.type,
                        htmlElement: field.htmlElement,
                        order: field.order,
                        min: field.min,
                        max: field.max,
                        required: field.required,
                        slug: field.slug,
                        sourceDsnId: field.sourceDsnId,
                        optionsFormId: field.optionsFormId,
                        optionsInputId: field.optionsInputId,
                        options: field.options,
                        minLength: field.minLength,
                        maxLength: field.maxLength,
                        placeholder: field.placeholder,

                    }
                })
            }).flat(1)
            const datasList = await prisma.form.findUnique({
                where: {
                    slug: this.slug
                },
                include: {
                    Form_Group: {
                        where: {
                            clientId,
                            softwareLabel: softwareLabel,
                            mode,
                            projectLabel
                        },
                        include: {
                            Form_Value: {
                                orderBy: {
                                    order: 'asc'
                                }
                            }

                        }
                    }
                }
            })
            const datasExist = datasList?.Form_Group.map(formGroup => {
                return formGroup.Form_Value.map(value => {
                    return {
                        formGroupId: value.formGroupId,
                        value: value.value,
                        fieldId: value.fieldId,
                        label: value.label,
                        order: value.order,
                        type: value.type,
                        projectLabel: value.projectLabel,
                        clientId: value.clientId,
                        softwareLabel: value.softwareLabel
                    }
                })
            }).flat(1)
            const datas: { formGroup: string, [key: string]: string }[] = []
            if (datasExist && formGroup?.Form_Group) {
                for (const form of formGroup.Form_Group) {
                    const filterDataFormGroup = datasExist.filter(data => data.formGroupId === form.formGroup)
                    for (const data of filterDataFormGroup) {
                        //Bug findData ne charge pas la bonne valeur
                        //let findData = datasExist.find(data => data.fieldId === data.fieldId)
                        let findData = await prisma.form_Value.findFirst({
                            where: {
                                formGroupId: form.formGroup,
                                fieldId: data.fieldId
                            }
                        })
                        let field = fields.find(field => field.id === data.fieldId)
                        if (findData && field) {
                            datas.push({
                                formGroup: form.formGroup,
                                [field.label]: findData.value
                            })
                        }

                    }
                }

            }

            return {
                form,
                formGroup,
                fields,
                datas

            }
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer le groupe de formulaire');
        }

    }

    async deleteValue(
        formGroup: string
    ) {
        try {
            const formExist = await this.formExist();

            await prisma.form_Group.deleteMany({
                where: {
                    formId: formExist.id,
                    formVersion: formExist.version,
                    formGroup

                }
            })
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer les valeurs du formulaire');
        }
    }
}