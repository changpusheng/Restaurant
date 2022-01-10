function confirmDelete() {
  const result = confirm("確定下架?")
  if (result) {
    return true
  } else {
    return false
  }
}