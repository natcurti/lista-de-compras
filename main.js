let listaItens = [];
let itemAEditar;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');
const ulItensComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizaLocalStorage(){
    localStorage.setItem('listaDeItens', JSON.stringify(listaItens));
}

if(listaRecuperada){
    listaItens = JSON.parse(listaRecuperada);
    mostrarItems();
} else {
    listaItens = [];
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    salvarItem();
    mostrarItems();
})

function salvarItem(){
    const comprasItem = itensInput.value;
    const checarItemDuplicado = listaItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

    if(checarItemDuplicado){
        alert('Este item já existe na lista.');
    } else {
        listaItens.push({
            valor: comprasItem,
            checar: false
        });
    }

    itensInput.focus();
    itensInput.value = '';
}

function mostrarItems(){    
    ulItens.innerHTML = "";
    ulItensComprados.innerHTML = "";

    listaItens.forEach((elemento, index) => {
        if(elemento.checar){
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
            `
        } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
            </div>
            <div>
            ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
            `
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaItens[valorDoElemento].checar = evento.target.checked;
            mostrarItems();
        })
    })

    const deletar = document.querySelectorAll('.deletar');
    deletar.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaItens.splice(valorDoElemento, 1);
            mostrarItems();
        })
    })

    const editarItens = document.querySelectorAll(".editar");
    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItems();
        })
    })

    atualizaLocalStorage();

}

function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    //console.log(itemEditado.value);
    listaItens[itemAEditar].valor = itemEditado.value;
    console.log(listaItens);
    itemAEditar = -1;
    mostrarItems();
}
