//確認是否刪除
function confirmDelete() {
  const result = confirm("確定下架?")
  if (result) {
    return true
  } else {
    return false
  }
}

//表單按鈕事件
const editFormSubmitButton = document.querySelector('.editSubmit')
editFormSubmitButton.addEventListener('click', function submitButton(event) {
  form.classList.add('was-validated')
})

const form = document.querySelector('.editForm')
form.addEventListener('submit', function onFormEvent(event) {
  if (!form.checkValidity()) {
    event.stopPropagation()
    event.preventDefault()
    alert("請確認是否有空欄位!!")
  }
})
