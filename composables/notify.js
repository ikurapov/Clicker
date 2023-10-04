const displayNotify = (type, msg, timeout = 2500) => {
  // Если уведомлений уже 3, то не выводим новое
  const notifyList = document.querySelectorAll('.notify')
  if (notifyList.length >= 3) return void 0

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

  // События закрытия
  const closeNotify = () => {
    notify.classList.add('closing')
    setTimeout(() => {
      notify.remove()
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

export default displayNotify
