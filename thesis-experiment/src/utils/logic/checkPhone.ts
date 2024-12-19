/**
 * Check if the device is a mobile device
 * @returns Boolean of whether the device is a mobile device
 */
export function correctDeviceType(): boolean {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (regex.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if the screen orientation is correct
 * @returns Boolean of whether the screen orientation is correct
 */
export function correctScreenOrientation(): boolean {
  if (window.innerHeight > window.innerWidth) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get the operating system of the device
 * @returns Operating system of the device
 */
export function getOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) {
    return 'iOS';
  }

  return 'unknown';
}

/**
 * Get the browser of the device
 * @returns Browser of the device
 */
export function getMobileBrowser(): string {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/Opera|OPR/i.test(userAgent)) return 'Opera Mobile';
  if (/SamsungBrowser/i.test(userAgent)) return 'Samsung Internet';
  if (/Chrome/i.test(userAgent) && /Android/i.test(userAgent))
    return 'Chrome Mobile';
  if (/CriOS/i.test(userAgent)) return 'Chrome for iOS';
  if (/Firefox/i.test(userAgent) && /Mobile/i.test(userAgent))
    return 'Firefox Mobile';
  if (/FxiOS/i.test(userAgent)) return 'Firefox for iOS';
  if (/Safari/i.test(userAgent) && /iPhone|iPad|iPod/i.test(userAgent))
    return 'Safari';
  if (/Mobile/i.test(userAgent) && /Android/i.test(userAgent))
    return 'Android Browser';
  if (/EdgA/i.test(userAgent)) return 'Edge Mobile';
  if (/UCBrowser/i.test(userAgent)) return 'UC Browser';
  if (/Opera Mini/i.test(userAgent)) return 'Opera Mini';

  return 'Unknown Browser';
}
