/* 
document.getElementById("holahola").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("hidden");
}) */

const toggleListBox = ($listboxList, $chevron ) => {
    if ($listboxList.classList.contains('hidden')) {
        $listboxList.classList.remove('hidden')
        $listboxList.classList.add('show')
        $chevron.classList.add('fa-chevron-up') 
        $chevron.classList.remove('fa-chevron-down') 
      } else {
        $listboxList.classList.add('hidden')
        $listboxList.classList.remove('show')
        $chevron.classList.remove('fa-chevron-up') 
        $chevron.classList.add('fa-chevron-down') 
      }
}

const openOnInputListbox = ($listboxList, $chevron) => {
    $listboxList.classList.remove('hidden')
    $listboxList.classList.add('show')
    $chevron.classList.add('fa-chevron-up') 
    $chevron.classList.remove('fa-chevron-down') 
  }

// Listboxs opening with chevron event 
document.querySelectorAll('.listbox-controls .chevron').forEach(element => {
    element.addEventListener('click', () => {
      const parentElement = element.closest('.listbox'); 
      const listboxList = parentElement.querySelector('.listbox-list');
      const chevron = parentElement.querySelector('.chevron');
      toggleListBox(listboxList, chevron);
    });
  });

  // Listboxs opening on input event
document.querySelectorAll('.listbox-input').forEach(element => {
    element.addEventListener('click', () => {
      const parentElement = element.closest('.listbox'); 
      const listboxList = parentElement.querySelector('.listbox-list');
      const chevron = parentElement.querySelector('.chevron');
      openOnInputListbox(listboxList, chevron)
    })
  })