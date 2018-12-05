function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class plotRAS{
  diagram(modelos,acertos,erros,id='Chart'){
    var canvas = document.getElementById(id);
    var data = {
      labels: modelos,
      datasets: [
          {
              label: "Acertos",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              pointHitRadius: 10,
              data: acertos,
          },
          {
              label: "Erros",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(133,146,146)",
              borderColor: "rgba(178,178,178)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(178,178,178,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(178,178,178,1)",
              pointHoverBorderColor: "rgba(178,178,178,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              pointHitRadius: 10,
              data: erros,
          }
      ]
  };

  var option = {
    showLines: true
  };
  var myLineChart = Chart.Line(canvas,{
    data:data,
    options:option
    });
  }

  diagramError(modelos,erros,id='Chart'){
    var canvas = document.getElementById(id);
    var data = {
      labels: modelos,
      datasets: [
          {
              label: "Erros",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(133,146,146)",
              borderColor: "rgba(178,178,178)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(178,178,178,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(178,178,178,1)",
              pointHoverBorderColor: "rgba(178,178,178,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              pointHitRadius: 10,
              data: erros,
          }
      ]
  };

  var option = {
    showLines: true
  };
  var myLineChart = Chart.Line(canvas,{
    data:data,
    options:option
    });
  }

  diagramCorrect(modelos,acertos,id='Chart'){
    var canvas = document.getElementById(id);
    var data = {
      labels: modelos,
      datasets: [
          {
              label: "Acertos",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              pointHitRadius: 10,
              data: acertos,
          }
      ]
  };

  var option = {
    showLines: true
  };
  var myLineChart = Chart.Line(canvas,{
    data:data,
    options:option
    });
  }
};

const PATTERNOP = {kernel: 'rbf', rbfsigma: 1};
const PATTERNTR = 21;
const PATTERNTEST = 9;

class RAS{
	constructor(vol, min, max, train = 21, test = 9, debug=false){
       var datatr = new Array(train);
       var sampletr = Math.round(train/3);
       var k = 0;
       var fit = vol;
       this.min = min;
       this.max = max;

       for(var i = 0;i < sampletr; i++){
         datatr[i] = [fit, getRandomInt(min,max)];
       }

       for(var i=sampletr; i < train ; i++){
       	 if(k = 1){
       	 	datatr[i] = [fit, getRandomInt(max,100)];
       	 	k = 0;
       	 }else{
       	    datatr[i] = [fit, getRandomInt(0,min)];
       	    k = 1;
       	 }
       }

       var datatst = new Array(test);
       var sampletst = Math.round(test/2);
       for(var j = 0;j < sampletst; j++){
         datatst[j] = [fit, getRandomInt(min,max)];
       }

       for(var j=sampletst; j < test ; j++){
       	 if(k = 1){
       	 	datatst[j] = [fit, getRandomInt(max,100)];
       	 	k = 0;
       	 }else{
       	    datatst[j] = [fit, getRandomInt(0,min)];
       	    k = 1;
       	 }
       }

       this.datatrain = datatr;
       this.datatest = datatst;

       if(debug == true){
         console.log("Dados gerados para treinamento:\n");
         console.log(datatr);
         console.log("Dados gerados para teste:\n");
         console.log(datatst);
         console.log("Nível de Volume:"+fit+"\n");
       }

       var tam = this.datatrain.length;
	     var labels = new Array(tam);
     
       for(var i=0;i<tam;i++){
        if((datatr[i][1] >= min)&&(datatr[i][1] <= max)){
            labels[i] = 1;
         }else{
            labels[i] = -1;
         }
       }

       this.labels = labels;
       this.fit = fit;
	}

  datasetting(dtrain,dtest,vol,min,max,debug=false){
       var k = 0;
       var fit = vol;
       this.min = min;
       this.max = max;

       this.datatrain = dtrain;
       this.datatest = dtest;

       var tam = this.datatrain.length;
       var labels = new Array(tam);
     
       for(var i=0;i<tam;i++){
        if((datatr[i][1] >= min)&&(datatr[i][1] <= max)){
            labels[i] = 1;
         }else{
            labels[i] = -1;
         }
       }

       if(debug == true){
         console.log("Dados gerados para treinamento:\n");
         console.log(datatr);
         console.log("Dados gerados para teste:\n");
         console.log(datatst);
         console.log("Nível de Volume:"+fit+"\n");
       }

       this.labels = labels;
       this.fit = fit;
       return this;
  }

  sortnewdata(){
       var train = this.datatrain.length;
       var test = this.datatest.length;
       var datatr = new Array(train);
       var sampletr = Math.round(train/3);
       var k = 0;
       var fit = this.fit;
       var min = this.min;
       var max = this.max;

       for(var i = 0;i < sampletr; i++){
         datatr[i] = [fit, getRandomInt(min,max)];
       }

       for(var i=sampletr; i < train ; i++){
         if(k = 1){
          datatr[i] = [fit, getRandomInt(max,100)];
          k = 0;
         }else{
            datatr[i] = [fit, getRandomInt(0,min)];
            k = 1;
         }
       }

       this.datatrain = datatr;
       
       var tam = this.datatrain.length;
       var labels = new Array(tam);
     
       for(var i=0;i<tam;i++){
        if((datatr[i][1] >= min)&&(datatr[i][1] <= max)){
            labels[i] = 1;
         }else{
            labels[i] = -1;
         }
       }

       this.labels = labels;
       this.fit = fit;
  }

