export const normalizeToArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    } else if (typeof data === 'object' && data !== null) {
        const obj = Object.keys(data).length === 0;
        return obj ? [] : [data];
    }
}