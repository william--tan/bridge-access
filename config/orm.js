var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  selectAllCategoryName: function(tableName, callback) {
    var queryString = "SELECT categoryid1 FROM ?? WHERE categoryid1 != '' AND categoryid1 NOT IN('Groceries','Travel & Luggage') GROUP BY categoryid1";
    connection.query(queryString, [tableName], function(err, result) {
      if(err) throw err;
        callback(result);
    });
  },
  selectAllProducts: function(tableName, callback) {
      var queryString = "SELECT * FROM ??";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectProductByPage: function(tableName, min_price, max_price, search, category, subcategory, offset, callback) {
      var queryString = "";
      if(min_price === undefined)
      {
          if(search === undefined && category === undefined && subcategory === undefined)
          {
              queryString = "SELECT * FROM ?? LIMIT 52 OFFSET " + offset + "";
          }
          else if(search !== undefined && category === undefined && subcategory === undefined)
          {
              queryString = "SELECT * FROM ?? where name LIKE '%" + search + "%' LIMIT 52 OFFSET " + offset + "";
          }
          else if(search === undefined && category !== undefined && subcategory === undefined)
          {
              queryString = "SELECT * FROM ?? WHERE categoryid1=\""+category.replace("%5C%5C", "")+"\" LIMIT 52 OFFSET " + offset + "";
          }
          else if(search === undefined && category === undefined && subcategory !== undefined)
          {
              queryString = "SELECT * FROM ?? WHERE categoryid2=\""+subcategory.replace("%5C%5C", "")+"\" LIMIT 52 OFFSET " + offset + "";
          }
      }
      else if(min_price !== undefined)
      {
          if(search === "" && category === "" && subcategory === "")
          {
              queryString = "SELECT * FROM ?? "
                           +"HAVING CAST(price AS DECIMAL(10,2)) >= "+min_price+" AND CAST(price AS DECIMAL(10,2)) <= "+max_price+" "
                           +"LIMIT 52 OFFSET " + offset + "";
          }
          else if(search !== "" && category === "" && subcategory === "")
          {
              queryString = "SELECT * FROM ?? WHERE name LIKE '%" + search + "%' "
                          + "HAVING CAST(price AS DECIMAL(10,2)) >= " + min_price + " AND CAST(price AS DECIMAL(10,2)) <= " + max_price + " "
                          + "LIMIT 52 OFFSET " + offset + "";
          }
          else if(search === "" && category !== "" && subcategory === "")
          {
              queryString = "SELECT * FROM ?? WHERE categoryid1 = \"" + category.replace("%5C%5C", "") + "\" "
                          + "HAVING CAST(price AS DECIMAL(10,2)) >= " + min_price + " AND CAST(price AS DECIMAL(10,2)) <= " + max_price + " "
                          + "LIMIT 52 OFFSET " + offset + "";
          }
          else if(search === "" && category === "" && subcategory !== "")
          {
              queryString = "SELECT * FROM ?? WHERE categoryid2 = \"" + subcategory.replace("%5C%5C", "") + "\" "
                          + "HAVING CAST(price AS DECIMAL(10,2)) >= " + min_price + " AND CAST(price AS DECIMAL(10,2)) <= " + max_price + " "
                          + "LIMIT 52 OFFSET " + offset + "";
          }
      }

      console.log(queryString);
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectPriceRange: function (tableName, callback) {
      var queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price FROM ??";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectPriceRangeBySearch: function (tableName, search, callback) {
      var queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price "
                        +"FROM ?? WHERE name LIKE '%" + search + "%'";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectPriceRangeByCategory: function (tableName, category, callback) {
      var queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price "
                       +"FROM ?? WHERE categoryid1=\""+category+"\"";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectPriceRangeBySubcategory: function (tableName, subcategory, callback) {
      var queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price "
          +"FROM ?? WHERE categoryid2=\""+subcategory+"\"";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectPriceRangeByFilter: function (tableName, minPrice, maxPrice, categorySearch, subCategorySearch, searchQuery, callback) {
      var queryString = "";
      if(categorySearch!=="" && subCategorySearch === "" && searchQuery === "")
      {
          queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price "
                      + "FROM ?? WHERE categoryid1=\"" + categorySearch.replace("%5C%5C", "") + "\"";
      }
      else if(categorySearch === "" && subCategorySearch !== "" && searchQuery === "")
      {
          queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price "
                      + "FROM ?? WHERE categoryid2=\"" + subCategorySearch.replace("%5C%5C", "") + "\"";
          console.log("HEHEHEHE: " + queryString);
      }
      else if(categorySearch === "" && subCategorySearch === "" && searchQuery !== "")
      {
          queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price "
                      + "FROM ?? WHERE name LIKE '%" + searchQuery + "%'";
      }
      else
      {
          queryString = "SELECT MAX(CAST(price AS DECIMAL(10,2)))+1 as max_price, MIN(CAST(price AS DECIMAL(10,2))) as min_price FROM ??";
      }
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  findItem: function (tableName, searchQuery, callback) {
      var queryString = "SELECT * FROM ?? where name LIKE '%" + searchQuery + "%'";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  findCategory: function (tableName, categorySearch, callback) {
      var queryString = "SELECT * FROM ?? WHERE categoryid1=\""+categorySearch+"\"";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  findSubCategory: function (tableName, categorySearch, callback) {
      var queryString = "SELECT * FROM ?? WHERE categoryid2=\"" + categorySearch + "\"";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  findByFilter: function (tableName, minPrice, maxPrice, categorySearch, subCategorySearch, searchQuery, callback) {
      var queryString = "";
      if(categorySearch!=="" && subCategorySearch === "" && searchQuery === "")
      {
          queryString = "SELECT * FROM ?? WHERE categoryid1=\"" + categorySearch + "\" HAVING CAST(price AS DECIMAL(10,2)) >= " + minPrice + " AND CAST(price AS DECIMAL(10,2)) <= " + maxPrice + "";
      }
      else if(categorySearch === "" && subCategorySearch !== "" && searchQuery === "")
      {
          queryString = "SELECT * FROM ?? WHERE categoryid2=\""+subCategorySearch+"\" HAVING CAST(price AS DECIMAL(10,2)) >= " + minPrice + " AND CAST(price AS DECIMAL(10,2)) <= " + maxPrice + "";
      }
      else if(categorySearch === "" && subCategorySearch === "" && searchQuery !== "")
      {
          queryString = "SELECT * FROM ?? WHERE name LIKE '%" + searchQuery + "%' HAVING CAST(price AS DECIMAL(10,2)) >= " + minPrice + " AND CAST(price AS DECIMAL(10,2)) <= " + maxPrice + "";
      }
      else if(categorySearch === "" && subCategorySearch === "" && searchQuery === "")
      {
          queryString = "SELECT * FROM ?? HAVING CAST(price AS DECIMAL(10,2)) >= " + minPrice + " AND CAST(price AS DECIMAL(10,2)) <= " + maxPrice + "";
      }
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectProduct: function (tableName, productId, callback) {
      var queryString = "SELECT * FROM ?? WHERE id = " + productId + "";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  selectAllCategoryAndSubcategoryName: function(tableName, callback) {
      var queryString = "SELECT DISTINCT categoryid1, categoryid2 FROM ?? ORDER BY categoryid1 ASC;";
      connection.query(queryString, [tableName], function (err, result) {
          if (err) throw err;
          callback(result);
      });
  }
};

module.exports = orm;
