import './assets/scss/style.scss'
import setupCounter from '@js/counter.js'
import { animationCLick } from '@compos/animationCLick.js'

setupCounter (
  document.querySelector('#money'),
  document.querySelector('#shop'),
  document.querySelector('#clicker'),
  document.querySelector('.bonusOfSecond'),
)

animationCLick(document.querySelector('#clicker'))