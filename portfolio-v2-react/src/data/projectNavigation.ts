/** Keep a project hash aligned while async images, reveal transforms and history settle.
 * This changes navigation only: card markup, styles and evidence remain untouched.
 */
export function scrollProjectWhenReady(id: string, onSettled: () => void): () => void {
  let frame = 0;
  let cancelled = false;
  let previousDestination = Number.NaN;
  let lastScroll = 0;
  let lastLayoutChange = performance.now();
  const deadline = performance.now() + 30000;
  const watchedImages = new Set<HTMLImageElement>();
  const imageCleanups: Array<() => void> = [];
  let pendingImages = 0;

  const cleanup = () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    for (const remove of imageCleanups) remove();
    window.removeEventListener('wheel', interrupted);
    window.removeEventListener('touchstart', interrupted);
    window.removeEventListener('pointerdown', interrupted);
    window.removeEventListener('keydown', interrupted);
  };
  const finish = () => { cleanup(); onSettled(); };
  const interrupted = () => finish();
  window.addEventListener('wheel', interrupted, { passive: true });
  window.addEventListener('touchstart', interrupted, { passive: true });
  window.addEventListener('pointerdown', interrupted, { passive: true });
  window.addEventListener('keydown', interrupted);

  const tick = () => {
    if (cancelled) return;
    const now = performance.now();
    const target = document.getElementById(id);
    if (target) {
      // A skipped lazy image above the target can later move the whole card.
      // Load those images on deep-link navigation without changing their layout.
      for (const image of document.images) {
        if (image.complete || watchedImages.has(image) ||
            !(image.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
        watchedImages.add(image);
        pendingImages += 1;
        const ready = () => {
          remove();
          pendingImages -= 1;
          lastLayoutChange = performance.now();
        };
        const remove = () => {
          image.removeEventListener('load', ready);
          image.removeEventListener('error', ready);
        };
        imageCleanups.push(remove);
        image.addEventListener('load', ready, { once: true });
        image.addEventListener('error', ready, { once: true });
        image.loading = 'eager';
      }
      const style = getComputedStyle(target);
      const translateY = style.transform === 'none' ? 0 : new DOMMatrixReadOnly(style.transform).m42;
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      const offset = Math.max(parseFloat(style.scrollMarginTop) || 0, headerHeight + 16);
      // Use the layout position, excluding RevealCard's animated translateY.
      const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - translateY - offset);
      const moved = !Number.isFinite(previousDestination) || Math.abs(destination - previousDestination) > 0.5;
      const displaced = Math.abs(window.scrollY - destination) > 1;
      if (moved || (displaced && now - lastScroll > 1100)) {
        if (moved) lastLayoutChange = now;
        previousDestination = destination;
        lastScroll = now;
        window.scrollTo({ top: destination, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
      if (!displaced && pendingImages === 0 && document.readyState === 'complete' &&
          document.fonts.status === 'loaded' && now - lastLayoutChange > 350 && now - lastScroll > 350) {
        finish();
        return;
      }
    }
    if (now >= deadline) { finish(); return; }
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return cleanup;
}
