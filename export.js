let count = 0;
const totalFrames = 90;
const fps = 30;

const videoCanvas = document.createElement('canvas');
videoCanvas.width = 1920;   //  full HD
videoCanvas.height = 1080;
const ctx = videoCanvas.getContext('2d');

const stream = videoCanvas.captureStream(fps);
const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm; codecs=vp9',
    videoBitsPerSecond: 15_000_000     //   mas bitrate 
});
const chunks = [];

mediaRecorder.ondataavailable = e => chunks.push(e.data);
mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rotacion_fullhd.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    document.getElementById('progressSpan').innerText = "✅ Video exportado en Full HD.";
};

function captureFrame() {
    if (count >= 360) {
        mediaRecorder.stop();
        return;
    }

    let container = document.getElementById("cdContainer");

    html2canvas(container, { scale: 3 }).then(canvas => { // renrerizar hd
        ctx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
        ctx.drawImage(canvas, 0, 0, videoCanvas.width, videoCanvas.height);

        count += 360 / totalFrames;
        document.getElementById("cd").style.transform = `rotate(${count}deg)`;
        document.getElementById('progressSpan').innerText = `⏳ Renderizando: ${Math.round((count / 360) * 100)}%`;

        requestAnimationFrame(captureFrame);
    });
}

function startRecording() {
    count = 0;
    chunks.length = 0;
    document.getElementById('progressSpan').innerText = "🎬 Iniciando grabación en Full HD...";
    mediaRecorder.start();
    captureFrame();
}

document.getElementById('export').addEventListener('click', startRecording);
