import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react';
import Button from './Button';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileInput = event => {
    setFile(event.target.files[0]);
  };

  return (
    <TouchableOpacity onPress={() => document.querySelector("input[type='file']").click()}>
      <Button>Upload file</Button>
      <input type="file" onChange={handleFileInput} style={{ display: 'none' }} />
    </TouchableOpacity>
  );
};

export default FileUploader;
