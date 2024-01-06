import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useUser } from '@clerk/clerk-react'
import './FileInput.css'

const secretPassword = process.env.REACT_APP_FILE_SECRET_PASSWORD
const secretKey = process.env.REACT_APP_FILE_SECRET_KEY

function FileInput() {
    const [file, setFile] = useState(null);
    const [dec, setDec] = useState('');
    const [decryptedBinary, setDecryptedBinary] = useState(null);
    const { user } = useUser();
    const [images, setImages] = useState([]);
    const [imagesCopy,setImagesCopy]=useState([]);

    function handleChange(event) {
        const selectedFile = (event.target.files[0])
        setFile(selectedFile);
        console.log(file)
    }

    function encryptFile(f, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const binaryString = reader.result;
            const encrypted = CryptoJS.AES.encrypt(binaryString, secretPassword, { iv: secretKey });
            const encryptedString = encrypted.toString();
            callback(encryptedString);
        };
        reader.readAsBinaryString(f);
    }

    function decryptFile(encryptedString) {
        const decrypted = CryptoJS.AES.decrypt(encryptedString, secretPassword, { iv: secretKey });
        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedString
    }


    async function handleSubmit(event) {
        event.preventDefault();
        console.log(file);

        if (file) {
            encryptFile(file, encryptedData => {
                console.log(encryptedData);
                axios.post("https://secureme.onrender.com/file/image", {
                    email: user.emailAddresses[0].emailAddress,
                    data: encryptedData
                })
            });
        }

    }

    function handleDownload() {
        axios.get(`https://secureme.onrender.com/file/image?email=${user.emailAddresses[0].emailAddress}`)
            .then((response) => {
                console.log(response.data);
                const EncryptedImageArray = response.data;

                EncryptedImageArray.map((obj) => {
                    const encryptedString = obj.image;
                    const decryptedString = decryptFile(encryptedString);

                    const byteArray = new Uint8Array(decryptedString.length);
                    for (let i = 0; i < decryptedString.length; i++) {
                        byteArray[i] = decryptedString.charCodeAt(i);
                    }

                    const blob = new Blob([byteArray], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(blob);
                    setDecryptedBinary(imageUrl);
                    if (images.length == 0) {
                        setImages((prev) => [...prev, imageUrl]);
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    console.log(images)

    useEffect(() => {
        {
            setImagesCopy(images);
        }
    }, [images])

    return (
        <>
        <div className='imagesHolder'>
            <form onSubmit={handleSubmit}>
                <input name='fileUpload' type="file" onChange={handleChange} accept='.jpeg' />
                <button type="submit">Upload</button>
                <button onClick={handleDownload}>Download Files</button>
            </form>
        </div>
        <div >
        {imagesCopy && imagesCopy.map((image) => {
            return <img src={image} alt="image" height={200} width={200} />
        })}
        </div>
        </>
    );
}

export default FileInput;


