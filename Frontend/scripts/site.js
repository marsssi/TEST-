// SECTOR  FORM VALIDATION

$(document).ready(function(){
    $("#addSectorForm").validate({
        rules:{
            sname: { 
                required: true, 
                minlength: 3
            },
            scode: { required: true,
                maxlength: 3
            }
        },

         //Messages
        messages:{
            sname: { 
                required: 'Sector  Name is required', 
                minlength: 'Min length required is 3 chars'
            },
            scode: {
                required: 'Sector Code is required',
                maxlength: 'Maximum Length is 3 digits exp. 101;202...'
            }
        },


    //    ADDING A SECTOR
        submitHandler: function(form){
            console.log(`${form.sname.value} ${form.scode.value}`);

            var payload = {
                "sectorName": form.sname.value,
                "sectorCode": form.scode.value
            };
            console.log( "person (payload) - ", payload);
            
            
            $.ajax({  
                url: 'https://localhost:44307/api/Sectors/add-sector',  
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                type: 'POST',  
                dataType: 'json', 
                data: JSON.stringify(payload),  
              
                success: function (data, textStatus, xhr) {  
                    console.log(data);  
                    alert("Sector was added successfully!");
                },  
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                }
            });  

        }
    })



// PRODUCT  FORM VALIDATION
    $("#addProductForm").validate({
        rules:{
            pname:{
                required: true, 
                minlength: 3
            },
            pdescription: { 
                required: true, 
                minlength: 10
            },
            price: { required: true},
            expDate: { required: true},
            sectorId: { required: true}
        },

         //Messages
        messages:{
            pname: { 
                required: 'Product name is required', 
                minlength: 'Min length required is 3 chars'
            },
            pdescription: { 
                required: 'Product description is required', 
                minlength: 'Min length required is 10 chars'
            },
            price: 'Price is required',
            expDate: 'ExpDate is required',
            sectorId: 'Sector is required',
        },
       

// ADDING A PRODUCT
        submitHandler: function(form){
            console.log(`${form.pname.value} ${form.pdescription.value}  ${form.price.value}${form.expDate.value}${form.sectorId.value}`);

            var payload = {
                "productName": form.pname.value,
                "productDescription": form.pdescription.value,
                "price": form.price.value,
                "expDate": form.expDate.value,
                "sectorId": form.sectorId.value,
               
            };

            $.ajax({  
                url: 'https://localhost:44307/api/Products/add-product',  
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                type: 'POST',  
                dataType: 'json',  
                data: JSON.stringify(payload), 

                success: function (data, textStatus, xhr) {  
                    console.log("Product was added successfully!");
                },  
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                }  
            });  
        }
    })

    
});



// SHOWING ALL SECTORS
function loadAllSectors(){
    $.ajax({  
        url: 'https://localhost:44307/api/Sectors/get-all-sectors',  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.sectorName + '</td><td>' + item.sectorCode + '</td></tr>';
            });
            $('table tbody').html(_response);
            
        }, 

        failure: function (data) {  
            alert(data.responseText);  
            console.log(data);
        },  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);

        }   

    });
}




// SECTOR DROPDOWN IN PRODUCTS FORM
function getSectorsDropDown(){
    $.ajax({  
        url: "https://localhost:44307/api/Sectors/get-all-sectors",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.sectorName + '</td><td>' + item.sectorCode + '</td></tr>';
                $('#sectorId').append('<option id=' + item.id + ' value='+ item.id + '>' + item.sectorName + ' '+item.sectorCode+ '</option>');
            
            });
            
        }, 

        failure: function (data) {  
            console.log(data);
        },  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);
        }  

    });
}

// $.each(result, function (i, value) {
// });   e kam ber un comment




// SHOWING ALL PRODUCTS
function loadAllProducts(){
    $.ajax({  
        url: "https://localhost:44307/api/Products/get-all-products",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.productName + '</td><td>'+item.productDescription+'</td><td>'+item.price+'</td><td>'+item.expDate+'</td><td>' +'     ' +'</td></tr>';
            });
            $('table tbody').html(_response);
        }, 

        failure: function (data) {  
            alert(data.responseText);  
            console.log(data);
        }, 
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);

        }  

    });
}