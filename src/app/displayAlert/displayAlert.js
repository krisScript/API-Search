const displayAlert = alertMsg => {
  const body = document.body;
  const alert = document.createElement('p');
  (alert.className = 'alert'), (alert.textContent = alertMsg);
  if (body.firstElementChild.className === 'alert') {
  } else {
    body.insertBefore(alert, body.childNodes[0]);
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
};
export default displayAlert;
