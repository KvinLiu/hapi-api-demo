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
    // reply('<h1>Hello World</h1>');
    reply.view('index', {
      name: 'jhon Doe'
    });
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

// Tasks Route
server.route({
  method: 'GET',
  path: '/tasks',
  handler: (request, reply) => {
    reply.view('tasks', {
      tasks: [
        {text: 'Text One'},
        {text: 'Text Two'},
        {text: 'Text Three'},
        {text: 'Text Four'}
      ]
    });
  }
});

// Static Routes
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/about',
    handler: (request, reply) => {
      reply.file('./public/about.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/image',
    handler: (request, reply) => {
      reply.file('./public/hapi.jpeg');
    }
  });
});

// Vision Templates
server.register(require('vision'), (err) => {
  if (err) {
    throw err;
  }

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: __dirname + '/views'
  });

});

// Start Server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server started at: ${server.info.uri}`);
});
