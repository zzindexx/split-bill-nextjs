export const first = (array: any[]) => {
    if (array.length === 0) throw new Error("Array is empty");
    return array[0];
}

export const last = (array: any[]) => {
    if (array.length === 0) throw new Error("Array is empty");
    return array[array.length - 1];
}