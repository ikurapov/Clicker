import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="clicker__wrapper">
    <aside id="shop">
    <div>
      <button class="bonusOfSecond" type="button">
      Увеличить скорость
      </button>
      <p>Купить за </p>
    </div>
    </aside>
    <section id="clicker">
      <div class="card">
        <button id="counter" type="button">0</button>
      </div>
      <div class="card">
        <h1 id="money">0</h1>
      </div>  
    </section>
  </div>
`

setupCounter (
  document.querySelector('#counter'),
  document.querySelector('#money'),
  document.querySelector('#shop'),
  document.querySelector('#clicker'),
  document.querySelector('.bonusOfSecond')
)
