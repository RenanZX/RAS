function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PATTERNOP = {kernel: 'rbf', rbfsigma: 1};

class RAS{
	constructor(vol, min, max, train = 21, test = 9){
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

	withfactor(vol, factor=0.4, train = 21, test = 9){
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
		if(cross=1){
      var svm = new svmjs.SVM();
		  svm.train(this.datatrain, this.labels, options);
    }else{
      var best = 1.0;
      for(var i=0;i<cross;i++){
        var svm = new svmjs.SVM();
        svm.train(this.datatrain, this.labels, options);
        var value = this.test(svm);
        if(debug == true){
          console.log("Modelo "+i+"taxa de acerto"+value[0]+" taxa de erro: "+value[1]);
        }
        if(value[1] < best){
          bestsvm = svm;
          best = value[1];
        }
      }
      svm = bestsvm;
    }
      this.svmk = svm;
	}

	test(svm = this.svmk){
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

    console.log("acerto: "+v1+" erro: "+v2);
    return [v1,v2];
	}

	ControlVol(vol){
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
         return aux;
        }
        return value;
     }
     return 0;
	}

	ControlVolwithstream(vol,audio=document.getElementById('audio_id')){
    var svm = this.svmk;
	  var min = this.min;
	  var max = this.max;

      var fit = this.fit;
      
      if (svm != null){
        var value = svm.marginOne([fit,vol]);
         if((value < (min/100))||(value > (max/100))){
           aux = 0;
          if(value > 0){
            aux = min/100;
          }else{
            aux = max/100;
          }
          audio.volume = aux;
        }else{
          audio.volume = value;
        }
      } 
	}
};