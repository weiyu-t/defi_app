import { dbank } from "../../declarations/dbank";

window.addEventListener('load', async function() {
  update();
})

document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const button = e.target.querySelector('#submit-btn');

  const input = parseFloat(document.getElementById('input-amount').value);
  const withdraw = parseFloat(document.getElementById('withdrawa-amount').value);

  button.setAttribute('disabled', true);

  if (document.getElementById('input-amount').value.length !== 0) {
    await dbank.topUp(input);
  }
  
  if (document.getElementById('withdrawa-amount').value.length !== 0) {
    await dbank.withDraw(withdraw);
  }

  await dbank.compound();

  update();
  document.getElementById('input-amount').value = '';
  document.getElementById('withdrawa-amount').value = '';
  button.removeAttribute('disabled');
})

async function update() {
  const currentAmount = await dbank.balance();
  document.getElementById('value').innerText = Math.round(currentAmount * 100) / 100;
}