import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const words = [
    { text: 'Salsa', value: 60 },
    { text: 'Bachata', value: 60 },
    { text: 'ChaChaCha', value: 60 },
    { text: 'Waltz', value: 60 },
    { text: 'Swing', value: 60 },
    { text: 'Merengue', value: 60 },
    { text: 'Cumbia', value: 60 },
    { text: 'Tango', value: 60 },
    { text: 'Ballet', value: 60 },
    { text: 'Hip-Hop', value: 60 },
    { text: 'Disco', value: 60 },
    { text: 'Aerial Silks', value: 60 },
    { text: 'Heels', value: 60 },
    { text: 'Burlesque', value: 60 },
    { text: 'Latin Drums', value: 60 },
];

const options = {
    rotations: 0,
    fontSizes: [40, 60],
    rotationAngles: [0, 0],
    padding: 20,
    colors: ['#8B0000'],
};

const WordCloudComponent = () => {
    return (
        <div style={{ height: '800px', width: '100%' }}>
            <ReactWordcloud words={words} options={options} />
        </div>
    );
};

export default WordCloudComponent;
