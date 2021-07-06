import formData from "./data/form-data";
import {
  clearInputValues,
  getRandomTheme,
  higherAmountTransaction,
  inputEventCreator,
  selectGroupCreator,
  timerCreator,
  transactionCompleted,
} from "./helper/helper-functions";

//Form State Verisi
const formState = {};

//Form elemaninin tanimlanmasi
const formElement = document.querySelector("form");

//Form gonderme durumu ve kontroller
formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  //Gonderilecek miktarin 500 birimden fazla olmasi.
  if (formState[inputAmount.name] > 500) {
    //Sifre girebilme hakkiyla beraber sifre giris alani
    higherAmountTransaction(3);
  } else {
    transactionCompleted();
  }
}

//Eleman-event olusturucu fonksiyonlar
inputEventCreator(formElement, handleInputChange);
timerCreator(formElement);
selectGroupCreator(formData, formState, handleInputChange);

//Form ici elemanlarin tanimlanmasi.
const selectElement = formElement.querySelector("select");
const [inputIBAN, inputAmount] = formElement.querySelectorAll("input");
const buttonElement = formElement.querySelector("button");

//Input change eventi
//Form icerisinde input ve select elemanlari degistiginde form kontrol edilir
//formState verisi input degerlerine gore guncellenir
//Para girisi input elemaninin max sayi degeri guncellenir
function handleInputChange(event) {
  const { name, value } = event.target;
  formState[name] = value;

  setInputMaxAttribute(formState[selectElement.name]);
  checkFormValidity();
}

//HTML5 form kontrolleri yardimiyla formun valid olup olmadiginin boolean donmesi.
//Form validity durumunun kontrolu ve butona etkisi
function checkFormValidity() {
  const isFormValid = formElement.checkValidity();
  toggleButtonAccess(isFormValid);
}

//Form validity durumuna gore buton erisiminin guncellenmesi
function toggleButtonAccess(buttonState) {
  buttonElement.disabled = !buttonState;
  buttonElement.textContent = !buttonState
    ? "Eksik bilgi"
    : `${formState[inputAmount.name]}₺ Gönder`;
}

//Dropdown menudeki bakiyenin para miktari inputundaki max girilebilecek sayiyi guncellemesi
function setInputMaxAttribute(maxAmountValue) {
  console.log(maxAmountValue);
  inputAmount.setAttribute("max", `${maxAmountValue}`);
}

//Ilk sayfa yuklenmesi durumunda formun kontrolu
clearInputValues([inputIBAN, inputAmount]);
checkFormValidity();
setTimeout(() => {
  getRandomTheme();
}, 300);
