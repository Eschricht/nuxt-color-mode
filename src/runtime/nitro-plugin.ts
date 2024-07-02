import type { NitroAppPlugin } from 'nitropack'

function setHeader(headers: Record<string, string>, key: string, value: string) {
  const keys = [key, key.toLowerCase(), key.toUpperCase()]
  const actualKey = keys.find(_key => headers[_key]) ?? key

  if (headers[actualKey] && headers[actualKey].split(', ').includes(value)) {
    return headers
  }

  if (headers[actualKey]) {
    headers[actualKey] = [headers[actualKey], value].join(', ')
  }

  else {
    headers[key] = value
  }
}

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:response', (res) => {
    res.headers = res.headers ?? {}

    setHeader(res.headers, 'Accept-CH', 'Sec-CH-Prefers-Color-Scheme')
    setHeader(res.headers, 'Vary', 'Sec-CH-Prefers-Color-Scheme')
    setHeader(res.headers, 'Critical-CH', 'Sec-CH-Prefers-Color-Scheme')
  })
}
