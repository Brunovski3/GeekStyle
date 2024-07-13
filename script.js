const carrinho = []; // Array para armazenar os itens do carrinho

// Seleção de elementos constantes
const elementosProduto = document.querySelectorAll('.produto button'); // Seleciona todos os botões de adicionar ao carrinho
const carrinhoElement = document.querySelector('.carrinho'); // Elemento que exibe o número de itens no carrinho
const itensCarrinhoElement = document.querySelector('.carrinho-lateral .itens'); // Elemento que exibe os itens no carrinho lateral
const carrinhoLateral = document.querySelector('.carrinho-lateral'); // Barra lateral do carrinho
const limparCarrinhoBtn = document.querySelector('.limpar-carrinho'); // Botão para limpar o carrinho
const finalizarCompraBtn = document.querySelector('.finalizar-compra'); // Botão para finalizar a compra

// Adicionar eventos para cada botão de produto
elementosProduto.forEach(button => {
    button.addEventListener('click', () => {
        // Obter informações do produto clicado
        const produtoElement = button.closest('.produto');
        const produtoId = parseInt(produtoElement.dataset.id);
        const produtoNome = produtoElement.dataset.nome;
        const produtoImagem = produtoElement.dataset.imagem;
        const produtoPreco = parseFloat(produtoElement.dataset.preco);
        const produto = { id: produtoId, nome: produtoNome, imagem: produtoImagem, preco: produtoPreco, quantidade: 1 };

        // Verificar se o produto já está no carrinho
        const produtoNoCarrinho = carrinho.find(item => item.id === produtoId);

        if (produtoNoCarrinho) {
            // Se já existe, incrementa a quantidade
            produtoNoCarrinho.quantidade++;
        } else {
            // Caso contrário, adiciona o produto ao carrinho
            carrinho.push(produto);
        }

        // Atualiza a exibição do carrinho
        atualizarCarrinho();
    });
});

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    console.log('Atualizando o carrinho'); // Log para verificar se a função está sendo chamada
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0); // Calcula o número total de itens no carrinho
    const totalPreco = carrinho.reduce((acc, item) => acc + item.quantidade * item.preco, 0); // Calcula o preço total dos itens no carrinho
    carrinhoElement.textContent = `Carrinho (${totalItens})`; // Atualiza o texto do elemento do carrinho

    itensCarrinhoElement.innerHTML = ''; // Limpa a lista de itens no carrinho
    carrinho.forEach(item => {
        // Para cada item no carrinho, cria um elemento HTML para exibição
        const itemElement = document.createElement('div');
        itemElement.classList.add('item-carrinho');
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <span>${item.nome} (Quantidade: ${item.quantidade}) - R$ ${(item.quantidade * item.preco).toFixed(2)}</span>
        `;
        itensCarrinhoElement.appendChild(itemElement); // Adiciona o elemento do item ao carrinho
    });

    // Abre a barra lateral do carrinho se houver itens no carrinho
    if (totalItens > 0) {
        carrinhoLateral.classList.add('open');
    } else {
        carrinhoLateral.classList.remove('open');
    }

    // Cria e adiciona o elemento de total ao carrinho
    const totalCarrinhoElement = document.createElement('div');
    totalCarrinhoElement.classList.add('total');
    totalCarrinhoElement.textContent = `Total: R$ ${totalPreco.toFixed(2)}`;
    itensCarrinhoElement.appendChild(totalCarrinhoElement);
}

// Adiciona funcionalidade de pesquisa
document.getElementById('search-bar').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase(); // Obtém o valor da barra de busca em minúsculas
    const products = document.querySelectorAll('.produto'); // Seleciona todos os produtos

    products.forEach(product => {
        const productName = product.getAttribute('data-nome').toLowerCase(); // Obtém o nome do produto em minúsculas
        if (productName.includes(searchQuery)) {
            product.style.display = ''; // Exibe o produto se o nome corresponder à busca
        } else {
            product.style.display = 'none'; // Oculta o produto se não corresponder à busca
        }
    });
});

// Adiciona funcionalidade para limpar o carrinho
limparCarrinhoBtn.addEventListener('click', () => {
    console.log('Botão limpar carrinho clicado'); // Log para verificar se o evento está sendo capturado
    carrinho.length = 0; // Limpa o array do carrinho
    atualizarCarrinho(); // Atualiza para limpar a exibição
});

// Adiciona funcionalidade para finalizar a compra
finalizarCompraBtn.addEventListener('click', () => {
    alert('Finalizando a compra...'); // Exemplo de ação ao finalizar a compra
    // Lógica adicional para finalizar a compra, como redirecionar para uma página de checkout, pode ser adicionada aqui.
});
