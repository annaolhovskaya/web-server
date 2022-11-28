document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }

  if (event.target.dataset.type === 'update') {
    const newTitle = prompt('Введите новое название');
    const id = event.target.dataset.id;
    update(id, newTitle);
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function update(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title }),
  });
}
