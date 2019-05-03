const db = require('../server/db/db');
before(() => db.sync({ force: true }));
afterEach(() => db.sync({ force: true }));
after(() => db.close());
