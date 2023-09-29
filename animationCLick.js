
export function animationCLick (element) {
  
  document.onmousedown = (e) => {
    document.onclick = () => {
      let circle = document.createElement('div');
      circle.classList.add('click');
      circle.style.left = e.pageX + 'px';
      circle.style.top = e.pageY + 'px';
      element.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 500);
    };
}

}