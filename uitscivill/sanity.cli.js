import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'f5ktsz1i',
    dataset: 'production'
  },
  deployment: {
    appId: 'mj4o5n8m2fjqibylbs6ltria',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
