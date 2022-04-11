function FileViewer({ fileUrl }) {
    const props = {
        iframe: {
            sandbox: true,
            src: fileUrl
        }
    };
    
    return (
        <iframe {...props.iframe}></iframe>        
    );
}

export default FileViewer;