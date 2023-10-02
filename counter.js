import { bonus } from './mock.js'
import { v } from './variables.js'

export function setupCounter(countOfMoney, shop, element, bonusSpeed, shopItems) {
    
  for ( const item of bonus ) {
    const div = document.createElement('div')
    const button = document.createElement('button')

    button.textContent = `${item.name} купить за ${item.cost} `
    
    button.addEventListener('click', () => setItem(item) )

    div.appendChild(button)
    shopItems.appendChild(div)
  }

  function setItem(item) {
    const currentBonus  = bonus.find(b => b.id  === item.id)
    currentBonus.bought = true
  }
   
  const getBonusOfSecond = () => {
    v.bonusOfSecond = v.bonusOfSecond + 0.2
  }
  
  shop.addEventListener('click', (e) => {
    e.stopPropagation()
     if ( e.target.isEqualNode(bonusSpeed) ) {
       getBonusOfSecond()
     }
  } )
  
  element.addEventListener('click', () => setCounter())
  
  const setCounter = () => {
    let countOfBonusMoney = 0;
    for (const item of bonus) {
      if (item.bought) {
        if ( countOfBonusMoney === 0 ) {
          countOfBonusMoney = item.bonus
        } else {
          countOfBonusMoney += item.bonus
        }
      }
    }
    v.money += ++countOfBonusMoney;
    countOfMoney.innerHTML = `${v.money}`
  }
  
  const getMoneyForSecond = () => {
    setInterval(() => {
      v.money = v.money + v.bonusOfSecond;
      countOfMoney.innerHTML = `${v.money}`
    }, 1000)
  
  }
  getMoneyForSecond()
}
