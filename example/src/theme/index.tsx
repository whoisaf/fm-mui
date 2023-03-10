import React from 'react'
import { ThemeProvider, CssBaseline, PaletteMode } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { grey, indigo } from '@mui/material/colors'

import components from './components'
import { useSettings } from 'hooks'

declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary']
    white: Palette['primary']
    neutral: Palette['primary']
    grey1: Palette['primary']
    grey2: Palette['primary']
    grey3: Palette['primary']
    grey4: Palette['primary']
    grey5: Palette['primary']
    grey6: Palette['primary']
    grey7: Palette['primary']
    grey8: Palette['primary']
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary']
    black: PaletteOptions['primary']
    white: PaletteOptions['primary']
    grey1: PaletteOptions['primary']
    grey2: PaletteOptions['primary']
    grey3: PaletteOptions['primary']
    grey4: PaletteOptions['primary']
    grey5: PaletteOptions['primary']
    grey6: PaletteOptions['primary']
    grey7: PaletteOptions['primary']
    grey8: PaletteOptions['primary']
  }
}

interface ColorOverrides {
  black: true
  white: true
  neutral: true
  grey1: true
  grey2: true
  grey3: true
  grey4: true
  grey5: true
  grey6: true
  grey7: true
  grey8: true
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    info: true
  }
  interface TextFieldPropsSizeOverrides {
    large: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsSizeOverrides {
    xlarge: true
  }
}

const headingStyles = {}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: indigo['A400']
    },
    ...(mode === 'light'
      ? {
          // palette values for light mode
          neutral: {
            main: grey[500]
          },
          black: {
            main: '#000'
          },
          white: {
            main: '#fff'
          },
          grey1: {
            main: grey[100]
          },
          grey2: {
            main: grey[200]
          },
          grey3: {
            main: grey[300]
          },
          grey4: {
            main: grey[400]
          },
          grey5: {
            main: grey[500]
          },
          grey6: {
            main: grey[600]
          },
          grey7: {
            main: grey[700]
          },
          grey8: {
            main: grey[800]
          }
        }
      : {
          // palette values for dark mode
          neutral: {
            main: grey[500]
          },
          black: {
            main: '#000'
          },
          white: {
            main: '#fff'
          },
          grey1: {
            main: grey[900]
          },
          grey2: {
            main: grey[800]
          },
          grey3: {
            main: grey[700]
          },
          grey4: {
            main: grey[600]
          },
          grey5: {
            main: grey[500]
          },
          grey6: {
            main: grey[400]
          },
          grey7: {
            main: grey[300]
          },
          grey8: {
            main: grey[200]
          }
        })
  },
  // mixins,
  typography: {
    h1: {
      ...headingStyles
    },
    h2: {
      ...headingStyles
    },
    h3: {
      ...headingStyles
    },
    h4: {
      ...headingStyles
    },
    h5: {
      ...headingStyles
    },
    h6: {
      ...headingStyles,
      lineHeight: '1.3'
    },
    button: {
      fontWeight: 700
    }
  },
  components
})

export interface ThemeProps {
  children: React.ReactNode
}

function Theme({ children }: ThemeProps) {
  const { settings } = useSettings()
  const [mode, setMode] = React.useState<PaletteMode>(
    settings?.darkMode ? 'dark' : 'light'
  )

  const theme = React.useMemo(() => {
    return responsiveFontSizes(createTheme(getDesignTokens(mode)))
  }, [mode])

  React.useEffect(() => {
    setMode(settings?.darkMode ? 'dark' : 'light')
  }, [settings?.darkMode])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default Theme
