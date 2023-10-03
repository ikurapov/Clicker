import './assets/style.css'
import setupCounter from '@js/counter.js'
import { animationCLick } from '@compos/animationCLick.js'

document.querySelector('#app').innerHTML = `
  <div class="clicker__wrapper">
    <aside id="shop" class="shop-items">
    <div>
      <button class="bonusOfSecond" type="button">
        Увеличить скорость
      </button>
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
)

animationCLick(document.querySelector('#clicker'))