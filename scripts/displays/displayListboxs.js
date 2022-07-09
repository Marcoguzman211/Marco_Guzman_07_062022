export const toggleListBox = ($listboxList, $chevron) => {
  if ($listboxList.classList.contains("hidden")) {
    $listboxList.classList.remove("hidden");
    $listboxList.classList.add("show");
    $chevron.classList.add("fa-chevron-up"); 
    $chevron.classList.remove("fa-chevron-down"); 
  } else {
    $listboxList.classList.add("hidden");
    $listboxList.classList.remove("show");
    $chevron.classList.remove("fa-chevron-up"); 
    $chevron.classList.add("fa-chevron-down"); 
  }
};

export const openOnInputListbox = ($listboxList, $chevron) => {
  $listboxList.classList.remove("hidden");
  $listboxList.classList.add("show");
  $chevron.classList.add("fa-chevron-up"); 
  $chevron.classList.remove("fa-chevron-down"); 
};
