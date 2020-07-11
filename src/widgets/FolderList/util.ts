export const toISOString = (date: number) => {
    return new Date(date).toISOString().split('T')[0];
};

export const toSize = (size: number) => {
    const sizeKB = size / 1024;
    const sizeMB = Math.floor(sizeKB) / 1024;
    const sizeGB = Math.floor(sizeMB) / 1024;

    switch (true) {
        case sizeGB > 1:
            return `${sizeGB.toFixed(2)} GB`;
        case sizeMB > 1:
            return `${sizeMB.toFixed(2)} MB`;
        case sizeKB > 1:
            return `${sizeKB.toFixed(2)} KB`;
        default:
            return `${size} B`
    }
}
