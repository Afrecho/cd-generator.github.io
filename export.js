let count = 0;


function captureFrame() {
    let container = document.getElementById("cdContainer");
    let cd = document.getElementById('cd');

    html2canvas(container).then(canvas => {
        count += 45; // 
        cd.style.transform = `rotate(${count}deg)`;
        document.body.appendChild(canvas);
    });
}

document.getElementById("export").addEventListener("click", captureFrame);

