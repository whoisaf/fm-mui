import React from 'react'
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  Box,
  BoxProps,
  CardHeader,
  CardHeaderProps,
  CardMedia,
  CardMediaProps,
  CardActions,
  CardActionsProps,
  styled
} from '@mui/material'

export interface CardProps extends MuiCardProps {
  testId?: string
  elevationOnHover?: boolean
  header?: CardHeaderProps
  media?: CardMediaProps
  actions?: React.ReactNode
  actionsProps?: CardActionsProps
  contentProps?: BoxProps
}

const elevation = {
  notOutlined: '0 2px 10px -2px rgba(0,0,0,.2)',
  notOutlinedHover: '0 2px 10px -2px rgba(0,0,0,.3)',
  outlined: '0 3px 15px -3px rgba(0,0,0,.1)',
  outlinedHover: '0 3px 15px -3px rgba(0,0,0,.2)'
}

const StyledCard = styled(MuiCard)<CardProps>(
  ({ theme, variant, elevationOnHover }) => ({
    ...(variant === 'outlinedElevation' && {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: elevation.outlined
    }),

    ...(variant === 'outlined' || variant === 'outlinedElevation'
      ? {
          ...(elevationOnHover && {
            cursor: 'pointer',
            '&:hover': {
              boxShadow:
                variant === 'outlined'
                  ? elevation.outlined
                  : elevation.outlinedHover
            }
          })
        }
      : {})
  })
)

const Card = ({
  testId = 'card',
  header,
  media,
  actions,
  actionsProps,
  contentProps,
  children,
  ...rest
}: CardProps) => {
  return (
    <StyledCard data-testid={testId} {...rest}>
      {header && <CardHeader data-testid={`${testId}-header`} {...header} />}
      {media && <CardMedia data-testid={`${testId}-media`} {...media} />}
      <Box p={2} {...contentProps}>
        {children}
      </Box>
      {actions && (
        <CardActions data-testid={`${testId}-actions`} {...actionsProps}>
          {actions}
        </CardActions>
      )}
    </StyledCard>
  )
}

export default Card
