
export const playLevelUpSound = () => {
  try {
    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new AudioContextClass();
    
    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Upward scale for Level Up
    const now = ctx.currentTime;
    playNote(261.63, now, 0.4); // C4
    playNote(329.63, now + 0.1, 0.4); // E4
    playNote(392.00, now + 0.2, 0.4); // G4
    playNote(523.25, now + 0.3, 0.6); // C5
  } catch (e) {
    console.warn("Audio Context failed", e);
  }
};
