/* CONTROL DE EFECTOS DE SONIDO (WEB AUDIO API) */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(type) {
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  if (type === 'success') {
    // Sonido ascendente alegre
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.15); // G5
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } else if (type === 'error') {
    // Sonido descendente grave
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220.00, audioCtx.currentTime); // A3
    osc.frequency.exponentialRampToValueAtTime(110.00, audioCtx.currentTime + 0.25); // A2
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } else if (type === 'complete') {
    // Pequeña fanfarria triunfal
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, i) => {
      const noteOsc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      noteOsc.connect(noteGain);
      noteGain.connect(audioCtx.destination);
      noteOsc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.12);
      noteGain.gain.setValueAtTime(0.12, audioCtx.currentTime + i * 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.12 + 0.25);
      noteOsc.start(audioCtx.currentTime + i * 0.12);
      noteOsc.stop(audioCtx.currentTime + i * 0.12 + 0.25);
    });
  } else if (type === 'click') {
    // Clic de burbuja
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  }
}
