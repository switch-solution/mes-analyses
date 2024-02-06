import type { Row } from "@/src/helpers/type";
export const transformRowsToColumns = (row: Row[]) => {

    const columns = row.map((item) => {
        return {
            id: item.id,
            type: item.type,
            value: item.value
        }
    })

    return columns


}