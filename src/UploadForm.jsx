import React, { useState } from 'react';
import axios from 'axios';
import SkillDisplay from './SkillDisplay';


function UploadForm() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [skills, setSkills] = useState([]);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('resume', file);  // Ensure 'resume' is the same as in Flask

        try {
            const res = await axios.post('https://automatic-space-carnival-jjrx7jg7g769fqxvj-5000.app.github.dev/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            // Check the response
            setResponse(res.data);  // Show the returned result
        } catch (error) {
            console.error('Error uploading file:', error);
            setResponse({ error: 'File upload failed' });
            setSkills([]);
        }
    };

    return (
        <div>
            <h2>Upload Your Resume</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            <div>
                {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
                <SkillDisplay skills={skills} />
            </div>
        </div>
    );
}

export default UploadForm;
