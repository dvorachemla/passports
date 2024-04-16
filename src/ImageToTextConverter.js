import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function ImageToTextConverter() {
    const [text, setText] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageURL(reader.result);
                performOCR(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const performOCR = (url) => {
        Tesseract.recognize(url, 'eng')
            .then(({ data: { text } }) => {
                setText(text);
                // Extract the last 2 lines of text
                const textLines = text.split('\n');
                const lastTwoLines = textLines.slice(-3);
                console.log('Last 2 lines of text:');
                console.log(lastTwoLines.join('\n'));
            })
            .catch((error) => {
                console.error('Error performing OCR:', error);
            });
    };

    return ( <
        div >
        <
        input type = "file"
        accept = "image/*"
        onChange = { handleImageChange }
        /> <
        img src = { imageURL }
        alt = "Uploaded" / >
        <
        div >
        <
        h2 > Text Extracted from Image: < /h2> <
        pre > { text } < /pre> < /
        div > <
        /div>
    );
}

export default ImageToTextConverter;