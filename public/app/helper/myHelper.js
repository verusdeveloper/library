function apiModifyTable(originalData,id,response){

    angular.forEach(originalData, function (item,key) {

        if(book.id == id){

            originalData[key] = response;

        }

    });

    return originalData;

}