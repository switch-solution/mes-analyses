export const addOneMonth = (date: Date) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return result;
}