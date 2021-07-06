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

export function clearInputValues(inputList) {
  inputList.forEach((element) => {
    element.value = "";
  });
}

//Gonderilecek miktarin 500 birimden fazla olmasinin kontrolu
//Sifre girebilme hakkiyla beraber yanlis sifre durumunda tekrar cagirilma.
export function higherAmountTransaction(passwordAttemptsLeft) {
  if (passwordAttemptsLeft === 0) {
    return transactionFailed();
  }

  let twoFactor = prompt(
    "Telefonunuza gelen şifreyi girin",
    `${passwordAttemptsLeft} Hakkiniz Kaldi `
  );

  //Sifrenin dogru olma durumu.
  if (twoFactor === "1234") {
    return transactionCompleted();
  }
  //Sifrenin yanlis olma durumunda tekrar promptun cagirilmasi.
  else {
    alert("Şifre yanlış");
    return higherAmountTransaction(passwordAttemptsLeft - 1);
  }
}

export function transactionFailed() {
  alert("Hesabiniz bloke oldu.");
  location.reload();
}

export function transactionCompleted() {
  alert("İşlem başarılı.");
  location.reload();
}
