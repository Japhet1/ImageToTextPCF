import * as React from 'react';
import { IInputs, IOutputs } from '../generated/ManifestTypes';
import * as Tesseract from 'tesseract.js';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';

export interface IImageToTextProps {
  context: ComponentFramework.Context<IInputs>;
}

export const ImageToText: React.FC<IImageToTextProps> = ({ context }) => {
  const [text, setText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    <Stack>
      <PrimaryButton onClick={handleButtonClick}>Import File</PrimaryButton>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {loading ? 
        <StackItem>
            <Text variant='medium'>Loading...</Text>
        </StackItem>
        :
        <StackItem>
          <Text variant='medium'>{text}</Text>
        </StackItem>
      }
    </Stack>
  );
};