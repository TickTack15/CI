setTimeout(() => {
  const tooltip = document.getElementById('tooltip');
  const spans = document.querySelectorAll('.http-block span');

  spans.forEach(span => {
    span.addEventListener('mouseenter', (e) => {
      const text = span.getAttribute('data-tooltip');
      tooltip.innerText = text;
      tooltip.style.display = 'block';
    });

    span.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY + 15) + 'px';
    });

    span.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
}, 100)

