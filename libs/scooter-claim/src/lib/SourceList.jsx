import React from 'react';

const SourceList = ({ sources, typeLabel, onAddSource, onRemoveSource, onChangeSource }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{typeLabel} Sources</label>
      {sources.map((source, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
          <div style={{ marginRight: '10px' }}>
            <input
              type="text"
              value={source.url}
              onChange={(e) => onChangeSource(index, 'url', e.target.value)}
              placeholder="Enter url"
              required
              style={{ width: '200px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginRight: '10px' }}>
            <input
              type="text"
              value={source.description}
              onChange={(e) => onChangeSource(index, 'description', e.target.value)}
              placeholder="Enter description"
              required
              style={{ width: '200px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="button"
            onClick={() => onRemoveSource(index)}
            style={{ padding: '5px 10px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddSource}
        style={{ padding: '5px 10px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Add {typeLabel} Source
      </button>
    </div>
  );
};

export default SourceList;
