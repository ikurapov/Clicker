import displayNotify from '@/composables/notify.js'
import levels from '@/mock/levels.js'
import bonuses from '@/mock/bonuses.js'

class Game {
  level = 1
  balance = 0
  bonus = 0

  // Инициализация игры
  init() {
    this.updateBgImage()
    this.setBalance(this.getBalance())
    this.clickAnimation()
    this.clickTopUp()
    this.initShop()
    this.getBonus()
    this.updateProgress()
    this.nextLevelHandler()
  }

  // Обновление изображения
  updateBgImage() {
    const image = new URL(`../assets/images/girls/${this.getLevel()}.jpg`, import.meta.url).href
    document.body.style.backgroundImage = `url(${image})`
  }

  // Получение текущего уровня
  getLevel() {
    if (!localStorage.getItem('level')) {
      localStorage.setItem('level', this.level)
      return this.level
    }

    this.level = +localStorage.getItem('level')
    return this.level
  }

  // Установка следующего уровня
  nextLevel() {
    this.setBalance(this.getBalance() - levels[this.level - 1])
    this.level += 1
    localStorage.setItem('level', this.level)
    this.updateBgImage()
    this.updateProgress()
  }

  // Получение баланса
  getBalance() {
    if (!localStorage.getItem('balance')) {
      localStorage.setItem('balance', this.balance)
      return this.balance
    }

    this.balance = +localStorage.getItem('balance')
    return this.balance
  }

  // Установка баланса
  setBalance(balance) {
    this.balance = balance
    localStorage.setItem('balance', this.balance)
    this.updateBalance()
  }

  // Получение текущего бонуса
  getBonus() {
    if (!localStorage.getItem('bonus')) {
      localStorage.setItem('bonus', this.bonus)
      return this.bonus
    }

    this.bonus = +localStorage.getItem('bonus')
    return this.bonus
  }

  // Обновление баланса в localStorage и DOM
  updateBalance() {
    localStorage.setItem('balance', this.balance)
    this.updateProgress()
    document.getElementById('balance').innerText = this.balance
  }

  // Добавление анимации клика
  clickAnimation() {
    document.body.addEventListener('click', (e) => {
      const { pageY, pageX } = e
      const kiss = document.createElement('img')
      kiss.src = new URL('@/assets/images/kiss.png', import.meta.url).href
      kiss.classList.add('kiss')
      kiss.style.top = `${pageY}px`
      kiss.style.left = `${pageX}px`
      kiss.setAttribute('draggable', 'false')
      document.body.append(kiss)

      setTimeout(() => {
        kiss.remove()
      }, 2000)
    })
  }

  // Добавление денег на баланс при клике
  clickTopUp() {
    document.body.addEventListener('click', () => {
      this.setBalance(this.balance + 1 + this.bonus)
    })
  }

  // Инициализация магазина
  initShop() {
    const shop = document.getElementById('shop')

    // Обработчик добавления бонуса
    const addBonus = (slug) => {
      const bonusItem = bonuses.find(item => item.slug === slug)
      if (!bonusItem) return void 0

      // Если баланса не хватает, то выводим уведомление
      if (this.balance < bonusItem.cost)
        return displayNotify('error', 'Недостаточно средств')

      this.bonus += bonusItem.bonus
      this.balance -= bonusItem.cost
      localStorage.setItem('bonus', this.bonus)
      this.updateBalance()
    }

    // Монтирование каждого бонуса
    for (const bonus of bonuses) {
      const btn = document.createElement('btn')
      btn.classList.add('shop__btn', 'btn')
      btn.innerText = `${bonus.name} за ${bonus.cost} монет`
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        addBonus(bonus.slug)
      })
      shop.append(btn)
    }
  }

  // Обновление прогресса
  updateProgress() {
    const nextBtn = document.getElementById('progress-btn')
    const line = document.querySelector('.progress__line')
    const price = document.querySelector('.progress__price')
    const procent = this.balance * 100 / levels[this.level - 1]

    price.innerText = `Цена следующей картинки: ${levels[this.level - 1]} монет`
    line.style.width = procent + '%'

    if (procent >= 100) {
      return nextBtn.style.display = 'block'
    }
    nextBtn.style.display = 'none'
  }

  // Обработчик нового уровня
  nextLevelHandler() {
    const btn = document.getElementById('progress-btn')
    btn.addEventListener('click', (e) => {
      e.stopPropagation()

      // Если баланса не хватает, то выводим уведомление
      if (this.balance < +levels[this.level - 1])
        return displayNotify('error', 'Недостаточно средств')

      this.nextLevel()
    })
  }
}

export default new Game()
