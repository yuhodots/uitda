var mysql      = require('mysql');
var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'g10p69AH',
 database : 'example'
});

connection.connect();
/*
connection.query('SELECT * FROM users', function (error, results, fields) {
 if (error) {
     console.log(error);
 };
  console.log(results);
});
connection.query('SELECT * FROM sessions', function (error, results, fields) {
 if (error) {
     console.log(error);
 };
  console.log(results);
});
connection.query('truncate sessions', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
*/
connection.query('select * from market_board', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});
connection.query('select * from market_files', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);

});

connection.query('select * from networking_board', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});
connection.query('select * from networking_files', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});
connection.query('select * from proposal', function(error,result,fields){
if(error){
console.log(error);
}
console.log(result);
});
/*
connection.query('show tables', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});
connection.query('describe proposal', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});
*/
/*
connection.query('drop table market_board', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table market_files', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table networking_board', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table networking_files', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table proposal', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table cal_events', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table users', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
*/




/*
connection.query('select * from networking_board', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});
connection.query('select * from networking_files', function(error,result,fields){
  if(error){
    console.log(error);
  }
  console.log(result);
});

connection.query('drop table networking_board', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
connection.query('drop table networking_files', function(error,result,fields){
  if(error){
    console.log(error);
  }

});


*/
/*
connection.query('truncate sessions', function(error,result,fields){
  if(error){
    console.log(error);
  }
});
*/
connection.end();
