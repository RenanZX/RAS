class RAS{
	#min;
	#max;
	#svmk;

	constructor(vol, min, max, train = 21, test = 9){
       var datatr = new Array(train);
       var sampletr = Math.round(train/3);
       var k = 0;
       var fit = vol;
       this.#min = min;
       this.#max = max;

       for(i = 0;i < sampletr; i++){
         datatr[i] = [fit, (Math.floor(Math.random() * (+max - +min)+ +min))];
       }

       for(i=sampletr; i < train ; i++){
       	 if(k = 1){
       	 	datatr[i] = [fit, (Math.floor(Math.random()*0)+(max-1))];
       	 	k = 0;
       	 }else{
       	    datatr[i] = [fit,(Math.floor(Math.random()*100)+(min+1))];
       	    k = 1;
       	 }
       }

       datatst = new Array(test);
       sampletst = Math.round(test/2);
       for(j = 0;j < sampletst; j++){
         datatst[j] = [fit, (Math.floor(Math.random() * (+max - +min)+ +min))];
       }

       for(j=sampletst; j < test ; i++){
       	 if(k = 1){
       	 	datatst[j] = [fit, (Math.floor(Math.random()*0)+(max-1))];
       	 	k = 0;
       	 }else{
       	    datatst[j] = [fit,(Math.floor(Math.random()*100)+(min+1))];
       	    k = 1;
       	 }
       }

       this.datatrain = datatr;
       this.datatest = datatst;

       tam = this.datatrain.length;
	   label = new Array(tam);
     
       for(i=0;i<tam;i++){
        if((datatr[1] >= min)&&(datatr[1] <= max)){
            label[i] = 1;
         }else{
            label[i] = -1;
         }
       }

       this.labels = label;
       this.fit = fit;
	}

	withfactor(vol, factor=0.4, train = 21, test = 9){
      var max = (1 + factor)*vol;
      var min = (1 - factor)*vol;
      var k = 0;
      var fit = vol;
      this.#min = min;
      this.#max = max;

       for(i = 0;i < sampletr; i++){
         datatr[i] = [fit, (Math.floor(Math.random() * (+max - +min)+ +min))];
       }

       for(i=sampletr; i < train ; i++){
       	 if(k = 1){
       	 	datatr[i] = [fit, (Math.floor(Math.random()*0)+(max-1))];
       	 	k = 0;
       	 }else{
       	    datatr[i] = [fit,(Math.floor(Math.random()*100)+(min+1))];
       	    k = 1;
       	 }
       }

       datatst = new Array(test);
       sampletst = Math.round(test/2);
       for(j = 0;j < sampletst; j++){
         datatst[j] = [fit, (Math.floor(Math.random() * (+max - +min)+ +min))];
       }

       for(j=sampletst; j < test ; i++){
       	 if(k = 1){
       	 	datatst[j] = [fit, (Math.floor(Math.random()*0)+(max-1))];
       	 	k = 0;
       	 }else{
       	    datatst[j] = [fit,(Math.floor(Math.random()*100)+(min+1))];
       	    k = 1;
       	 }
       }

       this.datatrain = datatr;
       this.datatest = datatst;

       tam = this.datatrain.length;
	   label = new Array(tam);
     
       for(i=0;i<tam;i++){
        if((datatr[i][1] >= min)&&(datatr[i][1] <= max)){
            label[i] = 1;
         }else{
            label[i] = -1;
         }
       }
       this.labels = label;
       this.fit = fit;
	 }

	train(){
		var svm = new svmjs.SVM();
		svm.train(this.datatrain, this.labels, {kernel: 'rbf', rbfsigma: 1});
		this.#svmk = svm;
	}

	test(){
     var tam = this.datatest.length;
		 var validlabels = new Array(tam);
     var datatest = this.datatest;
     var svm = this.#svmk;
     var min = this.#min;
     var max = this.#max;

     for(i=0;i<tam;i++){
     if((datatest[i][1] >= min)&&(datatest[i][1] <= max)){
        validlabels[i] = 1;
      }else{
        validlabels[i] = -1;
      }
    }

    var testlabels = svm.predict(datatest);
    var correctl = 0;
    var errorl = 0;
    for(i=0;i<tam;i++){
      if(testlabels[i] == validlabels[i]){
        correctl+=1;
      }else{
        errorl+=1;
      }
    }

    console.log("acerto: "+(correctl/tam)+"erro: "+(errorl/tam));
	}

	ControlVol(vol){
	  var svm = this.#svmk;
	  var min = this.#min;
	  var max = this.#max;

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
    var svm = this.#svmk;
	  var min = this.#min;
	  var max = this.#max;

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
}