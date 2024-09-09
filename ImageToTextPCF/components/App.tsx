import * as React from 'react';
import { Dropzone } from './Dropzone';

export const App: React.FC = () => {
    const handleDrop = (files: FileList) => {
        // Handle file upload or processing here
        console.log('Files dropped:', files);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Convert image to text</h1>
            <Dropzone onDrop={handleDrop} />
        </div>
    );
};

