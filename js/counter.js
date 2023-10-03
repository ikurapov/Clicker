import { bonus } from '@mock/mock.js'
import { v } from '@js/variables.js'
import { firstLetter } from '@compos/firstLetter.js'

export function setupCounter(countOfMoney, shop, element, bonusSpeed) {
  
  /** Кнопки покупки предметов */

  for ( const item of bonus ) {
    const div = document.createElement('div')
    const button = document.createElement('button')

    button.textContent = `${firstLetter(item.name)} купить за ${item.cost} `
    
    button.addEventListener('click', () => setItem(item) )

    button.classList.add(`${item.slug}`)

    div.appendChild(button)
    shop.appendChild(div)
  }

  const setItem = (item) => {
    const currentBonus = bonus.find(b => b.slug  === item.slug)
    if ( v.money >= currentBonus.cost ) {
      v.money -= currentBonus.cost 
      countOfMoney.innerHTML = `${v.money.toFixed(1)}`
      currentBonus.bought++
      currentBonus.cost = addCredit(currentBonus.cost, 0.1)

      shop.querySelector(`.${currentBonus.slug}`).textContent = `${firstLetter(currentBonus.name)} купить за ${currentBonus.cost.toFixed(1)}`

      return
    }
    return alert('Не хватает денег для покупки бонуса')
  }
  
  /** Счетчик, за клик получаем 1 монету + бонус */

  element.addEventListener('click', () => setCounter())

  const setCounter = () => {
    let countOfBonusMoney = 0;
    for (const item of bonus) {
      countOfBonusMoney += (item.bought * item.bonus)
    }
    v.money += ++countOfBonusMoney;
    countOfMoney.innerHTML = `${v.money.toFixed(1)}`
  }
  
  /** Получение денег за кол-во секунд */

  shop.addEventListener('click', (e) => {
    e.stopPropagation()
    if ( e.target.isEqualNode(bonusSpeed) ) {
      getBonusOfSecond()
    }
  } )

  const getBonusOfSecond = () => {
    v.bonusOfSecond += 0.2
  }

  const getMoneyForSecond = () => {
    setInterval(() => {
      v.money = v.money + v.bonusOfSecond;
      countOfMoney.innerHTML = `${v.money.toFixed(1)}`
    }, 1000)
  }
  getMoneyForSecond()


  /** Функция для добавления кредита */

  const addCredit = (cost, creditSum) => {
    const credit = cost * creditSum
    return cost += credit
  }

}
