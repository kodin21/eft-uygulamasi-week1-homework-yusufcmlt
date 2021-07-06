import formData from "./data/form-data";
import {
  inputEventCreator,
  selectGroupCreator,
  timerCreator,
} from "./helper/creator-functions";

//Form State Verisi
const formState = {};

//Form elemaninin tanimlanmasi
const formElement = document.querySelector("form");
inputEventCreator(formElement, handleInputChange);
timerCreator(formElement);
selectGroupCreator(formData, formState, handleInputChange);
//Button tanimi
const buttonElement = formElement.querySelector("button");
const [inputIBAN, inputAmount] = formElement.querySelectorAll("input");
const selectElement = formElement.querySelector("select");

//Input change eventi
//Form icerisinde input ve select elemanlari degistiginde form kontrol edilir
//formState verisi input degerlerine gore guncellenir
function handleInputChange(event) {
  const { name, value } = event.target;
  formState[name] = value;
  setInputMaxAttribute(formState[selectElement.name]);
  checkFormValidity();
}

function checkFormValidity() {
  const isFormValid = formElement.checkValidity();
  toggleButtonAccess(isFormValid);
}

function toggleButtonAccess(buttonState) {
  buttonElement.disabled = !buttonState;
  buttonElement.textContent = !buttonState
    ? "Eksik bilgi"
    : `${formState[inputAmount.name]}₺ Gönder`;
}
function setInputMaxAttribute(maxAmountValue) {
  console.log(maxAmountValue);
  inputAmount.setAttribute("max", `${maxAmountValue}`);
}
checkFormValidity();
