const slider = document.querySelector('.slider')
const sliderWrapper = slider.querySelector('.slider__wrapper')
const sliderItem = slider.querySelectorAll('.slider__item')
const btnNext = slider.querySelector('.home__btn')
const homeBtn = document.querySelector('.navigation__btn')
const decorAnimation = slider.querySelector('.decorative-elements__animation')
const btnPopOpen = slider.querySelector('.advantages__btn')
const shadow = document.querySelector('.shadow')
const shifter = document.querySelector('.switch')
const paginationItem = shifter.querySelectorAll('.switch__pagination-item')
const list = document.querySelectorAll('.advantages__list')
const popup = document.querySelector('.popup')
const closePopBtn = popup.querySelector('.popup__btn-close')

let sliderWidth = sliderItem[0].offsetWidth
let slideNumber = 0
let pointZero = 0
let pointX1 = 0
let pointX2 = 0
let pointY1 = 0
let pointY2 = 0
let pointSpacing = 0
let pointSpacingY
let nextTrf = 0
let prevTrf = 0
let counter = 0
let isSwipe = false
let isScroll = false
let allowSwipe = true
let transition = true

let timeStart
let timeEnd
let timeFinal
const lastTrf = --sliderItem.length * sliderWidth
const pointTreshold = sliderWidth * 0.35
const trfRegExp = /[-0-9.]+(?=px)/
const getEvent = function () {
  return event.type.search('touch') !== -1 ? event.touches[0] : event
}

const windowWidth = () => {
  sliderWidth = sliderItem[0].offsetWidth
  slide()
}
window.addEventListener('resize', () => {
  transition = false
  windowWidth()
})

const slide = () => {
  if (transition) {
    sliderWrapper.style.transition = 'transform .4s'
  } else {
    sliderWrapper.style.transition = ''
  }
  sliderWrapper.style.transform = 'translateX(0px)'
  sliderWrapper.style.transform = `translateX(-${slideNumber * sliderWidth}px)`
  activeSlide()
}

const activeSlide = () => {
  sliderItem.forEach((item) => {
    if (+item.id === +slideNumber) {
      item.classList.add('slider__item--active')
    } else {
      item.classList.remove('slider__item--active')
    }
  })
  activeMsgAnimation()
}

const activeMsgAnimation = () => {
  if (sliderItem[1].classList.contains('slider__item--active')) {
    decorAnimation.style.transition = '2.5s'
    setTimeout(() => {
      decorAnimation.classList.add('decorative-elements__animation--active')
    }, 500)
  } else {
    decorAnimation.style.transition = '0.3s'
    decorAnimation.classList.remove('decorative-elements__animation--active')
  }
}

const swipeStart = () => {
  const evt = getEvent()
  if (shadow.closest('.shadow--active')) {
    allowSwipe = false
  } else {
    allowSwipe = true
  }
  if (allowSwipe) {
    transition = true

    nextTrf = (slideNumber + 1) * -sliderWidth
    prevTrf = (slideNumber - 1) * -sliderWidth

    pointZero = pointX1 = evt.clientX
    pointY1 = evt.clientY

    timeStart = Date.now()

    sliderWrapper.style.transition = ''

    document.addEventListener('touchmove', swipeAction)
    document.addEventListener('touchend', swipeEnd)
    document.addEventListener('mousemove', swipeAction)
    document.addEventListener('mouseup', swipeEnd)
  }
}
const swipeAction = () => {
  const evt = getEvent()
  const style = sliderWrapper.style.transform
  const transform = +style.match(trfRegExp)[0]

  pointX2 = pointX1 - evt.clientX
  pointX1 = evt.clientX

  pointY2 = pointY1 - evt.clientY
  pointY1 = evt.clientY

  if (!isSwipe && !isScroll) {
    pointSpacingY = Math.abs(pointY2)

    if (pointSpacingY > 7 || pointX2 === 0) {
      isScroll = true
      allowSwipe = false
    } else if (pointSpacingY < 7) {
      isSwipe = true
    }
  }
  if (isSwipe) {
    if (slideNumber === 0) {
      if (pointZero < pointX1) {
        setTransform(transform, 0)
        return
      } else {
        allowSwipe = true
      }
    }

    if (slideNumber === --sliderItem.length) {
      if (pointZero > pointX1) {
        setTransform(transform, lastTrf)
        return
      } else {
        allowSwipe = true
      }
    }

    if ((pointZero > pointX1 && transform < nextTrf) || (pointZero < pointX1 && transform > prevTrf)) {
      reachEdge()
      return
    }

    sliderWrapper.style.transform = `translateX(${transform - pointX2}px)`
  }
}

