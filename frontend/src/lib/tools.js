export const cookie = window.cookie = function(key, val, time) {
  if (typeof val == 'undefined') {
    var v = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return v ? decodeURIComponent(v[2]) : null
  } else {
    var date = new Date()
    date.setTime(date.getTime() + 864e5 * (time || 30))
    document.cookie = key + '=' + encodeURIComponent(val) + ';path=/;expires=' + date.toUTCString()
  }
}