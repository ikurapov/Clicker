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

    div.appendChild(button)
    shop.appendChild(div)
  }

  const setItem = (item) => {
    const currentBonus  = bonus.find(b => b.id  === item.id)
    if ( v.money >= currentBonus.cost ) {
      v.money -= currentBonus.cost 
      countOfMoney.innerHTML = `${v.money.toFixed(1)}`
      currentBonus.bought = true
      return
    }
    return alert('Не хватает денег для покупки бонуса')
  }
  
  /** Счетчик, за клик получаем 1 монету + бонус */

  element.addEventListener('click', () => setCounter())

  const setCounter = () => {
    let countOfBonusMoney = 0;
    for (const item of bonus) {
      if (item.bought) {
        if ( countOfBonusMoney === 0 ) {
          countOfBonusMoney = item.bonus
          console.log('if', countOfBonusMoney)
        } else {
          console.log('else', countOfBonusMoney)
          countOfBonusMoney += item.bonus
        }
      }
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

}
