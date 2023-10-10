import { base64 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { File } from "buffer";
import { ChangeEvent } from "react";

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

export {onlyLettersAndNumbers, convert_to_base64};
