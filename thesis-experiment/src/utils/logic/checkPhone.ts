/**
 * Check if the device is a mobile device
 * @returns boolean of whether the device is a mobile device
 */
export function correctDeviceType(): boolean {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  if (regex.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

/**
 * Check if the screen orientation is correct
 * @returns boolean of whether the screen orientation is correct
 */
export function correctScreenOrientation(): boolean {
  if (window.innerHeight > window.innerWidth) {
    return true
  } else {
    return false
  }
}
