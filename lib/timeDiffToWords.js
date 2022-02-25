

const timeDiffToWords = (oldTime, newTime) => {
  if (!newTime) {
    newTime = Date.now()
  }
  const seconds = (newTime - oldTime) / 1000
  const numyears = Math.floor(seconds / 31536000);
  const numdays = Math.floor((seconds % 31536000) / 86400); 
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const parts = []
  if (numyears > 0) parts.push(numyears + ' years ')
  if (numdays > 0) parts.push(numdays + ' days ')
  if (parts.length < 2 && numhours > 0) parts.push(numhours + ' hours ')
  if (parts.length < 2 && numminutes > 0) parts.push(numminutes + ' minutes ')
  if (parts.length === 0) return 'Less than a minute ago'
  return parts.join('') + 'ago'
}

export default timeDiffToWords;