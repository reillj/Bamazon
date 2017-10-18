var prompt = require('prompt');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "000026587", 
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});



//Display All Items 
connection.query('SELECT * FROM products', function(err, res){

  if(err) throw err;

  console.log('  ID  |      Product Name      |  Department Name  |   Price  | Product Quantity');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  
  // Loop through database
  for(var i = 0; i < res.length; i++){

    var productID = res[i].productID + ''; 
    productID = padText("  ID  ", productID);

    var productName = res[i].ProductName + ''; 
    productName = padText("      Product Name      ", productName);

    var departmentName = res[i].DepartmentName + ''; 
    departmentName = padText("  Department Name  ", departmentName);

    var price = '$' + res[i].Price.toFixed(2) + ''; 
    price = padText("   Price  ", price);

    var quantity = res[i].ProductQuantity + '';
 ]
   
    console.log(productID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + productQuantity);
  }

  //Ask the user to buy something
  prompt.start();

  //Ask Product ID
  console.log('\nWhich item do you want to buy?');
  prompt.get(['buyItemID'], function (err, result) {
    
    //Show Product ID 
    var buyItemID = result.buyItemID;
    console.log('You selected Item # ' + buyItemID + '.');

    //Quanity
    console.log('\nHow many do you want to buy?')
    prompt.get(['buyProductQuantity'], function (err, result) {

      //Show quantity 
      var buyProductQuantity = result.buyProductQuantity;
      console.log('You selected to buy ' + buyProductQuantity + ' of these.');

      //Check if store has enough 
      connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ProductID: buyProductID}], function(err, res){
        if(err) throw err; 

        //Check if Id valid 
        if(res[0] == undefined){
          console.log('Sorry... We found no items with Item ID "' +  buyProductID + '"');
          connection.end(); // end the script/connection
        }
        else{
          var bamazonQuantity = res[0].StockQuantity;
     
          if(bamazonQuantity >= buyProductQuantity){

            //Update mySQL 
            var newInventory = parseInt(bamazonQuantity) - parseInt(buyProductQuantity); // ensure we have integers for subtraction & database
            connection.query('UPDATE Products SET ? WHERE ?', [{ProductQuantity: newInventory}, {ProductID: buyProductID}], function(err, res){
              if(err) throw err; 
            }); 

            //Customer total 
            var customerTotal;
            connection.query('SELECT Price FROM Products WHERE ?', [{ProcuctID: buyProductID}], function(err, res){
              
              var buyProductPrice = res[0].Price;
              customerTotal = buyProductQuantity*buyProductPrice.toFixed(2);

              console.log('\nYour total is $' + customerTotal + '.');

            }); 
          }

          //Not enough inventory
          else{
            console.log('Sorry... We only have ' +  bamazonQuantity + ' of those items. Order cancelled.');
            connection.end(); // end the script/connection
          }
        }
      }); 
    }); 
  }); 
}); 