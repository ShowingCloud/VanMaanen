import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.dbUrl, { server: { auto_reconnect: true } });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connecting to the database Successfully');
});

db.on('error', (error) => {
  console.error(`Error in MongoDb connection: ${error}`);
  mongoose.disconnect();
});

db.on('close', () => {
  console.log('The database is disconnected and try to reconnect the database');
  mongoose.connect(config.dbUrl, { server: { auto_reconnect: true } });
});

export default db;
