const pool = require('./db');
const mysql = require('./mysqlWrapper');
const PRIMARY_KEY = 'id';

exports.findByFields = async (table, fields, limit, order) => {
  let baseQuery = `SELECT * FROM ?? WHERE `;
  let params = [table];
  Object.keys(fields).forEach((key, index) => {
    baseQuery += `${key} = ?`;
    params.push(fields[key]);
    if (index + 1 !== Object.keys(fields).length) baseQuery += ' AND ';
  });

  if (order != null && order.by != null && order.direction != null) {
    baseQuery += ` ORDER BY ??`;
    baseQuery += order.direction === sqlConstants.DESC ? ' DESC' : ' ASC';
    params.push(order.by);
  }
  if (limit != null && !isNaN(limit)) {
    baseQuery += ' LIMIT ?';
    params.push(limit);
  }
  try {
    var res = await mysql.executeQuery({
      query: baseQuery,
      params,
    });
  } catch (e) {
    console.log('api final res', e);
  }

  return res;
};
exports.findsinglerecord = async (table, fields) => {
  let baseQuery = `SELECT * FROM ?? WHERE `;
  let params = [table];
  Object.keys(fields).forEach((key, index) => {
    baseQuery += `${key} = ?`;
    params.push(fields[key]);
    if (index + 1 !== Object.keys(fields).length) baseQuery += ' AND ';
  });

  try {
    var res = await mysql.executeQuery({
      query: baseQuery,
      params,
    });
  } catch (e) {
    console.log('api final res', e);
  }

  return res[0];
};
exports.orconditionsinglerecord = async (table, fields) => {
  let baseQuery = `SELECT * FROM ?? WHERE `;
  let params = [table];
  Object.keys(fields).forEach((key, index) => {
    baseQuery += `${key} = ?`;
    params.push(fields[key]);
    if (index + 1 !== Object.keys(fields).length) baseQuery += ' OR ';
  });

  try {
    var res = await mysql.executeQuery({
      query: baseQuery,
      params,
    });
  } catch (e) {
    console.log('api final res', e);
  }

  return res[0];
};
exports.update = async (table, { data, id }) => {
  try {
    var res = await mysql.executeQuery({
      query: `UPDATE ??
                          SET ?
                          WHERE ?? = ?;`,
      params: [table, data, PRIMARY_KEY, id],
    });
  } catch (e) {
    //error handling logic
    // console.log("api final res", e);
  }
  return res;
};
exports.insert = async (table, { data }) => {
  try {
    var res = await mysql.executeQuery({
      query: `INSERT INTO ${table}
      SET ?;`,
      params: [data],
    });
  } catch (e) {
    //error handling logic
    console.log('api final res', e);
  }
  return res;
};
