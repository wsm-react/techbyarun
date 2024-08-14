// components/ImageUpload.tsx
import Image from 'next/image';
import React, { useState, ChangeEvent, MouseEvent, forwardRef, Ref } from 'react';

interface ImageUploadProps {
    // value?: FileList;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onRemove?: (index: number) => void;
    images?: string[];
    [key: string]: any; // For additional props
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(({
    // value,
    onChange,
    onRemove,
    images = [],
    ...props
}, ref: Ref<HTMLInputElement>) => {
    const [previewFiles, setPreviewFiles] = useState<string[]>(images);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewFiles(prev => [...prev, ...newPreviews]);
            if (onChange) onChange(e);
        }
    };

    const handleRemove = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPreviewFiles(prev => prev.filter((_, i) => i !== index));
        if (onRemove) onRemove(index);
    };

    return (
        <div >
            <input
                type="file"
                accept="application/pdf, image/*" // Accept both PDF and image files
                // multiple
                onChange={handleFileChange}
                // style={{ display: 'none' }}
                id="file-upload"
                ref={ref} // Forward ref here
                {...props}
            />
            <label htmlFor="file-upload">
                <button type="button">Add Files</button>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {previewFiles.length > 0 ? (
                    previewFiles.map((file, index) => (
                        <div key={index} style={{ position: 'relative', margin: '10px', width: '150px', height: '150px' }}>
                            {file.endsWith('.pdf') ? (
                                <iframe
                                    src={file}
                                    title={`pdf-preview-${index}`}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                />
                            ) : (
                                <Image
                                    src={file}
                                    fill
                                    alt={`preview-${index}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            )}
                            <button
                                onClick={handleRemove(index)}
                                style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: 'white' }}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No files selected</p>
                )}
            </div>
        </div>
    );
});

export default ImageUpload;
