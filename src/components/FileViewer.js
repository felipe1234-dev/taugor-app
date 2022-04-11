function FileViewer({ filePath }) {
    const props = {
        iframe: {
            sandbox: true,
            src: filePath
        }
    };
    
    return (
        <iframe {...props.iframe}></iframe>        
    );
}

export default FileViewer;