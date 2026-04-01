document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('.product-check');
  const orderList = document.getElementById('order-list');
  const totalField = document.getElementById('order-total');
  const seatsField = document.getElementById('selected-items');

  if (!checkboxes.length || !orderList || !totalField || !seatsField) {
    return;
  }

  function updateOrder() {
    const selected = Array.from(checkboxes).filter((item) => item.checked);
    orderList.innerHTML = '';

    if (!selected.length) {
      const li = document.createElement('li');
      li.textContent = 'Товары ещё не выбраны.';
      orderList.appendChild(li);
      totalField.textContent = '0 ₽';
      seatsField.value = '';
      return;
    }

    let total = 0;
    const names = [];

    selected.forEach((item) => {
      const name = item.dataset.name;
      const price = Number(item.dataset.price || 0);
      total += price;
      names.push(name);

      const li = document.createElement('li');
      li.textContent = name + ' — ' + price.toLocaleString('ru-RU') + ' ₽';
      orderList.appendChild(li);
    });

    totalField.textContent = total.toLocaleString('ru-RU') + ' ₽';
    seatsField.value = names.join(', ');
  }

  checkboxes.forEach((item) => item.addEventListener('change', updateOrder));
  updateOrder();
});