	withfactor(vol, factor=0.4, train = 21, test = 9,debug=false){
      var max = (1 + factor)*vol;
      var min = (1 - factor)*vol;
      var k = 0;
      var fit = vol;
      this.min = min;
      this.max = max;

       for(var i = 0;i < sampletr; i++){
         datatr[i] = [fit, getRandomInt(min,max)];
       }

       for(var i=sampletr; i < train ; i++){
         if(k = 1){
          datatr[i] = [fit, getRandomInt(max,100)];
          k = 0;
         }else{
            datatr[i] = [fit, getRandomInt(0,min)];
            k = 1;
         }
       }

       var datatst = new Array(test);
       var sampletst = Math.round(test/2);
       for(var j = 0;j < sampletst; j++){
         datatst[j] = [fit, getRandomInt(min,max)];
       }

       for(var j=sampletst; j < test ; j++){
         if(k = 1){
          datatst[j] = [fit, getRandomInt(max,100)];
          k = 0;
         }else{
            datatst[j] = [fit, getRandomInt(0,min)];
            k = 1;
         }
       }

       this.datatrain = datatr;
       this.datatest = datatst;

       if(debug == true){
         console.log("Dados gerados para treinamento:\n");
         console.log(datatr);
         console.log("Dados gerados para teste:\n");
         console.log(datatst);
         console.log("Nível de Volume:"+fit+"\n");
       }

       var tam = this.datatrain.length;
     var labels = new Array(tam);
     
       for(var i=0;i<tam;i++){
        if((datatr[i][1] >= min)&&(datatr[i][1] <= max)){
            labels[i] = 1;
         }else{
            labels[i] = -1;
         }
       }

       this.labels = labels;
       this.fit = fit;
       return this;
	 }

	train(options={kernel: 'rbf', rbfsigma: 1},cross=1,debug=false){
		if(cross == 1){
      var svm = new svmjs.SVM();
		  svm.train(this.datatrain, this.labels, options);
    }else{
      var best = 1.0;
      var bestsvm;
      if(debug == true){
        var erros = new Array(cross);
        var acertos = new Array(cross);
      }
      for(var i=0;i<cross;i++){
        var svm = new svmjs.SVM();
        this.sortnewdata();
        svm.train(this.datatrain, this.labels, options);
        var value = this.test(svm,debug=true);
        if(debug == true){
          console.log("Modelo "+i+"\n taxa de acerto: "+value[0]+"\n taxa de erro: "+value[1]);
          acertos[i] = value[0];
          erros[i] = value[1];
        }
        if(value[1] < best){
          bestsvm = svm;
          best = value[1];
        }
      }
      svm = bestsvm;
      if(debug == true){
        this.acertos = acertos;
        this.erros = erros;
      }
    }
      this.svmk = svm;
	}

	test(svm = this.svmk, debug=false){
     var tam = this.datatest.length;
		 var validlabels = new Array(tam);
     var datatest = this.datatest;
     var min = this.min;
     var max = this.max;

     for(var i=0;i<tam;i++){
      if((datatest[i][1] >= min) && (datatest[i][1] <= max) ){
        validlabels[i] = 1;
      }else{
        validlabels[i] = -1;
      }
    }

    var testlabels = svm.predict(datatest);
    var correctl = 0;
    var errorl = 0;
    for(var i=0;i<tam;i++){
      if(testlabels[i] == validlabels[i]){
        correctl+=1;
      }else{
        errorl+=1;
      }
    }

    var v1 = correctl/tam;
    var v2 = errorl/tam;
    if(debug != true){
      console.log("acerto: "+v1+" erro: "+v2);
    }
    return [v1,v2];
	}

  plot(value='default', id='Chart'){
    var graph = new plotRAS();
    if(value == 'default'){
      if((this.acertos != null)&&(this.erros != null)){
        var rsize = new Array(this.acertos.length);
        for(var i=0;i<rsize.length;i++){
          rsize[i] = i+1;
        }
        graph.diagram(rsize,this.acertos,this.erros,id);
      }
    }else if(value == 'acerto'){
      if(this.acertos != null){  
        var rsize = new Array(this.acertos.length);
        for(var i=0;i<rsize.length;i++){
          rsize[i] = i+1;
        }
        graph.diagramCorrect(rsize,this.acertos,id);
      }
    }else if(value == 'erro'){
      if(this.erros != null){  
        var rsize = new Array(this.erros.length);
        for(var i=0;i<rsize.length;i++){
          rsize[i] = i+1;
        }
        graph.diagramError(rsize,this.erros,id);
      }
    }
  };

	ControlVol(vol,debug=false){
	  var svm = this.svmk;
	  var min = this.min;
	  var max = this.max;

      var fit = this.fit;

      if(svm != null){
        var value = svm.marginOne([fit,vol]);
        if((value < (min/100))||(value > (max/100))){
           aux = 0;
        if(value > 0){
          aux = min/100;
        }else{
          aux = max/100;
         }
         if(debug==true){
           console.log("nível de volume adequado:"+aux);
         }
         return aux;
        }
        if(debug == true){
          console.log("nível de volume adequado:"+value);
        }
        return value;
     }
     return 0;
	}

	ControlVolwithstream(audio=document.getElementById('audio_id'),debug=false){
    var svm = this.svmk;
	  var min = this.min;
	  var max = this.max;

      var fit = this.fit;
      
      if (svm != null){
        var value = svm.marginOne([fit,audio.volume]);
         if((value < (min/100))||(value > (max/100))){
           aux = 0;
          if(value > 0){
            aux = min/100;
          }else{
            aux = max/100;
          }
          if(debug==true){
            console.log("nível de volume adequado:"+aux);
          }
          audio.volume = aux;
        }else{
          if(debug == true){
            console.log("nível de volume adequado:"+value);
          }
          audio.volume = value;
        }
      } 
	}
};