    //Vamos criar uma variavel que sera um array do carrinho de compras, tudo que adicionarmos no nosso carrinho ira ir para este array
        let cart = [];
    //Variavel que vai armazenar qual item foi escolhida, vai ser configurada mais abaixo no codigo
        let modalKey = 0;    
    //Vamos criar uma variavel, que ira armazenar a quantidade de itens que tem no modal 
        let modalQt = 1;   
    
      //Devido usarmos com frequencia o querySelector para selecionar elementos no html, vamos criar uma variavel com uma função que ira retornar o querySelector
      //Dessa forma apenas iremos chamar 'C' e passar o elemento que queremos que ele selecione, que o mesmo ira trazer para nos como argumento do parametro "elemento"
      //Usamos sem {} assim nao precisamos digitar o return dentro da função e diminuimos a quantidade de codigo
         const c = (elemento)=> document.querySelector(elemento); // No c ira retornar apenas o item

      //Vamos criar a mesma ideia para o 'querySelectorAll'
        const cs = (elemento)=> document.querySelectorAll(elemento); // No cs ira retornar um array com os itens que ele encontrou   

     //                                                    LISTAGEM DAS PIZZAS
    //Criamos uma função auxiliar que iremos passar o elemento que queremos selecionar, retornando o mesmo para nos, para diminuir a quantidade de codigo.
