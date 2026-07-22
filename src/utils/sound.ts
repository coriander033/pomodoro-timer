/** Play a short chime using Web Audio API — no audio files needed */
export function playChime(type: 'complete' | 'break-end'): void {
  try {
    const ctx = new AudioContext()

    // Browsers may start AudioContext in "suspended" state — resume it.
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime

    const frequencies =
      type === 'complete'
        ? [523.25, 659.25, 783.99] // C5 E5 G5 — rising, achievement
        : [783.99, 659.25, 523.25] // G5 E5 C5 — descending, relax

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = freq

      const start = now + i * 0.15
      const end = start + 0.4

      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.3, start + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, end)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(start)
      osc.stop(end + 0.05)
    })

    // Clean up context after playback
    setTimeout(() => ctx.close(), 2000)
  } catch {
    // Web Audio not supported — fail silently
  }
}
