(function () {
  var button = document.querySelector('.download');
  if (!button || !Element.prototype.animate) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var colors = ['#ff8fb1', '#ffd166', '#7cc8ff', '#8fdc9a', '#b9a1ff', '#ffffff'];

  button.addEventListener('click', function () {
    if (reduceMotion.matches) return;

    var rect = button.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    for (var i = 0; i < 28; i++) {
      var bit = document.createElement('span');
      bit.className = 'burst';
      bit.style.background = colors[i % colors.length];
      bit.style.left = x + (Math.random() - 0.5) * rect.width * 0.6 + 'px';
      bit.style.top = y + 'px';
      document.body.appendChild(bit);

      var angle = Math.random() * Math.PI * 2;
      var distance = 60 + Math.random() * 110;
      var dx = Math.cos(angle) * distance;
      var dy = Math.sin(angle) * distance - 50;
      var spin = Math.random() * 720 - 360;

      bit.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx * 0.8 + 'px,' + dy * 0.8 + 'px) rotate(' + spin * 0.6 + 'deg)', opacity: 1, offset: 0.55 },
        { transform: 'translate(' + dx + 'px,' + (dy + 70) + 'px) rotate(' + spin + 'deg)', opacity: 0 }
      ], {
        duration: 800 + Math.random() * 500,
        easing: 'cubic-bezier(.2, .7, .4, 1)'
      }).onfinish = (function (el) {
        return function () { el.remove(); };
      })(bit);
    }
  });
})();
