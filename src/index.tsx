import 'swiper/css'

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    outlinedElevation: true
  }
}

export * from './components'
export * from './hooks'
export * from './utils'
export * from './types'
export { default as fmConfig } from './config'
