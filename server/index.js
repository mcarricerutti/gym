const express = require('express');
const User = require('./models.js')
const sequelize = require('./database.js')

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener todos los registros (Read)
app.get('/api/users', (req, res) => {
  sequelize.all('SELECT * FROM User', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(rows);
    }
  });
});

// Obtener un registro específico (Read)
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  sequelize.get('SELECT * FROM User WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    } else if (row) {
       res.json(row);
    } else {
      res.status(404).send('Registro no encontrado');
    }
  });
});

// Crear un registro (Create)
app.post('/api/users', (req, res) => {
  const { nombre, apellido, telefono, membresia } = req.body;
  sequelize.run('INSERT INTO User (nombre, apellido, telefono, membresia) VALUES (?, ?)', [nombre, apellido, telefono, membresia], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    } else {
      // res.json({ id: this.lastID });
      res.redirect('/api/users')
    }
  });
});

// Actualizar un registro (Update)
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, membresia } = req.body;
  sequelize.run('UPDATE User SET nombre = ?, apellido = ?, telefono = ?, membresia = ? WHERE id = ?', [nombre, apellido, telefono, membresia, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    } else {
      res.sendStatus(200);
    }
  });
});

// Eliminar un registro (Delete)
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  sequelize.run('DELETE FROM User WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});


// app.get('/api/users', async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });


// app.post('/api/users', async (req, res) => {
//   const { nombre, apellido, necimiento, telefono, membresia } = req.body;
//   const user = await User.create({ nombre, apellido, necimiento, telefono, membresia });
//   res.json(user);
// });

// // app.put('/api/users/:id', async (req, res) => {
// //   const {id} = req.params;
// //   const {data} = req.body;
// //   await User('users').where({id}).update(data);
// //   res.sendStatus(200);
// // });

// app.delete('/api/users/:id', async (req, res) => {
//   const { id } = req.params;
//   await User.destroy({ where: { id } });
//   res.json({ message: 'Usuario eliminado' });
// });

// // // Servir la aplicación React en producción
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../build')));

// //   app.get('*', (req, res) => {
// //     res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// //   });
// // }


