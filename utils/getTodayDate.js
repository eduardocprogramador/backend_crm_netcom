const getTodayDate = () => {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo"
  })
}

module.exports = getTodayDate