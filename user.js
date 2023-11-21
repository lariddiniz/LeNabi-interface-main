document.addEventListener('DOMContentLoaded', function () {
    renderizarCabecalho();
});

function renderizarCabecalho() {
    const headerLogin = document.getElementById("userHeader");
    const loginButton = document.getElementById("loginButton");
    const nomeUsuarioElement = document.getElementById("nomeUsuario");

    // Obtenha o nome do usuário armazenado no localStorage
    const nomeUsuario = localStorage.getItem('nomeUsuario');

    // Verifica se os elementos existem antes de manipulá-los
    if (headerLogin && loginButton && nomeUsuarioElement) {
        if (nomeUsuario) {
            // Usuário logado
            headerLogin.style.display = "block";
            nomeUsuarioElement.textContent = nomeUsuario;  // Exibe o nome do usuário
            loginButton.style.display = "none";
        } else {
            // Usuário não logado
            headerLogin.style.display = "none";
            loginButton.style.display = "block";
        }
    } else {
        console.error("Elemento não encontrado. Verifique os IDs no HTML.");
    }
}

function logout() {
    // Remove o nome do usuário do localStorage
    localStorage.removeItem('nomeUsuario');
    // Limpe outros dados de usuário, se houver
    window.location.href = "index.html";
}


//FAVORITOS
function alternarContador() {
    var contadorElement = document.getElementById("contador-coracao");
    var coracaoVazio = document.getElementById("coracao-vazio");
    var coracaoPintado = document.getElementById("coracao-pintado");

    if (contadorElement && coracaoVazio && coracaoPintado) {
        var valorInicial = parseInt(contadorElement.getAttribute("data-valor-inicial")) || 0;

        if (contadorElement.getAttribute("data-ativo") === "true") {
            valorInicial--;
            contadorElement.textContent = valorInicial;
            contadorElement.setAttribute("data-valor-inicial", valorInicial)
            contadorElement.setAttribute("data-ativo", "false");

            coracaoVazio.style.display = "inline-block";
            coracaoPintado.style.display = "none";
        } else {
            valorInicial++;
            contadorElement.textContent = valorInicial;
            contadorElement.setAttribute("data-valor-inicial", valorInicial)
            contadorElement.setAttribute("data-ativo", "true");

            coracaoVazio.style.display = "none";
            coracaoPintado.style.display = "inline-block";
        }
    }
}

const itensCarrinho = {};

function addCarrinho(itemNome, itemPreco) {
    const listaItens = document.getElementById("itens-lista");

    // Verifica se o item já está no carrinho
    if (itensCarrinho[itemNome]) {
        // Remove o item do carrinho
        listaItens.removeChild(itensCarrinho[itemNome].liItem);
        delete itensCarrinho[itemNome];
    } else {
        // Cria um novo elemento li para representar o item no carrinho
        const liItem = document.createElement("li");
        liItem.innerHTML = `
<div class="item">
    <span>${itemNome}</span>
    <button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})">-</button>
    <span class="quantity">1</span>
    <button class="add" onclick="addMaisUm('${itemNome}', ${itemPreco})">+</button>
    <span class="preco-total">R$${itemPreco.toFixed(2)}</span>
</div>  
`;

        // Adiciona o novo item à lista
        listaItens.appendChild(liItem);

        // Adiciona o item ao carrinho
        itensCarrinho[itemNome] = {
            quantity: 1,
            precoTotal: itemPreco,
            liItem: liItem
        };
    }

    // Calcula o valor total
    let precoTotal = 0;
    for (let item in itensCarrinho) {
        precoTotal += itensCarrinho[item].precoTotal;
    }

    // Atualiza o valor total
    document.getElementById("preco-total").innerHTML = "Valor Total: R$" + precoTotal.toFixed(2);
    updateCarrinho();
    atualizarLocalStorage();
}

function atualizarLocalStorage() {
    // Converte o objeto 'itensCarrinho' para uma string JSON e armazena no localStorage
    localStorage.setItem('itensCarrinho', JSON.stringify(itensCarrinho));
}

