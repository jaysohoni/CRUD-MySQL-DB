
var mysql = require('mysql');

global.readResultData;

var app = mysql.createConnection({
  host: "--------",
  user: "-------",
  password: "-------",
  database: "-------"
});

app.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // const title = "Mx";
  // const firstName = "Sarah";
  // const surname = "Ryan";
  // const mobile = "1234";
  // const email = "jr111@mumail.com";
  // const hAddress1 = "11 main street";
  // const hAddress2 = "Blanch";
  // const hTown = "Blanchardstownnn";
  // const hCity = "Dublin";
  // const hEircode = "abc123";
  // const sAddress1 = "12 main street";
  // const sAddress2 = "Blanchard";
  // const sTown = "Blanchardstown";
  // const sCity = "Dublin 18";
  // const sEircode = "abc1234";



  const searchedName = "Sarah";

  const deleteName = "Joe";
  const deleteMobile = "1234";
  const deleteEmail = "jr@mumail.com";

  const idToUpdate = 26;

  // createRecord(title, firstName, surname, mobile, email, hAddress1, hAddress2, hTown, hCity, hEircode, sAddress1, sAddress2, sTown, sCity, sEircode, err);
  // readRecord(searchedName);
  // deleteRecord(deleteName, deleteMobile, deleteEmail);
  //updateRecord(idToUpdate, title, mobile, email, hAddress1, hAddress2, hTown, hCity, hEircode, sAddress1, sAddress2, sTown, sCity, sEircode, err)

});

function createRecordSubmission(formdata){
  console.log("function createRecordSubmission started");
  const title = formdata.title
  const firstName = formdata.fname;
  const surname = formdata.surname;
  const mobile = formdata.mobile;
  const email = formdata.email;
  const hAddress1 = formdata.haddress1;
  const hAddress2 = formdata.haddress2;
  const hTown = formdata.htown;
  const hCity = formdata.hCity;
  const hEircode = formdata.hEircode;
  const sAddress1 = formdata.saddress1;
  const sAddress2 = formdata.saddress2;
  const sTown = formdata.stown;
  const sCity = formdata.sCity;
  const sEircode = formdata.sEircode;
  createRecord(title,firstName,surname,mobile,email,hAddress1,hAddress2,hTown,hCity,hEircode,sAddress1,sAddress2,sTown,sCity,sEircode);
  console.log("function createRecordSubmission ended");
}

function deleteRecordSubmission(formdata){
    console.log("function deleteRecordSubmission started");
    const firstName = formdata.dName;
    const mobile = formdata.dMobileNumber;
    const email = formdata.dEmailAddress;
    deleteRecord(firstName,mobile,email);
    console.log("function deleteRecordSubmission ended");
  }

function readRecordSubmission(formData){
    console.log("function readRecordSubmission started");
    const firstName = formData.searchName;
    return readRecord(firstName);
    console.log("function readRecordSubmission ended");
  }

  function updateRecordSubmission(formdata){
    console.log("function updateRecordSubmission started");
    const id = formdata.id;
    const title = formdata.title;
    const mobile = formdata.mobile;
    const email = formdata.email;
    const hAddress1 = formdata.haddress1;
    const hAddress2 = formdata.haddress2;
    const hTown = formdata.htown;
    const hCity = formdata.hCity;
    const hEircode = formdata.hEircode;
    const sAddress1 = formdata.saddress1;
    const sAddress2 = formdata.saddress2;
    const sTown = formdata.stown;
    const sCity = formdata.sCity;
    const sEircode = formdata.sEircode;
    updateRecord(id, title, mobile, email, hAddress1, hAddress2, hTown, hCity, hEircode, sAddress1, sAddress2, sTown, sCity, sEircode);
    console.log("function updateRecordSubmission ended");
  }

