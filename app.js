const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const canvas = document.getElementById('level-meter');
const canvasCtx = canvas.getContext('2d');
const warningBox = document.getElementById('warning-box');
const warningText = document.getElementById('warning-text');

let audioContext;
let analyser;
let dataArray;
let source;
let model;
let stream;
const noiseThresholdHigh = 0.25; // Threshold for high noise level (25% of max)
const noiseThresholdMedium = 0.2; // Threshold for medium noise level (20% of max)
const noiseThresholdLow = 0.1; // Threshold for low noise level (10% of max)

async function loadModel() {
    try {
        model = await speechCommands.create('BROWSER_FFT');
        await model.ensureModelLoaded();
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model', error);
        alert('Failed to load the speech model. Please try again.');
    }
}

async function startListening() {
    try {
        await loadModel();
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted');

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        startButton.disabled = true;
        stopButton.disabled = false;

        draw();
    } catch (error) {
        handleError(error);
    }
}

function stopListening() {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    if (source) {
        source.disconnect();
        source = null;
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    startButton.disabled = false;
    stopButton.disabled = true;
    hideWarningBox();
}

function handleError(error) {
    console.error('Error accessing the microphone', error);
    alert('Microphone access is required for this app to function. Please check your browser settings and permissions.');
    stopListening();
}

function hideWarningBox() {
    warningBox.style.display = 'none';
}

function draw() {
    if (!analyser) return;

    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const level = average / 255;

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'green';
    canvasCtx.fillRect(0, 0, canvas.width * level, canvas.height);
    canvasCtx.fillStyle = 'black';
    canvasCtx.font = '16px Arial';
    canvasCtx.fillText((level * 100).toFixed(2) + '%', 10, canvas.height / 1.5);

    const boxPositionY = canvas.getBoundingClientRect().bottom + window.scrollY + 10;

    if (level >= noiseThresholdHigh) {
        displayWarning('High Noise Level', 'red', boxPositionY);
    } else if (level >= noiseThresholdMedium) {
        displayWarning('Sound is getting high', 'orange', boxPositionY);
    } else if (level >= noiseThresholdLow) {
        displayWarning('Maintain low sound', 'yellow', boxPositionY);
    } else {
        displayWarning('Good level', 'green', boxPositionY);
    }
}

function displayWarning(text, color, yPos) {
    warningText.textContent = text;
    warningBox.className = `warning-box ${color}`;
    warningBox.style.top = `${yPos}px`;
    warningBox.style.display = 'block';
    setTimeout(hideWarningBox, 5000);
}

startButton.addEventListener('click', startListening);
stopButton.addEventListener('click', stopListening);

window.addEventListener('touchstart', function() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
});
