import React from "react";
import axios from "axios";
import {BYTEUS_URL} from "../common/config";

const URL = {
    ocr: BYTEUS_URL + '/ocr',
    document_detection: BYTEUS_URL + '/ocr/document_detection',
    warp_image: BYTEUS_URL + '/ocr/warped_image',
    ocr_azure: BYTEUS_URL + '/ocr/azure',
    ocr_azure_full: BYTEUS_URL + '/ocr/azurefull',
    postUserHistory: (email) => {
        return BYTEUS_URL + '/users/' + email + '/history'
    },
    getUserHistory: (email) => {
        return BYTEUS_URL + '/history/' + email
    },
    deleteUserHistory: (email) => {
        return BYTEUS_URL + '/history/' + email + '/delete_all'
    },
    postFeedback: (email) => {
        return BYTEUS_URL + '/users/' + email + '/feedback'
    },
}

const services = {
    ocr: async (uri, userToken) => {
        console.log('uri: ' + uri);
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();

        formData.append('file', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        let uploadResult;
        try {
            uploadResult = await (await postMultipart(URL.ocr, formData, userToken)).json();
            console.log('results: ');
            console.log({uploadResult});
            if (uploadResult.detail === 'Unauthorized') {
                console.log('Unauthorized');
                alert("Error: Unauthorised");
            } else return (uploadResult);
        } catch (e) {
            // console.log({uploadResult});
            console.log('FAILED')
            console.log(e);
            alert('Upload failed, sorry :(');
        }
        return null;
    },
    documentDetect: async (uri, userToken) => {
        console.log('uri: ' + uri);
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();

        formData.append('file', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        let uploadResult;
        try {
            uploadResult = await (await postMultipart(URL.document_detection, formData, userToken)).json();
            console.log('results: ');
            console.log({uploadResult});
            if (uploadResult.detail === 'Unauthorized') {
                console.log('Unauthorized');
                alert("Error: Unauthorised");
            } else return (uploadResult);
        } catch (e) {
            // console.log({uploadResult});
            console.log('FAILED')
            console.log(e);
            alert('Upload failed, sorry :(');
        }
        return null;
    },
    warpImage: async (uri, bb, userToken) => {
        console.log('uri: ' + uri);
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();

        formData.append('file', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        formData.append('points', bb);

        let uploadResult;
        try {
            uploadResult = await (await postMultipart(URL.document_detection, formData, userToken)).json();
            console.log('results: ');
            console.log({uploadResult});
            if (uploadResult.detail === 'Unauthorized') {
                console.log('Unauthorized');
                alert("Error: Unauthorised");
            } else return (uploadResult);
        } catch (e) {
            // console.log({uploadResult});
            console.log('FAILED')
            console.log(e);
            alert('Upload failed, sorry :(');
        }
        return null;
    },
    postFeedback: async (feedback, email, userToken) => {
        try {
            const response = await axios.post(URL.postFeedback(email),
                {
                    text: feedback,
                    user_email: email,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                })
            alert('Feedback Submitted');
            return 'SUCCESS'
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
            return 'FAILED'
        }
    }
}

const postMultipart = (url, formData, userToken) => {
    // console.log("token: "+ userToken);
    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,
        },
    };

    return fetch(url, options);
}

export default services;