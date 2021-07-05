import formData from "../data/form-data";
import { FormInput, FormButton, FormSelect } from "./FormInput";
import FormTimer from "./FormTimer";

export default function Form(elementData) {
  const formHTML = document.createElement("form");
  formHTML.classList.add("form");

  function formElementCreator(sourceData) {
    return sourceData.forEach((data) => {
      switch (data.element) {
        case "timer":
          formHTML.appendChild(FormTimer(data.time));
          break;
        case "select":
          formHTML.appendChild(FormSelect(data, handleInputChange));
          break;
        case "input":
          formHTML.appendChild(FormInput(data, handleInputChange));
          break;
        case "button":
          formHTML.appendChild(FormButton(data));
          break;
      }
    });
  }

  formElementCreator(formData);
  document.querySelector(".form__container").appendChild(formHTML);

  //Cakma :) form state verisi
  let inputState = setInitialState(formData);
  //Form olusturduktan sonra state olusturma
  console.log(inputState);
  //Gonder tusuna basilma durumu
  function checkAccountBalance() {
    console.log("BUTTOn");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    inputState[name] = value;
    console.log(value);
    checkFormValid();
  }

  function checkFormValid() {
    const buttonElement = document.querySelector("button");

    if (
      Object.keys(inputState).every(
        (key) => document.getElementById(key).validity.valid
      )
    ) {
      buttonElement.textContent = "Gönder";
      buttonElement.disabled = false;
    } else {
      buttonElement.textContent = "Bilgileri girmeden işlem yapamazsınız";
      buttonElement.disabled = true;
    }
  }
}

//Form data kullanilarak elemanlarin olusturulmasi.
//Eleman tiplerine gore olusturucular cagirilip varolan html stringiyle birlestiriliyor.
//Sonrasinda event ekleniyor. ==> eventCreator

//Sayfa ilk load durumunda input value verisinin state verisine gecirilmesi
function setInitialState(sourceData) {
  return sourceData.reduce((formObj, data) => {
    if (data.element !== "timer" && data.element !== "button") {
      return {
        ...formObj,
        [data.id]: document.getElementById(data.id).value,
      };
    } else {
      return { ...formObj };
    }
  }, {});
}