const swipeEnd = () => {
  pointSpacing = pointZero - pointX1

  isScroll = false
  isSwipe = false

  document.removeEventListener('touchmove', swipeAction)
  document.removeEventListener('mousemove', swipeAction)
  document.removeEventListener('touchend', swipeEnd)
  document.removeEventListener('mouseup', swipeEnd)
  if (allowSwipe) {
    timeEnd = Date.now()
    timeFinal = timeEnd - timeStart

    const speed = (pointSpacing * 100) / timeFinal
    if (Math.abs(pointSpacing) > pointTreshold || Math.abs(speed) > 50) {
      if (pointZero < pointX1) {
        slideNumber--
      } else if (pointZero > pointX1) {
        slideNumber++
      }
    }
    if (pointZero !== pointX1) {
      allowSwipe = false
      slide()
    } else {
      allowSwipe = true
    }
  } else {
    allowSwipe = true
  }
  windowWidth()
}

const setTransform = (transform, comapreTransform) => {
  if (transform >= comapreTransform) {
    if (transform > comapreTransform) {
      sliderWrapper.style.transform = `translateX(${comapreTransform}px)`
    }
  }
  allowSwipe = false
}

const reachEdge = () => {
  transition = false
  swipeEnd()
  allowSwipe = true
}
activeSlide()
sliderWrapper.style.transform = 'translateX(0px)'

sliderWrapper.addEventListener('transitionend', () => {
  allowSwipe = true
})
slider.addEventListener('touchstart', swipeStart)
slider.addEventListener('mousedown', swipeStart)
btnNext.addEventListener('click', () => {
  slideNumber = 1
  slide()
})
homeBtn.addEventListener('click', () => {
  slideNumber = 0
  slide()
})

btnPopOpen.addEventListener('click', () => {
  shadow.classList.toggle('shadow--active')
  popup.classList.toggle('popup--active')
  windowWidth()

  if (shadow.closest('.shadow--active') && popup.closest('.popup--active')) {
    popup.style.transition = '0.3s'
    setTimeout(() => {
      shadow.style.opacity = '0.7'
      popup.style.opacity = '1'
    }, 1)
  }
})
slide()
const closePopup = () => {
  popup.style.opacity = '0'
  shadow.style.opacity = '0'
  shadow.addEventListener('transitionend', removeActivity)
  // shadow.removeEventListener('click', closePopup)
}

const removeActivity = () => {
  shadow.classList.remove('shadow--active')
  popup.classList.remove('popup--active')
  shadow.removeEventListener('transitionend', removeActivity)
}

closePopBtn.addEventListener('click', closePopup)
shadow.addEventListener('click', closePopup)

shifter.addEventListener('click', () => {
  if (event.target.closest('.switch__btn--next')) {
    counter++
  }
  if (event.target.closest('.switch__btn--prev')) {
    counter--
  }
  switcher()
})

const switcher = () => {
  paginationItem.forEach((item) => {
    item.classList.remove('switch__pagination-item--active')
  })
  list.forEach((ul) => {
    ul.style.display = 'none'
  })
  if (counter >= list.length) {
    counter = 0
  }
  if (counter === -1) {
    counter = list.length - 1
  }
  paginationItem[counter].classList.add('switch__pagination-item--active')
  list[counter].style.display = 'block'
}

switcher()
