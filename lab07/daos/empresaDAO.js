const db = require("../db").db;
const Empresa = require("../models/empresa");

class EmpresaDAO {

    static findAll(nome, callback) {
        let query = "SELECT * FROM empresas";

        // Verificando se foi passado um parâmetro de busca
        if (nome) {
            query += " WHERE nome Like '%" + nome + "%'";
        }

        db.all(query, [], (err, rows) => {
            if (err) return callback(err, null);
            const empresas = rows.map(row => new Empresa(row.id, row.nome));
            callback(null, empresas);
        })
    }

    static findByID(id, callback) {
        const query = "SELECT * FROM jogos WHERE id = ?";
        db.get(query, [id], (err, row) => {
            if (err) return callback(err,null);
            if (!row) return callback(null, err);
            callback(null, new Empresa(row.id, row.nome));
        });
    }

    static create(nome, callback) {
        const query = "INSERT INTO empresas (nome) VALUES (?)";
        db.run(query, [nome], function (err) {
            if (err) return callback(err, null);
            callback(null, new Empresa(this.lastID, nome));
        });
    }

    static update(id, callback) {
        const query = "UPDATE empresas set nome = ? where id = ?";
        db.run(query, [nome, id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    static delete(id, callback) {
        const query = "DELETE FROM empresas WHERE id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

}

module.exports = EmpresaDAO;