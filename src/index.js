const divCard= document.querySelector("#card")
const url = "http://localhost:3000/cinema/";


const cardFilme = ({id ,titulo, genero, duracao, sinopse, preco, foto}) => {
  const html = `
  <div class="col-4">
      <div class="d-flex justify-content-center align-items-center">
      <h1 style="display: none"> ${id} </h1>
      <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-warning" style="margin-bottom: 10px;">Editar</button>
      </div>
      <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-danger" id='btn' style="margin-left: 20px; margin-bottom: 10px;">Remover</button>
      </div>
    </div>
    <div class="card mb-4 shadow-lg">
    <img class="card-img-top" src="../${foto}" style="height: 450px" alt="Card image cap">
    <div class="card-body" style="height: 400px; display: flex; justify-content: space-between; flex-direction: column">
      <h2>${titulo}</h2>
      <p class="card-text">${sinopse}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">Gênero: ${genero}</small>
        <small class="text-muted">Duração: ${duracao} min</small>
        <small class="text-muted">Preço R$: ${preco}</small>
      </div>
    </div>
  </div>
  `      
  divCard.innerHTML += html;
}

window.addEventListener("load", async () => {
  const response = await fetch(url, {
    method: "GET",
  });

  const filmes = await response.json();

  if (response.status == 200) {
    for (const filme of filmes) {
      cardFilme(filme)
    }
  } else {
    alert(`Erro: ${filmes.msg}`);
  }
});

// adiciona um "ouvinte" de evento para o click na tabela
divCard.addEventListener("click", async (e) =>{
  e.preventDefault()

  const btn = e.target.innerText;

  if (btn == 'REMOVER') {
    const id = e.target.parentElement.parentElement.children[0].innerText;
    if(confirm(`Excluir Filme?`)){
      const response = await fetch(url + id, {
        method: "delete",
      })

    }    location.reload()
  } else if (btn == 'EDITAR'){
    const id = e.target.parentElement.parentElement.children[0].innerText;
    const novoValor = Number(prompt(`Qual o valor do filme?`));
    if (novoValor == 0 || isNaN(novoValor)) {
      alert("Valor Inválido.");
      return;
    }
    const response = await fetch(url + id, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ preco: novoValor }),
    });
    location.reload()
  }
})

