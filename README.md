<p align="center"> 
  <img src="raslogo.png" width="200px"></img>
</p>

RAS ou Regulador Automático de Som é um projeto desenvolvido em JavaScript, ao qual utiliza máquinas de vetores de suporte ou suport vector machines para classificar um conjunto de volumes de áudio, com a finalidade de automatizar o processo de controle de volume de uma plataforma.

## Requisitos Opcionais

1. Baixar última versão da svmjs
 - [Baixar](https://github.com/karpathy/svmjs)

2. Baixar última versão da Chartjs
 - [Baixar](https://github.com/chartjs/Chart.js/releases)

Obs.: caso baixe a versão do projeto git da svmjs, vá na pasta ```lib``` do projeto da svmjs, e copie e cole o arquivo ```svm.js``` na pasta ```bib``` do projeto baixado, para a Chartjs faça a mesma coisa copie e cole o arquivo ```Chart.js``` baixado na pasta ```bib```.

## Uso

A maneira simples de se utilizar a biblioteca, é desta forma

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>

<audio src="./audios/sampleaudio.mp3" id="audio_id"></audio> //um audio qualquer, para video também funciona

<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar

var audio = document.getElementById('audio_id');
var cvol = audio.volume;

var ras = new RAS(volim, limmin, limmax);
ras.train();
audio.volume = ras.ControlVol(cvol);

</script>
```

Neste caso ele fará o treinamento através do método ```train()```, e ```ControlVol()``` irá classificar o volume de áudio html que definimos pela tag ```audio```(poderia ser uma tag ```vídeo``` também), e com isso retornará o volume mais adequado, com base nos limites definidos pelo intervalo e o limiar de volume.

No caso podemos utilizar um fator percentual também

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>

<audio src="./audio/sampleaudio.mp3" id="audio_id"></audio> //um audio qualquer, para vídeo também funciona

<script>
var volim = 25; //valor limite de volume
factor = 0.4; // fator de determinação do intervalo

var audio = document.getElementById('audio_id');
var cvol = audio.volume;

var ras = RAS.withfactor(volim, factor);
ras.train();
audio.volume = ras.ControlVol(cvol);

</script>
```
Neste ele irá utilizar uma margem percentual, no exemplo mostrado acima, foi utilizado um percentual de 0.4, logo o intervalo ficará entre [15,35], 15 está 40% abaixo de 25 e 35 está 40% acima de 25.

Também podemos regular o tamanho total de dados a serem gerados de treino e teste

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>

<audio src="./audios/sampleaudio.mp3" id="audio_id"></audio> //um audio qualquer, para video também funciona

<script>
var volim = 25; //valor limite do volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste

var audio = document.getElementById('audio_id');
var cvol = audio.volume;

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train();
audio.volume = ras.ControlVol(cvol);

</script>
```

## Verificando Acurácia das Classificações

Podemos testar nossa classificação da seguinte maneira

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>
<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train();
ras.test();

</script>
```

os resultados neste caso estarão no log do seu navegador, você pode acessá-lo caso esteja utilizando o google chrome com o botão esquerdo e clicando em ```inspecionar``` ou utilizando o comando ```Ctrl+Shift+I```, assim como pode ser visto abaixo.

![](rastut.gif)

É possível utilizar validação cruzada para melhorar a classificação

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>
<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste
var cross = 20 // iterações para a validação cruzada

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train(PATTERNOP,cross);
ras.test();

</script>
```
Neste caso ```PATTERNOP``` é uma constante de opções padrão para classificação da svm, e ```cross``` corresponde ao número de iterações para a validação cruzada, a qual selecionará dentre vários modelos svms o melhor modelo candidato a melhor classificação para o treinamento, e assim fará o teste no final. 

## Modo Debug

Você também pode verificar o percentual de erro e acerto de cada modelo treinado utilizando o modo debug

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>
<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste
var cross = 20 // iterações para a validação cruzada

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train(PATTERNOP,cross,debug=true);

</script>
```
Para consultar os resultados aperte ```Ctrl+Shift+I``` caso esteja utilizando o google chrome, ou clique em ```inspecionar``` no seu navegador de internet e avalie os resultados do treinamento.

Também é possível capturar os resultados obtidos caso necessário

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>
<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste
var cross = 20 // iterações para a validação cruzada

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train(PATTERNOP,cross,debug=true);
console.log(ras.acertos);// mostra os resultados da validação cruzada, correspondentes ao acerto no log do seu navegador
console.log(ras.erros);//mostra os resultados dos erros encontrados da validação cruzada de cada modelo treinado, no log do navegador

</script>
```

Neste exemplo ```ras``` conterá dois arrays de valores, no caso um corresponde aos acertos da validação, e o outro correspondente aos erros da validação, respectivamente.

```ControlVol``` também pode ser debugado, utilizando o primeiro exemplo temos

```javascript
// importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>

<audio src="./audios/sampleaudio.mp3" id="audio_id"></audio> //um audio qualquer, para video também funciona

<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste
var cross = 20 // iterações para a validação cruzada

var audio = document.getElementById('audio_id'); //audio
var cvol = audio.volume; // volume do audio

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train(PATTERNOP,cross);//faz o treinamento para a classificação
audio.volume = ras.ControlVol(cvol, debug=true); //classifica o volume de acordo com os parâmetros recebidos e mostra no log do navegador

</script>
```

Aqui neste exemplo utilizei o mesmo método do primeiro exemplo para o controle de volume, no entanto utilizei a validação cruzada para a classificação, no final o resultado da classificação será mostrado no log do navegador.

## Gerando Gráficos

A geração de gráficos é bem simples, no caso usando o exemplo anterior, com a adição de uma tag html ```canvas``` e a biblioteca ```Chart.js```, podemos gerar os gráficos da seguinte forma:

```javascript
// importando bibliotecas
<script src="./bib/Chart.js"></script>
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>

<canvas id="Chart" height="300" width="500"></canvas>

<script>
var volim = 25; //valor limite de volume
var limmax = 45; //intervalo máximo que o ras irá atuar
var limmin = 10; // intervalo mínimo que o ras irá atuar
var total = 40; // valor total de dados
var treino = total*0.75; // treino
var teste = total*0.25; //teste
var cross = 20 // iterações para a validação cruzada

var ras = new RAS(volim, limmin, limmax, treino, teste);
ras.train(PATTERNOP,cross,debug=true);
ras.plot();//gera os gráficos da aplicação

</script>
```

O método ```ras.plot()``` irá mostrar um diagrama na sua página html contendo um gráfico <b>taxas de percentagem x modelo</b>, ao qual as linhas serão mostrados na linha azul os valores correspondentes ao <b>acerto</b> da validação enquanto a linha mais acizentada corresponderá ao <b>erro</b> da validação.

Caso queira imprimir apenas os acertos, podemos fazer simplesmente colocando um parâmetro no método plot, no caso ```ras.plot('acerto')```, irá imprimir os valores de acerto, enquanto ```ras.plot('erro')``` irá imprimir os valores correspondentes aos erros.

## Observações

Dependendo da quantidade de dados utilizados para treino e teste, pode ser que ele se torne ineficiente em sua classificação, o recomendado é que o total de dados seja pelomenos 10 para uma classificação eficiente, no caso você pode configurar sua classificação utilizando uma struct ```var options = {}; ``` da melhor maneira para utilização no ras, com o método ```RAS.train(options);``` caso esteja almejando um desempenho melhor, você pode [ler](https://github.com/karpathy/svmjs) a documentação para saber como configurar a svm do ras, no entanto não é recomendado. 