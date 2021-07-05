export default function FormTimer(seconds) {
  //Ilk alinan sure
  let firstTime = timerCalculate(seconds);

  //Timer dakika:saniye hesabi
  //Seconds/60 == kalan dakika
  //Seconds%60  == kalan saniye
  function timerCalculate(seconds) {
    let minutesLeft =
      Math.floor(seconds / 60) < 10
        ? `0${Math.floor(seconds / 60)}`
        : Math.floor(seconds / 60);
    let secondsLeft = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

    return { minutesLeft, secondsLeft };
  }

  //Sure sonu
  function timerEnd() {
    alert("Sureniz Doldu! Sayfa Yenileniyor");
    location.reload();
  }

  //Saniyede 1 tik
  function timerTick(timerElement) {
    seconds -= 1;

    //Sure Sonu
    if (seconds === 0) {
      timerEnd();
    }
    let { minutesLeft, secondsLeft } = timerCalculate(seconds);
    timerElement.querySelector(
      `#timerKalan`
    ).textContent = `${minutesLeft}:${secondsLeft}`;
  }

  //Timeri calistir

  //Olusturulan element

  const timerContainer = document.createElement("div");
  timerContainer.classList.add("form__timer");

  timerContainer.innerHTML = `Kalan Süre <span id="timerKalan">${firstTime.minutesLeft}:${firstTime.secondsLeft}
  </span>`;
  setInterval(() => {
    timerTick(timerContainer);
  }, 1000);

  return timerContainer;
}