pizzaJson.map((item, index)=>{
      // para clonar um item usamos o "cloneNode" com o parametro 'true', porque ele vai pegar não so o proprio item, mas tudo que tem dentro dele.
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
      //preencher as informações em 'pizzaItem' e depois adicionar na tela na seção que criamos para listar as pizza no html (pizza-area).

      //Dentro de pizzaItem, vamos localizar a div .class que vamos inserir as informações do nome da pizza (pizza-item--name)
      //O 'item.name' e o nosso arquivo json com a listagem dos nomes das pizza, entao essas informações serao atribuidas a 'pizzaItem'.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;   
      //Para descrição iremos seguir os mesmos passos que usamos para inserir os nome das pizzas acima, buscando no arquivo Json o 'nó' que tem a descrição do nosso item
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
      //No caso do preço vamos usar o 'template String' devido a formatação do elemento ter R$ e casas decimais, ajustando com '.toFixed(2)' para ter duas casas depois da virgula em todos os itens
     pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; 
      //Para a imagem da pizza, vamos acessar o src="" que tem na nossa div class 'pizza-item-img', e inserir as imagens do nosso arquivo json nesse parametro src
      //como o src é um parametro da tag img, para ja acessarmos usando a ordem com querySelector '.pizza-item--img img'
     pizzaItem.querySelector('.pizza-item--img img').src = item.img
      //Identificar a pizza selecionada que foi para o modal, usaremos o index para identificar qual obejto foi selecionado
      //Iremos atribuir com o nome de "data-key" por que quando colocamos algum atributo com alguma informação usamos esse prefixo "data" que sabemos que possui alguma informação especifica sobre div,item..
      //No segundo parametro vamos colocar o index para que seja atribuido a posição correta seguindo nossa lista json de cada item
    pizzaItem.setAttribute('data-key', index);    
      //Vamos adicionar um evento de clique na nossa tag 'a' no parametro href, para que ele abra o modal do carrinho de compras,quando o usuario clicar nele
      //Primeiro vamos bloquear a ação natural do clique na tag 'a' que é atualizar a tela ".preventDefault()" para que quando clicar nao atualize mais a tela para o usuario      
     pizzaItem.querySelector('a').addEventListener('click', (evento)=>{
        evento.preventDefault();
      //Agora que temos setado com o setAttribute as nossas 'pizzaItem', com a posição de cada uma no indice.Vamos adicionar tambem ao modal, para que ele saiba qual pizza foi selecionada
      //Primeiro pegamos a informação e inseri-la em uma variavel. Começamos com 
      //o '.closest()' ira pegar o elemento mais proximo que no caso queremos o '.pizza-item' que possui o atributo 'data-key'. ele ira sair de dentro da tag 'a' que nos estamos e procurar o elemento mais
      //proximo que tenha '.pizza-item',pode ser dentro da tag ou fora dela(no caso seria fora) por que é a div anterior, uma vez que pegamos este item,vamos pegar o seu atributo que tinhamos setado data-key.
      //Em seguida damos um .getAttribute('data-key') que ira trazer para nos a chave(posição) do item que foi clicado 
      let key = evento.target.closest('.pizza-item').getAttribute('data-key');
      let modalQt = 1; //Para que a quantidade de itens sempre começa com 1 
          modalKey = key  // ira informar qual a pizza foi escolhida e guardar esta informação para usarmos na hora de adicionar ao carrinho

      //Uma vez que que temos acesso da pizza que foi clicada com [key] vamos atribuir ao modal seu nome,descrição.. igual fizemos na pagina home puxando do arquivo Json e expecificando a posição com 'key'
      c('.pizzaBig img').src = pizzaJson[key].img;
      c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
      c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
      c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
      
      //Vamos remover o 'select' das propriedadades do nosso item, e em seguida atribuiremos o tamanho maior para que sempre fique selecionado quando o usuario clicar na pizza desejada
      c('.pizzaInfo--size.selected').classList.remove('selected');
      
      //Como o pizza-info size possui 3 itens, vamos usar a função do querySelectorAll que fizemos 'cs'. E usaremos o forEach() que para cada um dos itens ele vai rodar uma função
      cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
      //para que sempre fique selecionado o tamanho da pizza 'grande' vamos criar uma condição que atribua select ao size de maior indice(que seria o size 2 dentro do array sizes que possui 3 index )  
        if(sizeIndex == 2) {
            size.classList.add('selected');
        }

          //o parametro size vai ser selecionado com a tag 'span' que possuimos no HTML que seria o item. Para inserir as informaçoes do tamanho da pizza, vamos usar sua posição com [key] e preencher o 
          //sizeIndex
          size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
      });
        /* */
       //Para que a quantidade de itens sempre começa com 1 
      c('.pizzaInfo--qt').innerHTML = modalQt;  

      //Em seguida vamos pegar o modal(janela,area) que é a nossa div .class "pizzaWindowArea", que esta com display "none", vamos trocar para 'flex' para que ele apareça quando o usuario clicar
      c('.pizzaWindowArea').style.display = 'flex'
      //Para que aja uma animação na abertura do nosso modal, diferente do padrão vamos combinar o javascript(opacity) com o css(transition) que todas as modificações na propriedade do '.pizzaWindowArea' . 
      //ira demorar 0.5 seg para acontecer. O opacity ira sair do '0' rodar um setTimeout() com 2 milesegundos para ir ate '1' pra dar tempo de uma animação sair do 0 de opacidade e ir pro 1
      c('.pizzaWindowArea').style.opacity = 0;      
      setTimeout(()=>{
      c('.pizzaWindowArea').style.opacity = 1; 
      }, 200); 
      }); 

      //O comando .append() serve para pegar o conteudo que ja tem em 'pizza-area' e vai adicionar mais um conteudo. Se usassemos o 'innerHTML' ele iria SUBSTITUIR o conteudo que temos em pizza-area
      //nao ADICIONAR sem sobrescrever como o '.append'
      //Dentro do append() mandamos como parametro o elemento que queremos adicionar, que no caso e pizza-item que clonamos anteriormente
    c('.pizza-area').append(pizzaItem);
      
    });
        //                                    FIM DA LISTAGEM DAS PIZZAS

    //                                              EVENTOS DE FUNCIONAMENTO DO MODAL
    //Criar uma função de fechamento do modal
    function closeModal(){
    //Vamos tirar a opacidade do modal para zero
        c('.pizzaWindowArea').style.opacity = 0; 
    //Agora vamos dar um prazo de meio segundo "500" com setTimeout, que é o prazo que a propriedade vai demorar para fazer efeito conforme foi //configurado no css(transition) para ae então alterarmos o display para none    
        setTimeout(()=>{
            c('.pizzaWindowArea').style.display = 'none';
        },500);
    };
    //Uma vez que temos a função de fechar o modal, vamos adicionar esta função ao evento de click, buscando primeiro os botoes/divs de cancelar/fechar no HTML
    //Vamos trazer a fução que criamos 'cs' porque é mais de um item
    //ForEach para informar que em cada um deles, irei passar uma função, que no seu parametro ira receber como argumento o proprio item(botao///div) e adicionar um evento de click, que em seguida ira trazer a função que construimos de fechar a "closeModal"
    cs('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((item)=>{
        item.addEventListener('click',closeModal);
    });
    //Vamos alterar a quantidade de itens no nosso modal, pegando os botões <button> que altera as quantidade no HTML, que no caso é o
    //pizzaInfo--qtmenos' e '.pizzaInfo--qtmais'
    c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    //Diferente de aumentar o valor da quantidade que parte do '1' e pode ir para 2,3,4,5...., para diminuir precisamos colocar um limite, se
    // nao ele vai de 1 para 0,-1,-2,-3... vamos entao criar uma condição que nao deixe ficar menor do que 1
    //  Se modalQt for maior que um, ae sim pode diminuir(decrementar) e apos isso atualizar a quantidade e inser no html com o innerHTML
        if(modalQt > 1){
            modalQt--;
            c('.pizzaInfo--qt').innerHTML = modalQt; 
        }        
    });
    //Quando clicar no botao de mais, ele tem que aumentar a variavel modalQT que criamos como parametro '1' pra mais(incrementar)
    c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    //Quando o usuario clicar no botao de mais, ele vai "acessar" o modalQt e incrementar o mesmo com mais '1'
        modalQt++;
    //Agora precisamos atualizar o modal, entao pra isso usamos a linha que usamos anteriormente para que ele "atualize" o incremento no modalQT
        c('.pizzaInfo--qt').innerHTML = modalQt;    
    });
    //Vamos repetir a função que criamos mais acima que seleciona as tags de tamanho
    cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    //Uma vez que temos os itens selecionados, vamos adicionar um evento de click e uma função
        size.addEventListener('click', (item)=>{
    //Quando queremos trocar a seleção de um item por outro, ou seja, quando so podemos ter um item selecionado, primeiro desmarcamos qualquer 
    //item que esteja selecionado, e apos isso marcamos o que queremos selecionar
      c('.pizzaInfo--size.selected').classList.remove('selected');
    //Como todo esse processo ja é um loop que passa em cada um dos itens, vamos usar o proprio 'size', e apos isso adicionar a classe seleção 
        size.classList.add('selected')      
        })    
    });
    //Função para adicionar itens ao carrinho, primeiro pegamos o botão no HTML "pizzaInfo--addButton", e adicionamos evento e uma função
    c('.pizzaInfo--addButton').addEventListener('click', ()=>{
        //precisamos reunir todas as informações que o usuario escolheu  qual a pizza, qual o tamanho selecionado e quantas pizzas são.
        //Vamos pegar o tamanho, no nosso HTML as tag de size tem um data-key como atributo 0,1 e 2. Com isso saberemos qual tamanho foi selecionado
        //Como o size vem como uma string para nos, vamos usar nesse caso o 'parseInt' para transforma-lo em um numero inteiro
        let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
        //Vamos pegar o nosso array cart que criamos no inicio do codigo para adicionar itens ao carrinho, e usar o push() para adicionar propriedades e 
        //transformar nosso array em um objeto com id,tamanho e quantidade
        cart.push({
        //No nosso arquivo pizzaJson vamos pegar a informação que temos na variavel criada anteriormente la em cima 'modalKey' que guarda qual pizza foi
        // selecionada, o size ja pegamos anteriormente, agora so o insermos na array como objeto e a quantidade tambem ja esta na variavel modalQt    
            id: pizzaJson[modalKey].id,
            tamanho: size,
            quantidade: modalQt

        });
    //Apos inserir no carrinho, temos que fechar o modal. Vamos utilizar a função que fizemos anteriormente de fechar o modal a 'closeModal()'
    closeModal();    
    });

