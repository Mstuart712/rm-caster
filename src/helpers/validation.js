import { ref, onMounted } from "vue";

export function useValidation() {
  onMounted(() => {
  });

  const numbersOnly = (evt) => {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();;
      } else {
        return true;
      }
  };

  const atLeastZeroValidation = (resultObj) => {
    if (resultObj.result === "" || resultObj.result === undefined) {
      resultObj.isValid = false
    } else {
      resultObj.isValid = true
    }
  }

  const zeroValidation = (value, validObj, mod) => {
    console.log("value", value)
    if (value === "" || value === undefined) {
      console.log(validObj)
      validObj[mod] = false
      console.log(validObj)
    } else {
      validObj[mod] = true
    } 
  }

  return {
    numbersOnly,
    atLeastZeroValidation,
    zeroValidation
  };
}