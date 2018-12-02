<p align="center"> 
  <img src="raslogo.png" width="200px"></img>
</p>

RAS ou Regulador Automático de Som é um projeto desenvolvido em JavaScript, ao qual utiliza máquinas de vetores de suporte ou suport vector machines para classificar um conjunto de volumes de áudio, com a finalidade de automatizar o processo de controle de volume de uma plataforma.

## Requisitos

1. Necessário baixar última versão da svmjs
 - [Baixar](https://github.com/karpathy/svmjs)

Obs.: caso baixe a versão do projeto git, vá na pasta lib, e copie e cole a svmjs na pasta bib do projeto baixado.

## Instruções de Uso

A maneira simples de se utilizar a biblioteca, é desta forma

```javascript
\\ importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>
<script>
var volim = 25;
var limmax = 45; \\intervalo máximo que o ras irá atuar
var limmin = 10; \\ intervalo mínimo que o ras irá atuar

var ras = new RAS(volim, limmin, limmax);
</script>
```

Caso utilize um fator percentual

```javascript
\\ importando bibliotecas
<script src="./bib/svm.js"></script>
<script src="./bib/ras.js"></script>
<script>
var volim = 25;
factor = 0.4; \\ fator de determinação do intervalo

var ras = RAS.withfactor(volim, factor);
</script>
```
Neste ele irá utilizar uma margem percentual, no exemplo mostrado acima, foi utilizado um percentual de 0.4, logo o intervalo ficará entre [15,35], 15 está 40% abaixo de 25 e 35 está 40% acima de 25.