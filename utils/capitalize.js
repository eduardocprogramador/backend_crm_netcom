const capitalize = (name) => {
  const exceptions = ["da", "de", "do", "das", "dos", "e"]
  return name
    .trim()
    .split(/\s+/)
    .map(word => {
      const lower = word.toLowerCase()
      if (exceptions.includes(lower)) {
        return lower
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(" ")
}

module.exports = capitalize
