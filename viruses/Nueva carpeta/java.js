const text = document.getElementById("text");
const str = text.innerHTML;
let i = 0;

const typing = () => {
  if (i < str.length) {
    text.innerHTML += str.charAt(i);
    i++;
    setTimeout(typing, 50);
  }
};

typing();