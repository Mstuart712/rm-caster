import { ref, onMounted } from "vue";

export function useValidation() {
  onMounted(() => {
  });

  const numbersOnly = (evt) => {
      evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(charCode);
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();;
      } else {
        return true;
      }
  };

  const defaultNullToZero = (evt) => {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
  };

  return {
    numbersOnly,
    defaultNullToZero
  };
}