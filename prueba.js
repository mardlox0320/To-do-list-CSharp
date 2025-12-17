const BASE_URL = 'http://localhost:5138'
const nomeInput = document.getElementById('nome')
const lista = document.getElementById('lista')

document.addEventListener('keydown', function(event) {
   if ( event.key === 'Enter') {
       criar() 
   }
});
async function carregarLista() {
  lista.innerHTML = ''

  const response = await fetch(`${BASE_URL}/`)
  const data = await response.json()

  data.classes.forEach(item => {
    lista.innerHTML += `
      <li>
        ${item.tarefa}
        <button onclick="deletar('${item.id}')">Deletar</button>
        <button onclick="atualizar('${item.id}', prompt('Nova tarefa:'))">Atualizar</button>
      </li>
    `
  })
}

async function criar() {
  const tarefa = nomeInput.value.trim()
  if (!tarefa) return

  await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tarefa })
  })

  nomeInput.value = ''
  await carregarLista() 
}

async function deletar(id) {
  await fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE'
  })

  await carregarLista() 
}
async function atualizar(id, novaTarefa) {
  await fetch(`${BASE_URL}/edit/${id}`, {
    method: 'PUT', 
    body: JSON.stringify({ tarefa: novaTarefa }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  window.location.reload()
}

carregarLista()
