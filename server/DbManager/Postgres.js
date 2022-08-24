const { Pool} = require('pg');
const sql = require('yesql').pg;

class Postgres {
    #_pool = null;
    constructor(config) {
      this.#_pool = new Pool({
        host : config.host,
        user : config.user,
        password : config.password,
        max : config.max,
        port : config.port,
        database : config.database,
        connectionTimeoutMillis : config.connectionTimeoutMillis
      });
    }

    async FindList(sql){
      var res = await this.#_pool.query(sql);
      return res.rows;
    }

    async FindListWithParameter(sqlText,params){
      var res = await this.#_pool.query(sql(sqlText)(params));
      return res.rows;
    }

    async FindOne(sql){
      var res = await this.#_pool.query(sql);
      return res.rows[0];
    }

    async FindOneWithParameter(sqlText,params){
      var res = await this.#_pool.query(sql(sqlText)(params));
      return res.rows[0];
    }

    async FindScalar(sql){
      var res = await this.#_pool.query(sql);
      var keys = Object.keys(res.rows[0]);
      return res.rows[0][keys[0]];
    }

    async FindScalarWithParameter(sqlText,params){
      var res = await this.#_pool.query(sql(sqlText)(params));
      var keys = Object.keys(res.rows[0]);
      return res.rows[0][keys[0]];
    }


    async Execute(sql){
      await this.#_pool.query(sql);
      return;
    }

    async ExecuteWithParameter(sqlText,params){
      await this.#_pool.query(sql(sqlText)(params));
      return;
    }

    close(){
      return this.#_pool.end();
    }
  }

module.exports =  Postgres;