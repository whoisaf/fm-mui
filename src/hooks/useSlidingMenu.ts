import React from 'react'
import Swiper from 'swiper'

import { hasChildItems, transformData, getActiveItem } from '../utils'
import { MenuItemRecord } from '../types'

function useSlidingMenu(items: MenuItemRecord[]) {
  transformData(items)

  const activeItem = getActiveItem(items)
  const activeIndex =
    activeItem !== null && activeItem.level ? activeItem.level : 0
  const getActiveSection = (index: number = 1): MenuItemRecord | null => {
    if (activeItem && activeIndex > 0) {
      if (index === 2) {
        return activeItem.grandparent as MenuItemRecord
      } else {
        return activeItem.parent as MenuItemRecord
      }
    } else {
      return null
    }
  }

  const [swiper, setSwiper] = React.useState<Swiper | null>(null)
  const [secondLevel, setSecondLevel] = React.useState<MenuItemRecord | null>(
    getActiveSection(1)
  )
  const [thirdLevel, setThirdLevel] = React.useState<MenuItemRecord | null>(
    getActiveSection(2)
  )

  const onInit = (swiperInstance: Swiper) => {
    setSwiper(swiperInstance)
  }

  const onItemClick = (item: MenuItemRecord) => {
    if (hasChildItems(item)) {
      if (item.parent) {
        setThirdLevel(item)
      } else {
        setSecondLevel(item)
      }
      swiper?.slideNext()
    } else {
      // if (item.path) {
      //   navigate(item.path)
      // } else if (item.href) {
      //   window.location.href = item.href
      // }
    }

    // if (onItemClick) onItemClick(item)
  }

  const onBackClick = () => {
    swiper?.slidePrev()
  }

  const resetMenu = () => {
    setSecondLevel(null)
    setThirdLevel(null)
    swiper?.slideTo(0)
  }

  return {
    items,
    swiper,
    activeIndex,
    secondLevel,
    thirdLevel,
    resetMenu,
    onInit,
    onItemClick,
    onBackClick
  }
}

export default useSlidingMenu