function addMaisUm(itemNome, itemPreco) {
    const listaItens = document.getElementById("itens-lista");

    // Cria um novo elemento li para representar o item no carrinho
    const liItem = document.createElement("li");
    liItem.innerHTML = `
<div class="item">
<span>${itemNome}</span>
<button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})">-</button>
<span class="quantity">1</span>
<button class="add" onclick="addMaisUm('${itemNome}', ${itemPreco})">+</button>
<span class="preco-total">R$${itemPreco.toFixed(2)}</span>
</div>  
`;

    // Adiciona o novo item à lista
    listaItens.appendChild(liItem);

    // Adiciona o item ao carrinho
    if (itensCarrinho[itemNome]) {
        itensCarrinho[itemNome].quantity++;
        itensCarrinho[itemNome].precoTotal += itemPreco;
        itensCarrinho[itemNome].liItem.querySelector(".quantity").innerHTML = itensCarrinho[itemNome].quantity;
        itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2);
    } else {
        itensCarrinho[itemNome] = {
            quantity: 1,
            precoTotal: itemPreco,
            liItem: liItem
        };
    }

    // Calcula o valor total
    let precoTotal = 0;
    for (let item in itensCarrinho) {
        precoTotal += itensCarrinho[item].precoTotal;
    }

    // Atualiza o valor total
    document.getElementById("preco-total").innerHTML = "Valor Total: R$" + precoTotal.toFixed(2);
    updateCarrinho();
}


function addMaisUm(itemNome, itemPreco) {
    const listaItens = document.getElementById("itens-lista");

    // Adiciona o item ao carrinho
    if (itensCarrinho[itemNome]) {
        itensCarrinho[itemNome].quantity++;
        itensCarrinho[itemNome].precoTotal += itemPreco;
        itensCarrinho[itemNome].liItem.querySelector(".quantity").innerHTML = itensCarrinho[itemNome].quantity;
        itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2);
    } else {
        // Cria um novo elemento li para representar o item no carrinho
        const liItem = document.createElement("li");
        liItem.innerHTML = `
<div class="item">
    <span>${itemNome}</span>
    <button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})">-</button>
    <span class="quantity">1</span>
    <button class="add" onclick="addMaisUm('${itemNome}', ${itemPreco})">+</button>
    <span class="preco-total">R$${itemPreco.toFixed(2)}</span>
</div>  
`;

        // Adiciona o novo item à lista
        listaItens.appendChild(liItem);

        // Adiciona o item ao carrinho
        itensCarrinho[itemNome] = {
            quantity: 1,
            precoTotal: itemPreco,
            liItem: liItem
        };
    }

    // Calcula o valor total
    let precoTotal = 0;
    for (let item in itensCarrinho) {
        precoTotal += itensCarrinho[item].precoTotal;
    }

    // Atualiza o valor total
    document.getElementById("preco-total").innerHTML = "Valor Total: R$" + precoTotal.toFixed(2);
    updateCarrinho();
}



function removeCarrinho(itemNome, itemPreco) {
    if (itensCarrinho[itemNome]) {
        if (itensCarrinho[itemNome].quantity > 1) {
            itensCarrinho[itemNome].quantity--;
            itensCarrinho[itemNome].precoTotal -= itemPreco;
            itensCarrinho[itemNome].liItem.querySelector(".quantity").innerHTML = itensCarrinho[itemNome].quantity;
            itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2);
        } else {
            const listaItens = document.getElementById("itens-lista");
            const liItemToRemove = itensCarrinho[itemNome].liItem;
            listaItens.removeChild(liItemToRemove);
            delete itensCarrinho[itemNome];
        }
        updateCarrinho();
    }

    // Calcula o valor total
    let precoTotal = 0;
    for (let item in itensCarrinho) {
        precoTotal += itensCarrinho[item].precoTotal;
    }

    // Atualiza o valor total
    document.getElementById("preco-total").innerHTML = "Valor Total R$" + precoTotal.toFixed(2);
}

function updateCarrinho() {
    let cont = 0;
    for (let item in itensCarrinho) {
        cont += itensCarrinho[item].quantity;
    }
    document.getElementById("cont-favoritos").innerHTML = cont;
}

function limparCarrinho() {
    document.getElementById("itens-lista").innerHTML = "";
    document.getElementById("preco-total").innerHTML = "Valor Total: R$0,00";
    for (let itemNome in itensCarrinho) {
        delete itensCarrinho[itemNome];
    }
    updateCarrinho();

    // Chama a função para reverter os corações para o estado vazio
    alternarContador();
}


function toggleFavoritos() {
    const itensCarrinhoDiv = document.getElementById("carrinho-itens");
    if (itensCarrinhoDiv.style.display === "none") {
        itensCarrinhoDiv.style.display = "block";
    } else {
        itensCarrinhoDiv.style.display = "none";
    }
}

function buscarProdutos() {
    const buscarInput = document.getElementById("buscar-input");
    const produto = document.getElementsByClassName("produto");

    for (let i = 0; i < produto.length; i++) {
        const produtoNome = produto[i].querySelector("h3").innerText.toLowerCase();

        if (produtoNome.includes(buscarInput.value.toLowerCase())) {
            produto[i].style.display = "block";
        } else {
            produto[i].style.display = "none";
        }
    }
}









