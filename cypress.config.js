const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {}, //indica que é um projeto E2E
  
})

//video: true //após execução headless é criado a pasta videos, com os vídeos das execuções