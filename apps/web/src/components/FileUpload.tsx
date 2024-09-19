import { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!files) return;

    setIsUploading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file);
    });

    const res = await fetch('/api/photos/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Upload successful!');
    } else {
      alert('Upload failed.');
    }

    setIsUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="file-input"
      />
      <button onClick={handleUpload} disabled={isUploading} className="upload-btn">
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUpload;
