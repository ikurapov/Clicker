import {v} from '@js/variables.js'

const notify = (type, msg, timeout = 2500) => {
  if (v.notifyCount >= 3) return void 0

  const container = document.getElementById('msg')
  const notify = document.createElement('div')
  notify.classList.add('notify', type)

  // Кнопка закрыть
  const src = new URL('@/assets/icons/cross.svg', import.meta.url).href
  const img = document.createElement('img')
  img.src = src
  img.classList.add('notify__cross')
  const btn = document.createElement('button')
  btn.classList.add('btn')
  btn.append(img)

  // Монтирование в DOM
  notify.append(msg)
  notify.append(btn)
  container.append(notify)
  v.notifyCount += 1

  // События
  const closeNotify = () => {
    notify.classList.add('closing')
    setTimeout(() => {
      notify.remove()
      v.notifyCount -= 1
    }, 500)
  }

  notify.addEventListener('click', (e) => {
    e.stopPropagation()
    closeNotify()
  })

  setTimeout(() => {
    closeNotify()
  }, timeout)
}

export default notify
