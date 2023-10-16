import * as anchor from "@project-serum/anchor"

function onlyLettersAndNumbers(str:string) {
    return /^[A-Za-z0-9]*$/.test(str);
}

const convert_to_base64 = (blob: Blob): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                console.log(reader.result);
                resolve(reader.result);
            } else {
                reject(new Error("Failed to read as data URL."));
            }
        };

        reader.onerror = () => {
            reject(new Error("Error reading the Blob as data URL."));
        };

        reader.readAsDataURL(blob);
    });
};

const bn_to_date = (number: anchor.BN): Date => {
    return new Date(number.toNumber() * 1000)
}

export {onlyLettersAndNumbers, convert_to_base64, bn_to_date};
