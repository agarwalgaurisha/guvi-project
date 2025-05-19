import React from 'react';

function SkillDisplay({ skills }) {
  return (
    <div>
      <h3>Extracted Skills</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {skills.map((skill, idx) => (
          <span key={idx} style={{
            background: '#007bff',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px'
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillDisplay;
