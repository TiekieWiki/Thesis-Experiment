/**
 * Set the browser to full screen
 */
export function enterFullScreen() {
  const docElm = document.documentElement as HTMLElement & {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  };

  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullscreen) {
    docElm.webkitRequestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  }
}

/**
 * Exit full screen mode
 */
export function exitFullScreen() {
  const docElm = document as Document & {
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
  };
  if (docElm.exitFullscreen) {
    docElm.exitFullscreen();
  } else if (docElm.mozCancelFullScreen) {
    docElm.mozCancelFullScreen();
  } else if (docElm.webkitExitFullscreen) {
    docElm.webkitExitFullscreen();
  } else if (docElm.msExitFullscreen) {
    docElm.msExitFullscreen();
  }
}
