import FormTimer from "../components/FormTimer";
import SelectOptions from "../components/SelectOptions";

//Form elemanindaki inputlara on change eventinin eklenmesi
//Inputlara keyup eventi de eklendi: her tus girisinin kontrol edilmesi isteniyor.
export function inputEventCreator(containerForm, eventFunction) {
  containerForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", eventFunction);
    input.addEventListener("keyup", eventFunction);
  });
}
//Timerin forma eklenmesi.
export function timerCreator(containerForm) {
  const timerElement = FormTimer(402);
  containerForm.prepend(timerElement);
}

//Select eleman grubunun ---ilk inputtan hemen önce--- forma eklenmesi.
//id ve onChangeFunction argumanlari kullanilarak select grubu olusturuluyor ve event baglaniyor.
//Ilk render durumunda secili secenegin degeri state e ataniyor.
export function selectGroupCreator(formData, initialState, eventFunction) {
  const selectGroup = SelectOptions(formData, {
    id: "gondericiHesapMiktar",
    onChangeFunction: eventFunction,
  });
  const selectElement = selectGroup.querySelector("select");
  initialState[selectElement.name] = selectElement.value;
  document
    .querySelector(".form__group")
    .insertAdjacentElement("beforebegin", selectGroup);
}
