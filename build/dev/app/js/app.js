'use strict';

angular.module('example366', ['ngAnimate', 'ngTouch','ngDropdowns', 'ui.mask','AxelSoft'])
  .controller('MainCtrl', MainController);
  function MainController($scope, $http, $timeout, $q) {

    var self = this;

    // Set of Photos	
	var photosLen = "Is no data";
	$scope.ddSelectOptions = [];

    $scope.hermSelect = [
        {name:"стандарт", option:0},
        {name:"теплый", option:1},
        {name:"полное вскрытие", option:2}]; 

    $scope.ddRooms = [
        {option:0, name:1},
        {option:1, name:2},
        {option:2, name:3},
        {option:3, name:4}];

    $scope.ddRoomSelected = {option:1, name:2};

    $scope.ddDisloc = [
        {option:0, name:'Обычное'},
        {option:1, name:'Торцевое'}];

     $scope.ddDislocSelected = {option:0, name:'Обычное'};

    $scope.hermSelectOpt = {name:"стандарт", option:0};
   
  
	var obj = [[30,30,45,65],[30,45,60,80],[30,45,65,95],[40,55,80,100]];
	//Initial slider data
	 $http.get('components/housemodel.json').success(function(data, status, headers, config){
  	//console.log('This is data: \n\n', data, '\n\nThis is status: \n\n',status,'\n\nThis is headers:', headers,'\n\nThis is config:', config);
  	 

    self.photos = data;	  

    photosLen = self.photos.length; 

    self.LastPhoto = data[photosLen-1];
    self.FirstPhoto = data[0];
    //self.selectedObj = {};
    
    self.clientName = null;
    self.clientEmail = null;
    self.message = null;

    // initial image index
	for(var i = 0; i<photosLen; i++){
		
		$scope.ddSelectOptions.push({id:i, name:data[i].name});
	}


    $scope.ddSelectSelected = 87;
    
    //obj = data;
  }).error(function(){

  });

  //itiating for stears 
    $scope.ddStear = [];
    for(var i = 1; i < 31; i++){
        $scope.ddStear.push({name:i, option:i});
    }
    $scope.ddStearSelected = {name:3, option:3};
  $scope.user = { type : 0 };  
  	
    self.phonenumber = "";
    var _Index = 1;
	var _Prev = 0;
    var _Next = 2;    
    self.step1 = true;
    self.step2 = false;
    self.step3 = false;
    var selectedSerie = null;

    self.showValidation = false;
    self.SerieError = false;
    self.MetersError = false;
    self.HermError = false;
	self.meters = null;
    self.hermetic = null;
    //ввод метров disabled/enabled
    self.forJuridical = true;

    //intilizing of output data in online calculation
    self.OnlineCalc = {};
    self.OnlineCalc.name = "серия";
    self.OnlineCalc.meters = "рассчитанный объем работ";
    self.OnlineCalc.rooms = "количество комнат";
    self.OnlineCalc.stear = "этаж";
    self.OnlineCalc.herm = "герметизация";
    self.OnlineCalc.price ="0.00";

    self.finalPanel = {message : "Вы ничего не выбрали. Если хотите выбрать параметры - то вы можете вернуться на шаг назад и сделать это"};
    //self.finalPanel[0] = "Вы ничего не выбрали. Если хотите выбрать параметры - то вы можете вернуться на шаг назад и сделать это";

    // if a current image is the same as requested image
    self.isActive = function (index) {
        return _Index === index;

    };

    
	$scope.$watch('ddSelectSelected', function() {       
	   self.showPhoto($scope.ddSelectSelected);
       selectedSerie = $scope.ddSelectSelected;      
   });

    self.smallPhoto = function(_src){

       var str =  _src.replace(/dom/,'dom-m');
         console.log(str);
        return str;
    }

    
    self.inputMeters = function(val){
        if(val == 1) { 
            self.forJuridical = false;
            self.OnlineCalc = {};
            self.OnlineCalc.name = "серия";
            self.OnlineCalc.meters = "объем работ";
            self.OnlineCalc.herm = "герметизация";
            self.OnlineCalc.price ="0.00";
        }
        else {
              self.forJuridical = true;
              self.OnlineCalc = {};
              self.OnlineCalc.name = "серия";
              self.OnlineCalc.meters = "рассчитанный объем работ";
              self.OnlineCalc.rooms = "количество комнат";
              self.OnlineCalc.stear = "этаж";
              self.OnlineCalc.herm = "герметизация";
              self.OnlineCalc.price ="0.00";
          }
        self.meters = null;
        
    }
	
    self.isShow = function(index){
	
        return ((_Index === index) || (_Prev === index) || (_Next === index));
    }
    
    // show prev image
    self.showPrev = function () {
        _Index = (_Index > 0) ? --_Index : photosLen - 1;
        $scope.ddSelectSelected = _Index;       
        self.moveNav(_Index);
        
    };

    // show next image
    self.showNext = function () {
        _Index = (_Index < photosLen - 1) ? ++_Index : 0;
        $scope.ddSelectSelected = _Index;       
        self.moveNav(_Index);
        
    };

    self.moveNav = function(index){
        
        _Prev = index -1;
        _Next = index+1
        if(index == -1){
            _Index = photosLen-1;
            _Prev = photosLen-2;
            _Next = photosLen;
        }
        if(index == (photosLen)){
            _Index = 0;
            _Prev = -1;
            _Next = 1;
        }

    }

    // show a certain image
    self.showPhoto = function (index) {
        
        _Index = index;
        self.moveNav(index);
        self.len = photosLen;
        self.last = photosLen-1;
        $scope.ddSelectSelected = _Index;
        
    };
    self.NextStep = function(){
        self.step1 = false;
        self.step2 = true;
        self.step3 = false;
        
    }
    self.PrevStep = function(){
        self.step1 = true;
        self.step2 = false;
        self.step3 = false;
        
    }
    self.seletSerie = function(index){
        selectedSerie = index;
        $scope.ddSelectSelected = index;        
    }
    $scope.arrObjects = {
            clientName : null,
            email : null,
            phone : null, 
            client : null            
        };//формируем POST массив

    self.calculatePrice = function(){
        var hermeticType = ['Стандарт', 'Теплый', 'Полное вскрытие'];
        if(selectedSerie == null) return self.SerieError = true;
        if(self.meters == null) self.meters = 0;
        self.meters = self.meters < 30 ? 30 : self.meters;
        
        //if(self.hermetic == null) return self.HermError = true;
        var meterRange = null;
        if(self.meters < 150) meterRange = 1;
        if(self.meters < 500) meterRange = 2;
        if(self.meters < 1000) meterRange = 3;
        if(self.meters < 3000) meterRange = 4;
        if(self.meters >= 3000) meterRange = 5;
        var currObj = self.photos[selectedSerie];

        $scope.arrObjects.serie = 'Серия: ' + currObj.name;        
        self.finalPanel.serie = $scope.arrObjects.serie;

        var price = '';
        switch (meterRange) {
           case 1:
              price = currObj.attr1;
              break
           case 2:
              price = currObj.attr2;
              break
           case 3:
              price = currObj.attr3;
              break
           case 4:
              price = currObj.attr4;
              break            
           case 5:
              price = currObj.attr5;
              break
           
        }

        
        //рассчет количества метров в засимости от типа серии и положения квартиры для частных лиц
        if(self.forJuridical){
            console.log('hello');
                if(currObj.attr6 == 1) {
                    houseSort = $scope.ddDislocSelected.option;
                }
                if(currObj.attr6 == 2) {
                    houseSort = $scope.ddDislocSelected.option + 2;
                }
            
                var minMtr = obj[houseSort][$scope.ddRoomSelected.option];
                console.log($scope.ddRoomSelected.option);
                console.log(obj[houseSort]);
               // self.meters = (self.meters > minMtr) ? self.meters : minMtr;
                self.meters =  minMtr;

                $scope.arrObjects.client = 'Тип клиента: физическое лицо';
                $scope.arrObjects.rooms = 'Количество комнат: ' + $scope.ddRoomSelected.name;
                $scope.arrObjects.position = 'Расположение квартиры: ' + $scope.ddDislocSelected.name;
                $scope.arrObjects.stear = 'Этаж: ' + $scope.ddStearSelected.name;
                $scope.arrObjects.minMtr = 'Расчитанные метры: ' + self.meters;

                self.finalPanel.rooms = $scope.arrObjects.rooms;
                self.finalPanel.position = $scope.arrObjects.position;
                self.finalPanel.stear = $scope.arrObjects.stear;
                self.finalPanel.minMtr =  $scope.arrObjects.minMtr;
                
            }//конец проверки
        else {
            $scope.arrObjects.client = 'Тип клиента: юридическое  лицо';
            $scope.arrObjects.meters = 'Погонные метры: ' + self.meters;
            self.finalPanel.meters = $scope.arrObjects.meters;
            
        }
        var date = new Date().toString('dd.MM.yyyy');
        var dateN = new Date();
        var currNumber = dateN.getDate() + dateN.getMonth() + dateN.getFullYear() + dateN.getHours() + dateN.getMinutes();
        self.OnlineCalc = {};
        self.OnlineCalc.pricePerMetr = price.split('/')[$scope.hermSelectOpt.option];
        self.OnlineCalc.date = date;
        self.OnlineCalc.orderNumber = currNumber;
        var price = price.split('/')[$scope.hermSelectOpt.option] * self.meters;
        console.log(self.OnlineCalc.pricePerMetr);
        
        self.OnlineCalc.name = currObj.name;
        self.OnlineCalc.meters = self.meters+" погон. м";
        self.OnlineCalc.herm = $scope.hermSelectOpt.name;
        self.OnlineCalc.price = String(price.toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ') + ' руб.'; 
        self.OnlineCalc.rooms = 'комнат: ' + $scope.ddRoomSelected.name;
        self.OnlineCalc.stear = 'Этаж: ' + $scope.ddStearSelected.name;

        //заполняем значениями информационную панель во втором шаге

        self.finalPanel.message = "Вы выбрали: ";
        $scope.arrObjects.hermetic = 'Вид герметизации: ' + $scope.hermSelectOpt.name;
        $scope.arrObjects.price = 'Расчитанная цена: ' + self.OnlineCalc.price;

        self.finalPanel.hermetic = $scope.arrObjects.hermetic;
        self.finalPanel.price = $scope.arrObjects.price;
        //to makeprint button visible
        self.showPrint = true;
       /* 
        $http.post("printHead.php", $scope.arrObjects).success(function (answ) {
                    $scope.response=answ;                    
                });
        
    */

        
       
    }//end of calculatePrice
    
// передаем массив на сервер (например, при помощи $http)
    $scope.send = function(){
        
        if (!$scope.calculator.$valid){
            self.showValidation = true;
            return false;
        }
        else {
            $scope.arrObjects.clientName = 'Имя: ' + self.clientName;
            $scope.arrObjects.email = 'Емайл: ' + self.clientEmail;
            $scope.arrObjects.phone = 'Телефон: ' + self.phonenumber;
            $scope.arrObjects.message = 'Сообщение: ' + self.message;
        }
         $http.post("formHandler.php", $scope.arrObjects).success(function (answ) {
                    $scope.response=answ;
                    self.ThirdStep();
                     
                });
        
    }//end of send

    self.InitSetup = function(){
        self.step1 = true;                
        self.step2 = false;
        self.step3 = false;

        $scope.arrObjects = {
            clientName : null,
            email : null,
            phone : null, 
            client : null            
        };//обнуляем POST массив

        self.clientName = null;
        self.clientEmail = null;
        self.phonenumber = null;
        self.message = null;

        self.OnlineCalc.name = "серия";
        self.OnlineCalc.meters = "объем работ";
        self.OnlineCalc.herm = "герметизация";
        self.OnlineCalc.price ="0.00";

        self.showPrint = false;

    }

    self.ThirdStep = function(){
        self.step3 = true;                
        self.step2 = false;
       
    }//end of Third Step

    
};


//Check for input only numeric values in the meters input



