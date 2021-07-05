function formGroupCreator(groupElement) {
  const formGroup = document.createElement("div");
  formGroup.classList.add("form__group");
  formGroup.innerHTML = groupElement;
  return formGroup;
}

//Input olusturucu
//formData dan gelen veriye gore dropdown veya input(tipine gore)
export function FormInput(
  { type = "text", id, label = "", name = "" },
  onchangeFunc = ""
) {
  const inputElement = `<label for="${id}" class="form__label">${label}</label><input type="${type}"  id="${id}" name="${name}" value="" placeholder="Deger girin" class="form__input" required/>`;
  const inputGroup = formGroupCreator(inputElement);

  //Input Number ise min=0 ekle
  if (type === "number") {
    inputGroup.querySelector(`#${id}`).setAttribute("min", "0");
  }

  if (onchangeFunc) {
    inputGroup.querySelector(`#${id}`).addEventListener("keyup", onchangeFunc);
    inputGroup.querySelector(`#${id}`).addEventListener("change", onchangeFunc);
  }

  return inputGroup;
}

//Button Olusturucu
//formData icinden aliniyor.
export function FormButton({ text, id }) {
  const buttonElement = `<button disabled id="${id}" type="submit" class="form__btn">${text.disabled}</button>`;
  return formGroupCreator(buttonElement);
}

export function FormSelect(
  { id, label = "", name = "", selectOptions = [] },
  onchangeFunc = ""
) {
  //Select inputu icin option elementi olusturma.
  //formData icinden aliniyor.
  function optionCreator(optionList) {
    return optionList.reduce((optionHTML, option) => {
      return (optionHTML += `<option value="${option.balance}">${option.text}</option>`);
    }, ``);
  }

  const selectElement = ` <label for="${id}" class="form__label">${label}</label>
  <select  id="${id}" name="${name}" class="form__input"> 
    ${optionCreator(selectOptions)}
  </select>`;
  const selectGroup = formGroupCreator(selectElement);

  if (onchangeFunc) {
    selectGroup
      .querySelector(`#${id}`)
      .addEventListener("change", onchangeFunc);
  }

  return selectGroup;
}
