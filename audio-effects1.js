document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const successBuffer = audioContext.createBuffer(1, 44100, 44100);
    const successData = successBuffer.getChannelData(0);
    for (let i = 0; i < 44100; i++) {
        successData[i] = Math.sin(i * 440 * Math.PI / 44100) * Math.exp(-i / 44100) * 0.5;
    }

    window.playSuccessSound = function() {
        const source = audioContext.createBufferSource();
        source.buffer = successBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    };

    window.playEasterSound = function() {
        const audio = document.getElementById('easterSound');
        audio.play();
    };
});