function createRecord(title, firstName, surname, mobile, email, hAddress1, hAddress2, hTown, hCity, hEircode, sAddress1, sAddress2, sTown, sCity, sEircode) {
    let currentID;
    // C (create) - how to create user record and add to database
    // if (err) throw err;
    //add user information
    var insertPerson = "INSERT INTO personal_information (title, first_name, surname, mobile, email_address) VALUES ('"
                        + title +"', '"
                        + firstName +"', '"
                        + surname +"', '"
                        + mobile +"', '"
                        + email +"');";
    app.query(insertPerson, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted to personal information table")
        currentID = result.insertId;
        console.log("result = "+currentID);

        var insertHomeAddress = "INSERT INTO home_address (id, address_line1, address_line2, town, county_city, eircode) VALUES ("
                                + currentID +", '"
                                + hAddress1 +"', '"
                                + hAddress2 +"', '"
                                + hTown +"', '"
                                + hCity +"', '"
                                + hEircode +"');";
        app.query(insertHomeAddress, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted to home address table")
        });

        var insertShippingAddress = "INSERT INTO shipping_address (id, s_address_line1, s_address_line2, s_town, s_county_city, s_eircode) VALUES ("
                                    + currentID +", '"
                                    + sAddress1 +"', '"
                                    + sAddress2 +"', '"
                                    + sTown +"', '"
                                    + sCity +"', '"
                                    + sEircode +"');";
        app.query(insertShippingAddress, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted to shipping address table")
        });
    });
}


function readRecord(searchedName) {
        // R (Read) - retrieves and outputs user record based on searched name
        var resultData;
        console.log(searchedName);
        var selectRows = "SELECT * FROM personal_information WHERE first_name='"+searchedName+"';";
        app.query(selectRows, function (err, result) {
            if (err) throw err;
            global.readResultData = result;
            console.log(result);
        });
        setTimeout(function() {
            console.log('This printed after about 4 second');
            return global.readResultData;
          }, 4000);

        // var searchDataResult = document.getElementById("readData");
        // searchDataResult.innerHTML = result;
    
}

function deleteRecord(deleteName, deleteMobile, deleteEmail) {
    console.log("Entered delete record");
    console.log(deleteName);
    console.log(deleteEmail);
    console.log(deleteMobile);
  // R (Read) - retrieves and outputs user record based on searched name
  let idForDeletion;
  // console.log(searchedName);
  var idtodelete = "SELECT * FROM personal_information WHERE first_name ='"+deleteName+"' AND mobile='"+deleteMobile+"' AND email_address='"+deleteEmail+"';";
  app.query(idtodelete, function (err, result) {
    if (err) throw err;
    console.log(result);
    idForDeletion = result;

    result.forEach(element => {
      app.query("DELETE FROM shipping_address WHERE id="+element.id+";", function (err, result2) {
          if (err) throw err;
          console.log(result2);
        });
      app.query("DELETE FROM home_address WHERE id="+element.id+";", function (err, result2) {
          if (err) throw err;
          console.log(result2);
      });
      app.query("DELETE FROM personal_information WHERE id="+element.id+";", function (err, result2) {
        if (err) throw err;
        console.log(result2);
      });
      
    });

  });
}

function updateRecord(id, title, mobile, email, hAddress1, hAddress2, hTown, hCity, hEircode, sAddress1, sAddress2, sTown, sCity, sEircode){

  var updatePI = "UPDATE personal_information SET title='"+title+"', mobile='"+mobile+"', email_address='"+email+"' WHERE id='"+id+"';";
  app.query(updatePI, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  var updateHA = "UPDATE home_address SET address_line1='"+hAddress1+"', address_line2='"+hAddress2+"', town='"+hTown+"', county_city='"+hCity+"', eircode='"+hEircode+"'WHERE id='"+id+"';";
  app.query(updateHA, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  var updateSA = "UPDATE shipping_address SET s_address_line1='"+sAddress1+"', s_address_line2='"+sAddress2+"', s_town='"+sTown+"', s_county_city='"+sCity+"', s_eircode='"+sEircode+"'WHERE id='"+id+"';";
  app.query(updateSA, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

}

function switcher(formdata){
    var result;
    if (formdata.mobile){
        deleteRecordSubmission(formdata);
    }else{
        return readRecordSubmission(formdata);
    }
}

function beforeLast (value, delimiter) {  
    value = value || ''
  
    if (delimiter === '') {
      return value
    }
  
    const substrings = value.split(delimiter)
  
    return substrings.length === 1
      ? value // delimiter is not part of the string
      : substrings.slice(0, -1).join(delimiter)
  }

module.exports = { createRecordSubmission, switcher, beforeLast, updateRecordSubmission};
