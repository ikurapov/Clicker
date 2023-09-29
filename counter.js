export function setupCounter(count, countOfMoney, shop, element, bonusSpeed) {
  
  const items = [
      {
        name: "Сильная ладонь",
        bonus: 1,
        id: 1,
        bought: true,
        cost: 100,
      },
      {
        name: "2 Сильные ладони",
        bonus: 3,
        id: 2,
        cost: 300,
        bought: false
      }
    ];
    
  for ( const item of items ) {
    shop.innerHTML += `
      <div>
      <button>${item.name}</button>
      <h3>Купить за ${item.cost}</h3>
      </div>`
  }
    
  console.log(items); 
  let counter = 0;
  let money = 0;
  let bonusOfSecond = 1;
  
    
  const getBonusOfSecond = () => {
    bonusOfSecond++
  }
  
  shop.addEventListener('click', (e) => {
     if ( e.target.isEqualNode(bonusSpeed) ) {
      getBonusOfSecond()
     }
  } )
  
  element.addEventListener('click', () => setCounter())
  
  const setCounter = () => {
    let countOfBonusMoney = 0;
    for (const item of items) {
      if (item.bought) {
        if ( countOfBonusMoney === 0 ) {
          countOfBonusMoney = item.bonus
        } else {
          countOfBonusMoney += item.bonus
        }
      }
    }
    counter++;
    money += ++countOfBonusMoney;
    count.innerHTML = `${counter}`
    countOfMoney.innerHTML = `${money}`
  }
  
  const getMoneyForSecond = () => {
    setInterval(() => {
      money = money + bonusOfSecond;
      countOfMoney.innerHTML = `${money}`
    }, 1000)
  
  }
  getMoneyForSecond()

}
