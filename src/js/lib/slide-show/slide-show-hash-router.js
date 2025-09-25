export default function slideShowHashRouter(slideshow) {
  // When the slide changes, update the URL hash to reflect the current slide's id.
  // This does not trigger a hashchange event.
  slideshow.events.on('slideChanged', (index) => {
    const slide = slideshow.slides[index];
    if (slide?.id) {
      window.history.replaceState(null, '', `#${slide.id}`);
    }
  });

  // Handler for hashchange events.
  // This will change the slide to the one indicated by the hash.
  const hashChangeHandler = () => {
    console.log('Hash changed:', window.location.hash);
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        slideshow.goToSlideById(hash);
      } catch (err) {
        console.warn(`No slide found for id: ${hash}`);
      }
    }
  };
  // Install a hashchange listener to change slides
  window.addEventListener('hashchange', hashChangeHandler);
  // Go to the slide indicated in the hash on load
  hashChangeHandler();
}
