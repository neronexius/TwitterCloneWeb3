const awaitTimeout = (delay:number) => {
    return new Promise((_, reject) => setTimeout(() => reject("Timeout"), delay));
}

export {awaitTimeout}