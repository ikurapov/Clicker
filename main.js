import './assets/style.css'
import { setupCounter } from './counter.js'
import { animationCLick } from './animationCLick.js'

document.querySelector('#app').innerHTML = `
  <div class="clicker__wrapper">
    <aside id="shop">
    <div>
      <button class="bonusOfSecond" type="button">
        Увеличить скорость
      </button>
    </div>
    <div id="shop-items">
    </div>
    </aside>
    <section id="clicker">
      <div class="card">
        <h1 id="money">0</h1>
        <img src="../public/coin.png" class="card__img"></img>
      </div>  
    </section>
  </div>
`

setupCounter (
  document.querySelector('#money'),
  document.querySelector('#shop'),
  document.querySelector('#clicker'),
  document.querySelector('.bonusOfSecond'),
  document.querySelector('#shop-items')
)

animationCLick(document.querySelector('#clicker'),)