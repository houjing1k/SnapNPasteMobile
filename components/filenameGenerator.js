import React from "react";

const filenameGenerator = () => {
    // const date = new Date().getDate();
    // const month = new Date().getMonth();
    // const year = new Date().getFullYear();
    // const hours = new Date().getHours();
    // const min = new Date().getMinutes();
    // const sec = new Date().getSeconds();

    const year = String(new Date().getFullYear()).padStart(4, '0');
    const month = String(new Date().getMonth()).padStart(2, '0');
    const date = String(new Date().getDate()).padStart(2, '0');
    const hours = String(new Date().getHours()).padStart(2, '0');
    const min = String(new Date().getMinutes()).padStart(2, '0');
    const sec = String(new Date().getSeconds()).padStart(2, '0');

    const filename = year + '-' + month + '-' + date + '-' + hours + min + sec;
    console.log(filename);
    return filename;
}

export default filenameGenerator;