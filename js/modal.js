const listWrapper = document.getElementById('list-wrapper');
const modal = document.getElementById('modal');
const btnModalClose = document.getElementById('modal-close');
const items = document.querySelectorAll('li');


async function showModal(e) {
  e.preventDefault();

  if (e.target.localName !== 'span') {
    return;
  }

  let id = e.target.getAttribute('data-id');

  if (!id) {
    const div = document.createElement('div');
    div.innerHTML = '<h1>Ошибка! Data-id не задан.</h1>';
    modal.prepend(div);
    modal.classList.add('modal--show');

    return;
  }

  try {
    const response = await fetch(`/confluence/${id}`);
    const res = await response.json();
    console.log('...',response)
    if (res.error) {
      const div = document.createElement('div');
      div.innerHTML = res.error;
      // modal.classList.add('modal--show');
      modal.prepend(div);
      modal.classList.add('modal--show');

      return;
    }

    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const bodyWithTargetBlank = res.body.replaceAll(
      'href',
      'target="_blank" href'
    );

    h1.className = 'modal__title';
    h1.innerText = res.title;
    div.innerHTML = bodyWithTargetBlank;

    div.prepend(h1);

    modal.prepend(div);
  } catch (e) {
    console.error('Error: ', e);
  }

  modal.classList.add('modal--show');
}

function closeModal(event) {
  if (event.key && event.key !== 'Escape') {
    return;
  }

  if (modal.children.length > 1) {
    modal.children[0].remove();
  }

  modal.classList.remove('modal--show');
}

listWrapper.addEventListener('click', showModal);
document.addEventListener('keydown', closeModal);
btnModalClose.addEventListener('click', closeModal);

