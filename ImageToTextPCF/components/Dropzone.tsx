import * as React from 'react';
import { Icon, mergeStyleSets, Text } from '@fluentui/react';
import * as Tesseract from 'tesseract.js';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ActionButton, IconButton } from '@fluentui/react/lib/Button';
import { useState } from 'react';

// Define styles using Fluent UI's `mergeStyleSets`
const useStyles = mergeStyleSets({
    dropzone: {
        border: '0.5px solid #cccbca',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        minHeight: '320px',
        position: 'relative',
        background: '#f5f5f5'
        // overflow: 'hidden',
    },
    dropzoneActive: {
        border: '2px solid #0078d4',
    },
    dropzoneText: {
        color: '#0078d4',
    },
    iconButton: {
        position: 'absolute',
        top: '10px',
        right: '0px',
    },

    dropzoneBar: {
        border: '2px solid #0078d4',
    }
});

// Define props for the Dropzone component
interface DropzoneProps {
    onDrop: (files: FileList) => void;
}




export const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
    
    const [isActive, setIsActive] = React.useState(false);
    const [text, setText] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleCopy = () => {
      navigator.clipboard.writeText(text)
    }

    // Handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(true);
    };

    // Handle drag leave event
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(false);
    };

    // Handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onDrop(files);
        }
    };

    // Handle file input change event
    // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (files) {
    //         onDrop(files);
    //     }
    // };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLoading(true);
            Tesseract.recognize(file, 'eng')
                .then(({ data: { text } }) => {
                    setText(text);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    };

    return (
        <Stack
            className={`${useStyles.dropzone} ${isActive ? useStyles.dropzoneActive : ''}`}
            // onDragOver={handleDragOver}
            // onDragLeave={handleDragLeave}
            // onDrop={handleDrop}
        >

            <Stack horizontal verticalAlign='center'>
                <StackItem>
                    {/* <IconButton
                        iconProps={{ iconName: 'Upload' }}
                        title="Upload"
                        ariaLabel="Upload"
                        className={useStyles.iconButton1}
                        // onClick={() => document.getElementById('fileInput')?.click()}
                        onClick={handleButtonClick}
                    /> */}
                    <ActionButton 
                        iconProps={{ iconName: 'Upload' }} 
                        allowDisabledFocus 
                        // disabled={disabled} 
                        // checked={checked}
                        // className={useStyles.iconButton1}
                        onClick={handleButtonClick}
                    >
                        Upload
                    </ActionButton>
                </StackItem>
                <StackItem>
                    {/* <IconButton
                        iconProps={{ iconName: 'Download' }}
                        title="Download"
                        ariaLabel="Download"
                        className={useStyles.iconButton2}
                        // onClick={() => document.getElementById('fileInput')?.click()}
                        onClick={handleButtonClick}
                    /> */}
                    <ActionButton 
                        iconProps={{ iconName: 'Download' }} 
                        allowDisabledFocus 
                        // disabled={disabled} 
                        // checked={checked}
                        // className={useStyles.iconButton3}
                        onClick={handleButtonClick}
                    >
                        Download
                    </ActionButton>
                </StackItem>
                <StackItem>
                    {/* <IconButton
                        iconProps={{ iconName: 'Download' }}
                        title="Download"
                        ariaLabel="Download"
                        className={useStyles.iconButton2}
                        // onClick={() => document.getElementById('fileInput')?.click()}
                        onClick={handleButtonClick}
                    /> */}
                    <ActionButton 
                        iconProps={{ iconName: 'Copy' }} 
                        allowDisabledFocus 
                        // disabled={disabled} 
                        // checked={checked}
                        // className={useStyles.iconButton2}
                        onClick={handleCopy}
                    >
                        Copy
                    </ActionButton>
                </StackItem>
            </Stack>

            <Stack verticalAlign='center' horizontalAlign='center' styles={{ root: { height: 300, overflowY: 'auto', scrollbarWidth: 'none' } }}>
                {   !text && !loading &&
                    <Stack>
                        <Icon iconName='CloudDownload'styles={{ root: { fontSize: 100, color: '#a6a5a4' } }}/>
                        {/* <Text variant='large' className={useStyles.dropzoneText}>
                            Drop files here
                        </Text> */}
                    </Stack>
                }
                <StackItem>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </StackItem>
                {   loading  ? 
                    <StackItem>
                        <Text variant='medium'>Loading...</Text>
                    </StackItem>
                    : text &&
                    <StackItem>
                        <Text variant='medium'>{text}</Text>
                    </StackItem>
                }
            </Stack>
            
            
            
            {/* <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            /> */}
           
            
        </Stack>
  );
};

