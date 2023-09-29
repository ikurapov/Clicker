import { bonus } from './mock.js'
import { v } from './variables.js'

export function setupCounter(countOfMoney, shop, element, bonusSpeed) {
    
  for ( const item of bonus ) {
    shop.innerHTML += `
      <div>
      <button>${item.name}</button>
      <h3>Купить за ${item.cost}</h3>
      </div>`
  }
   
  const getBonusOfSecond = () => {
    v.bonusOfSecond++
  }
  
  shop.addEventListener('click', (e) => {
     if ( e.target.isEqualNode(bonusSpeed) ) {
      getBonusOfSecond()
     }
  } )
  
  element.addEventListener('click', (e) => setCounter(e))
  
  const setCounter = (e) => {
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
