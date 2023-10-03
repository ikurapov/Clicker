function firstLetter (word) {

    /** Функция возвращает всегда слово с большой буквы */
    
    if ( typeof word[0] !== 'string' ) {
      return "Предмет"
    }
    const firstLetter = word[0].toUpperCase() + word.slice(1)
    return firstLetter

}

function formatNum(number) {
  number = number.toFixed(1)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export { firstLetter, formatNum }