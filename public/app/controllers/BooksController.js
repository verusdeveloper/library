app.controller('AdminController', function($scope,$http){

    $scope.pools = [];

});

app.controller('BooksController', function(dataFactory,$scope,$http){

    $scope.data = [];

    $scope.libraryTemp = {};

    $scope.totalItemsTemp = {};

   

    $scope.totalItems = 0;

    $scope.pageChanged = function(newPage) {

        getResultsPage(newPage);

    };

   

    getResultsPage(1);

   
    function getResultsPage(pageNumber) {

        if(! $.isEmptyObject($scope.libraryTemp)){

            dataFactory.httpRequest('/books?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {

                $scope.data = data.data;

                $scope.totalItems = data.total;

            });

        }else{

            dataFactory.httpRequest('/books?page='+pageNumber).then(function(data) {

                $scope.data = data.data;

                $scope.totalItems = data.total;

            });

        }

    }

    $scope.searchDB = function(){

        if($scope.searchText.length >= 3){

            if($.isEmptyObject($scope.libraryTemp)){

                $scope.libraryTemp = $scope.data;

                $scope.totalItemsTemp = $scope.totalItems;

                $scope.data = {};

            }

            getResultsPage(1);

        }else{

            if(! $.isEmptyObject($scope.libraryTemp)){

                $scope.data = $scope.libraryTemp ;

                $scope.totalItems = $scope.totalItemsTemp;

                $scope.libraryTemp = {};

            }

        }

    }

    $scope.saveAdd = function(){

        dataFactory.httpRequest('books','POST',{},$scope.form).then(function(data) {

            $scope.data.push(data);

            $(".modal").modal("hide");

        });

    }

    $scope.edit = function(id){

        dataFactory.httpRequest('books/'+id+'/edit').then(function(data) {

            console.log(data);

            $scope.form = data;

        });

    }

    $scope.saveEdit = function(){

        dataFactory.httpRequest('books/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {

            $(".modal").modal("hide");

            $scope.data = apiModifyTable($scope.data,data.id,data);

        });

    }

    $scope.remove = function(books,index){

        var result = confirm("Are you sure delete this item?");

        if (result) {

            dataFactory.httpRequest('books/'+book.id,'DELETE').then(function(data) {

                $scope.data.splice(index,1);

            });

        }

    }

});