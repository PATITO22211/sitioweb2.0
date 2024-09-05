const trigger = document.getElementById('trigger');
const modal = document.getElementById('modal');

trigger.addEventListener('mouseover', () => {
  modal.style.display = 'block';
});

trigger.addEventListener('mouseout', () => {
  modal.style.display = 'none';
});

trigger.addEventListener('mouseover', () => {
modal.classList.add('show');
});

trigger.addEventListener('mouseout', () => {
modal.classList.remove('show');
});