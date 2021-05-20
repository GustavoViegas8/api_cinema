const frm =  document.querySelector(".form");
const divAlert = document.querySelector(".alert");

frm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const url = "http://localhost:3000/cinema";
    
    const formData = new FormData();

    formData.append("titulo", frm.titulo.value);
    formData.append("genero", frm.genero.value);
    formData.append("sinopse", frm.sinopse.value);
    formData.append("preco", frm.preco.value);
    formData.append("duracao", frm.duracao.value);
    formData.append("foto", frm.foto.files[0]);

    const response = await fetch(url, {
        method: "POST",
        body:   formData,
    });

    const dados = await response.json();
  
    if (response.status == 201) {
        divAlert.className = "alert alert-success mt-3";
        divAlert.innerText = `Catalogo Atualizado: ${frm.titulo.value} cadastrado com sucesso.`;
    } else {
        divAlert.className = "alert alert-danger mt-3";
        divAlert.innerText = `Erro: ${dados.msg}`;
    }
    frm.reset();
    frm.titulo.focus();
})

frm.titulo.addEventListener("blur", () =>{
    divAlert.className = "alert",
    divAlert.innerText = "";
});
