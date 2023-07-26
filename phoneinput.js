document.addEventListener("DOMContentLoaded", function () {
  const inputDOM = document.querySelector("input[data-tel-input]");
  const btn = document.querySelector("#btn");
  const regex =
    /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\s?\d{2}$|^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2}$/i;

  btn.disabled = true;

  const isValidCarNumber = (inputValue) => {
    let formattedValue = "";

    switch (true) {
      case inputValue.length == 1:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]/i.test(formattedValue);
      case inputValue.length == 2:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{1}/i.test(formattedValue);
      case inputValue.length == 3:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{2}/i.test(formattedValue);
      case inputValue.length == 4:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{3}/i.test(formattedValue);
      case inputValue.length == 5:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]/i.test(formattedValue);
      case inputValue.length == 6:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}/i.test(formattedValue);
      case inputValue.length == 7:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\s?$|^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d$/i.test(
          formattedValue
        );
      case inputValue.length == 8:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\s?\d$|^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2}$/i.test(
          formattedValue
        );
      case inputValue.length == 9:
        formattedValue = inputValue.toUpperCase();
        return /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\s?\d{2}$|^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2}$/.test(
          formattedValue
        );
    }

    return regex.test(formattedValue);
  };

  const onInputChange = (e) => {
    const input = e.target;
    const currentValue = input.value;
    input.className = "";

    input.value = currentValue.toUpperCase();

    if (!isValidCarNumber(currentValue)) {
      const lastValidValue = currentValue.slice(0, -1);
      input.value = lastValidValue.toUpperCase();
    }

    if (!regex.test(currentValue)) btn.disabled = true;
    if (regex.test(currentValue)) btn.disabled = false;

    if (regex.test(input.value)) input.classList.add("success");
    if (!regex.test(input.value)) input.classList.add("error");
  };

  const onInputClick = async () => {
    try {
      const input = inputDOM.target;

      if (regex.test(input.value)) {
        await fetch("123", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carNumber: input.value }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  inputDOM.addEventListener("input", onInputChange);
  btn.addEventListener("click", onInputClick);
});
