import FormTimer from "../components/FormTimer";
import SelectOptions from "../components/SelectOptions";
import swal from "sweetalert";
import backgroundData from "../data/background-data";

//Form elemanindaki inputlara on change eventinin eklenmesi
//Inputlara keyup eventi de eklendi: her tus girisinin kontrol edilmesi isteniyor.
export function inputEventCreator(containerForm, eventFunction) {
  containerForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", eventFunction);
    input.addEventListener("keyup", eventFunction);
  });
}
//Timerin forma eklenmesi.
//Timer saniye ile cagirilir (dk*60)
export function timerCreator(containerForm, timeLimit) {
  const timerElement = FormTimer(timeLimit);
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

//Sayfa load durumunda input iceriginin silinmesi.
export function clearInputValues(inputList) {
  inputList.forEach((element) => {
    element.value = "";
  });
}

//Gonderilecek miktarin 500 birimden fazla olmasinin kontrolu
//Sifre girebilme hakkiyla beraber yanlis sifre durumunda tekrar cagirilma.
//Sweetalert eklendi.
export function higherAmountTransaction(
  passwordAttemptsLeft,
  passwordSent = "1234"
) {
  if (passwordAttemptsLeft === 0) {
    return transactionFailed();
  }
  //Sweetalert ile prompt yonetimi
  swal({
    title: "Güvenlik Kontrolü",
    text: `Telefonunuza gelen şifreyi giriniz. ${passwordAttemptsLeft} hakkınız kaldı.`,
    content: "input",
    button: "Gönder",
    icon: "info",
  }).then((password) => {
    //Sifre parametresinin kontrolu
    if (password === passwordSent) {
      return transactionCompleted();
    } else {
      swal({
        icon: "error",
        title: "Şifre yanlış",
      }).then(() => {
        //Yanlis sifre durumunda tekrar cagirilma
        return higherAmountTransaction(passwordAttemptsLeft - 1, passwordSent);
      });
    }
  });
}

//Gonderim isleminin basarisiz olmasi durumu
export function transactionFailed() {
  swal({ icon: "error", title: "Hesabiniz bloke oldu." }).then(() => {
    location.reload();
  });
}

//Gonderim isleminin basarili olmasi durumu
export function transactionCompleted() {
  swal({ icon: "success", title: "İşlem başarılı" }).then(() => {
    location.reload();
  });
}

//Gereksiz kisim
//Deneme amacli yapildi.
//Rastgele tema her load durumunda
export function getRandomTheme() {
  const randomIndex = Math.floor(Math.random() * 4);
  const randomTheme = backgroundData[randomIndex];
  let logoContainer = document.querySelector(".logo");

  document.body.style.backgroundImage = randomTheme.backgroundColor;
  logoContainer.querySelector("img").setAttribute("src", `${randomTheme.img}`);
  logoContainer.querySelector("h2").textContent = `${randomTheme.text}Bank`;

  document.querySelectorAll(".form__input").forEach((element) => {
    console.log(element);
    element.style.backgroundColor = randomTheme.inputColor;
  });
  console.log(document.querySelector("button"));
  document.querySelector("button").style.backgroundColor = randomTheme.btnColor;
  document.title = `${randomTheme.text}Bank EFT`;
}
