import user from "./data/user_information";
import {
  clearInputValues,
  getRandomTheme,
  higherAmountTransaction,
  inputEventCreator,
  selectGroupCreator,
  timerCreator,
  transactionCompleted,
} from "./helper/helper-functions";

const formState = {}; //Form iceriginin state verisi.

const highLimit = 500; //Belirlenebilecek kontrol limiti, sonrasinda sifre sormasi gerekir.
const timeLimit = 400; // Belirlenebilecek zaman limiti (saniye), timer icerisinde kullanilir.
const passwordAttemptLimit = 3; // Belirlenebilecek password girme sayisi.

const formElement = document.querySelector("form"); //Form elemaninin secilmesi.

//Formun gonderilme durumu ve kontroller.
formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  //Gonderilecek miktarin 500 birimden fazla olmasi.
  if (formState[inputAmount.name] >= highLimit) {
    //Sifre girebilme hakkiyla beraber sifre giris alani
    higherAmountTransaction(passwordAttemptLimit);
  } else {
    transactionCompleted();
  }
}

//Eleman-event olusturucu fonksiyonlar
inputEventCreator(formElement, handleInputChange);
timerCreator(formElement, timeLimit);
selectGroupCreator(user.accounts, formState, handleInputChange);

//Form ici elemanlarin tanimlanmasi.
const selectElement = formElement.querySelector("select");
const [inputIBAN, inputAmount] = formElement.querySelectorAll("input");
const buttonElement = formElement.querySelector("button");

/*
 * Input change eventi
 * Form icerisinde input ve select elemanlari degistiginde form kontrol edilir
 * formState verisi input degerlerine gore guncellenir
 * Para girisi input elemaninin max sayi degeri guncellenir
 */
function handleInputChange(event) {
  let { name, value, type } = event.target;
  formState[name] = value;

  if (type === "text") {
    event.target.value = value.trim(); //Bos karakter kullaniminin engellenmesi
    event.target.value = splitInput(value); //Karakterlerin 4lu gruplar halinde bolunmesi
    console.log(event.target.validity.valid);
    event.target.validity.valid = false;
    console.log(event.target.validity.valid);
  }

  setInputMaxAttribute(formState[selectElement.name]);
  checkFormValidity();
}

function splitInput(text) {
  text = text.split("-").join("");
  let modifiedText = "";

  //Regex ile yapilabilirdi//
  //Inputa girilen iban degerinin 4 karakterde bir "-" ile bolunmesi
  for (let i = 0; i < text.length; i++) {
    modifiedText += text[i];
    if ((i + 1) % 4 == 0 && i + 1 !== text.length) {
      modifiedText += "-";
    }
  }

  //console.log(modifiedText);
  return modifiedText;
}
/**
 * HTML5 form kontrolleri yardimiyla formun valid olup olmadiginin boolean donmesi.
 * Form validity durumunun kontrolu ve butona etkisi
 */
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
  inputAmount.setAttribute("max", `${maxAmountValue}`);
}

//Ilk sayfa yuklenmesi durumunda formun kontrolu
clearInputValues([inputIBAN, inputAmount]);
checkFormValidity();

//Deneme amacli yapildi.
setTimeout(() => {
  getRandomTheme();
}, 300);
