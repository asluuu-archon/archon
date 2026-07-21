import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'iwbdc0fm',
    dataset: 'production',
  },

  deployment: {
    appId: 'kee145i5r98s3r1dbysd0m52',
    autoUpdates: false,
  },
})