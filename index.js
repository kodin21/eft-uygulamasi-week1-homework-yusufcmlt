import FormTimer from "./components/FormTimer";
import SelectOptions from "./components/SelectOptions";
import formData from "./data/form-data";

console.log("YEAH");

//Form State Verisi
const formState = {};
//Form elemaninin tanimlanmasi
const formElement = document.querySelector("form");

//Input change eventi
function handleInputChange(event) {
  const { id, value } = event.target;
  formState[id] = value;

  console.log(formState);
  console.log(formElement.checkValidity());
}

//Form elemanindaki inputlara on change eventinin eklenmesi
//Inputlara keyup eventi de eklendi: her tus girisinin kontrol edilmesi isteniyor.
formElement.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", handleInputChange);
  input.addEventListener("keyup", handleInputChange);
});

//Timerin forma eklenmesi.
const timerElement = FormTimer(402);
formElement.prepend(timerElement);

//Select eleman grubunun ---timerdan hemen sonra--- forma eklenmesi.
//id ve onChangeFunction argumanlari kullanilarak select grubu olusturuluyor ve event baglaniyor.
//Ilk render durumunda secili secenegin degeri state e ataniyor.
const selectGroup = SelectOptions(formData, {
  id: "gondericiHesapMiktar",
  onChangeFunction: handleInputChange,
});
const selectElement = selectGroup.querySelector("select");
formState[selectElement.name] = selectElement.value;
timerElement.insertAdjacentElement("afterend", selectGroup);
