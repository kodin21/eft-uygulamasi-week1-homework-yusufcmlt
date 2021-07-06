import FormTimer from "./FormTimer";

export default function SelectOptions(optionsData, { id, onChangeFunction }) {
  //Select elementi icin container olusturulmasi.
  const formGroupElement = document.createElement("div");
  formGroupElement.classList.add("form__group");

  //Select ve ona ait label elementlerinin markupi
  //parametreden gelen id bilgisi giriliyor.
  let selectElement = `<label for="${id}" class="form__label"
    >Gönderen Hesap</label
  ><select id="${id}" name="${id}" class="form__input" required></select>`;

  //Olusturulan markupin container element icine eklenmesi
  formGroupElement.innerHTML = selectElement;
  selectElement = formGroupElement.querySelector("select");

  //Select elementine parametreden gelen change eventine ait fonksiyon
  selectElement.addEventListener("change", onChangeFunction);
  selectElement.required = true;

  //optionsData verisine gore hesap listesini-
  //-select elementi icerisinde option olarak olusturma
  optionsData.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.textContent = `${option.iban} - ${option.balance} ₺`;
    optionElement.value = option.balance;
    selectElement.appendChild(optionElement);
  });

  return formGroupElement;
}
