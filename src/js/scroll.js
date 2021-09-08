
const wrapper = document.querySelector('.message-wrapper')
const content = wrapper.querySelector('.textblock__content')
const scrollbarLine = wrapper.querySelector('.scrollbar__progress-line')
const scrollbarSlider = wrapper.querySelector('.scrollbar__slider')
// const progressHeightMax = (scrollbarLine.offsetHeight - scrollbarSlider.offsetHeight)
// const scrollToMax = (content.scrollHeight - content.offsetHeight)
let pointZero = 0
let percentScrollSlider
let contentPosition

const getEvent = () => {
  return event.type.search('touch') !== -1 ? event.touches[0] : event
}

const scrollingStart = () => {
  event.preventDefault()
  const evt = getEvent()
  pointZero = evt.clientY
  document.addEventListener('mousemove', scrollingMove)
  document.addEventListener('touchmove', scrollingMove)
  document.addEventListener('mouseup', scrollingEnd)
  document.addEventListener('touchend', scrollingEnd)
}

const scrollingMove = () => {
  const evt = getEvent()
  const pointFinal = pointZero - evt.clientY
  scrollbarSlider.style.top = `${scrollbarSlider.offsetTop - pointFinal}px`

  percentScrollSlider = scrollbarSlider.offsetTop / (scrollbarLine.offsetHeight - scrollbarSlider.offsetHeight) * 100
  contentPosition = ((content.scrollHeight - content.offsetHeight) * percentScrollSlider) / 100
  content.scrollTo(0, contentPosition)
  pointZero = evt.clientY

  if (scrollbarSlider.offsetTop < 0) {
    scrollbarSlider.style.top = '0px'
  }
  if (scrollbarSlider.offsetTop > (scrollbarLine.offsetHeight - scrollbarSlider.offsetHeight)) {
    scrollbarSlider.style.top = `${(scrollbarLine.offsetHeight - scrollbarSlider.offsetHeight)}px`
  }
}

const scrollingEnd = () => {
  document.removeEventListener('mousemove', scrollingMove)
  document.removeEventListener('touchmove', scrollingMove)
  document.removeEventListener('mouseup', scrollingEnd)
  document.removeEventListener('touchend', scrollingEnd)
}

const scrollingScrollbarSlider = () => {
  const percentScrollContent = content.scrollTop / (content.scrollHeight - content.offsetHeight) * 100
  const positionScrollSlider = ((scrollbarLine.offsetHeight - scrollbarSlider.offsetHeight) * percentScrollContent) / 100
  scrollbarSlider.style.top = `${positionScrollSlider}px`
}

scrollbarSlider.addEventListener('mousedown', scrollingStart)
scrollbarSlider.addEventListener('touchstart', scrollingStart)
content.addEventListener('scroll', scrollingScrollbarSlider)
