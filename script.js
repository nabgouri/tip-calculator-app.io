const tipsElementContainer = document.querySelector('.tips');
// const inputs__elements = document.querySelector('.card__inputs')

const tips = ['5%', '10%', '15%', '25%', '50%'];

const tipsElement = tips.map((tip) => `<button id="tip"
    class="card__input"
    data-value = ${tip}>${tip}</button>`);
tipsElementContainer.insertAdjacentHTML('afterbegin', tipsElement.join(''));
const inputsElements = document.querySelectorAll('.card__input');
// const inputElement = document.querySelector('.card__input')
const billElement = document.querySelector('#bill');
const tipElementCustom = document.querySelector('#tip-custom');
const peopleElement = document.querySelector('#people');
const cardMessage = document.querySelector('.card__message');
const tipResult = document.querySelector('.tip-result');
const totalResult = document.querySelector('.total-result');
const tipElements = document.querySelectorAll('#tip');
const ResetButton = document.querySelector('.reset-button');
const updateTipAmount = (billValue, tipPercentage, peopleValue) => {
  if (!billValue && !peopleValue && !tipPercentage) return;
  if (billValue && peopleValue && tipPercentage) {
    const resultTipAmount = tipAmount(billValue, tipPercentage, peopleValue);
    tipResult.textContent = resultTipAmount.toFixed(2);
  }
};
const updateTotal = (billValue, tipPercentage, peopleValue) => {
  if (!billValue && !peopleValue && !tipPercentage) return;
  if (billValue && peopleValue && tipPercentage) {
    const resultOfTotal = billValue + tipAmount(billValue, tipPercentage, peopleValue);
    totalResult.textContent = resultOfTotal.toFixed(2);
  }
};
const messageError = (bill, people) => {
  if (bill && !people) {
    peopleElement.classList.add('card__input-error');
    cardMessage.classList.remove('card__errorMessage');
  }
  if (bill && people) {
    peopleElement.classList.remove('card__input-error');
    cardMessage.classList.add('card__errorMessage');
  }
};
const tipAmount = (bill, tipPercentage, peopleNumber) => (tipPercentage / 100 * bill) / peopleNumber;
let selectedTipElement = null;
let selectedTipPercent = null;
let billAmount = '';
let peopleAmount = '';

const resetFunction = () => {
  billElement.value = '';
  tipElementCustom.value = '';
  peopleElement.value = '';
  tipResult.textContent = '0.00';
  totalResult.textContent = '0.00';
  selectedTipElement = null;
  selectedTipPercent = null;
  peopleElement.classList.remove('card__input-error');
  cardMessage.classList.add('card__errorMessage');
  tipElements.forEach((tipElement) => {
    tipElement.id = 'tip';
  });
};
inputsElements.forEach((input) => {
  input.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    input.classList.add('active-color');

    messageError(billElement.value, peopleElement.value);
  });
  tipElements.forEach((tipElement) => {
    billAmount = parseFloat(billElement.value);
    peopleAmount = parseInt(peopleElement.value);
    tipElement.addEventListener('click', (event) => {
      event.preventDefault();
      if (selectedTipElement) {
        selectedTipElement.id = 'tip';
      }
      selectedTipElement = tipElement;
      selectedTipElement.id = 'tip-active';
      selectedTipPercent = parseFloat(selectedTipElement.dataset.value);
      updateTipAmount(billAmount, selectedTipPercent, peopleAmount);
      updateTotal(billAmount, selectedTipPercent, peopleAmount);
    });
    input.addEventListener('input', () => {
      billAmount = parseFloat(billElement.value);
      peopleAmount = parseFloat(peopleElement.value);

      if (selectedTipElement) {
        updateTipAmount(billAmount, selectedTipPercent, peopleAmount);
        updateTotal(billAmount, selectedTipPercent, peopleAmount);
      }
      if (tipElementCustom) {
        selectedTipPercent = parseFloat(tipElementCustom.value);
        updateTipAmount(billAmount, selectedTipPercent, peopleAmount);
        updateTotal(billAmount, selectedTipPercent, peopleAmount);
      }
    });
  });
  ResetButton.addEventListener('click', resetFunction);
});
