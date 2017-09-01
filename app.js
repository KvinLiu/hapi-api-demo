const Hapi = require('hapi');

// Init Server
const server = new Hapi.Server();

// Add Connection
server.connection({
  port: 8000,
  host: 'localhost'
});

// Home Route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('<h1>Hello World</h1>');
  }
});

// Dynamic Route
server.route({
  method: 'GET',
  path: '/user/{name}',
  handler: (request, reply) => {
    reply('Hello, ' + request.params.name);
  }
});

// Start Server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server started at: ${server.info.uri}`);
});
