# Noice-Level

This project is a web-based application that provides real-time noise detection using the browser's microphone and visual feedback via a level meter. It also offers warnings based on the detected noise level. The app utilizes the TensorFlow.js Speech Commands model for speech recognition.

## Features

- **Real-Time Noise Detection**: The app uses the browser's microphone to detect and visualize noise levels in real time.
- **Dynamic Warnings**: Warnings are displayed when noise levels exceed predefined thresholds (low, medium, and high).
- **Visual Feedback**: A level meter displays the current sound level as a percentage, and the meter's color changes based on the noise level.
- **Speech Recognition**: The TensorFlow.js Speech Commands model is loaded for potential speech-based features (although the model is loaded, speech recognition is not actively used in this version).

## Components

### HTML Structure
- **Level Meter**: A `<canvas>` element is used to render the noise level in real time.
- **Controls**: Two buttons (`Start Listening`, `Stop Listening`) to start and stop the microphone input.
- **Warning Box**: A dynamically positioned box that shows warnings (in red, orange, yellow, or green) based on the noise levels.

### JavaScript Logic
- **Microphone Access**: Uses the `navigator.mediaDevices.getUserMedia()` API to access the microphone and audio stream.
- **Noise Detection**: 
  - The microphone input is passed through an `AnalyserNode` to process frequency data.
  - The average sound level is calculated from the frequency data, and this value is used to render the noise level on the canvas.
- **Warning System**: 
  - Based on the noise level, a colored warning box is displayed with messages such as "High Noise Level" (red), "Sound is getting high" (orange), "Maintain low sound" (yellow), and "Good level" (green).
  - The position of the warning box is dynamically adjusted based on the canvas element's position.
- **Speech Commands Model**: The app uses the TensorFlow.js Speech Commands model (`@tensorflow-models/speech-commands`). However, in this version, it only ensures the model is loaded and does not implement speech recognition functionality.

### CSS Styling
- **Level Meter**: Styled as a rectangular canvas to display sound levels.
- **Warning Box**: Positioned absolutely and colored based on the severity of the detected noise level.

## Thresholds

The app uses three thresholds to determine the noise level:
- **High Noise**: Noise level ≥ 25% of the maximum.
- **Medium Noise**: Noise level ≥ 20% of the maximum.
- **Low Noise**: Noise level ≥ 10% of the maximum.
- **Good Level**: Noise level < 10%.

## How to Use

1. Open the web page in a browser that supports microphone access.
2. Click the **Start Listening** button to begin noise detection.
3. The app will display the current noise level as a percentage in a visual level meter.
4. Warnings will be shown if the noise level exceeds the low, medium, or high thresholds.
5. To stop the detection, click the **Stop Listening** button.

## Requirements

- A modern browser with support for:
  - Microphone access (`navigator.mediaDevices.getUserMedia`)
  - Web Audio API (`AudioContext`)
  - TensorFlow.js library for speech recognition
- Internet access to load external JavaScript libraries (TensorFlow.js and Speech Commands)

## Libraries Used

- **TensorFlow.js**: For loading the speech commands model.
- **Web Audio API**: For capturing and analyzing audio input from the microphone.
- **Canvas API**: For drawing and updating the noise level meter.

## Possible Enhancements

- Implement real speech recognition using the TensorFlow.js Speech Commands model.
- Add more specific audio analysis features (e.g., recognizing specific phrases or words).
- Provide more advanced controls for users to adjust the noise detection sensitivity.

## Credits

Developed using JavaScript, TensorFlow.js, and the Web Audio API for real-time audio analysis and visualization.

---
Feel free to modify and expand upon this base functionality to add speech recognition or other audio processing features.
