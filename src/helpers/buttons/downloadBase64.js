const downloadBase64File = ({
        typeFormat,
        contentBase64, 
        fileName}) => {
    const linkSource = `data:${typeFormat};base64,${contentBase64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click(); 
}

export default downloadBase64File