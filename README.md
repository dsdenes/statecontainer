Simple object state container.

Example
=======
```javascript
const stateContainer = require('statecontainer');
const connections = stateContainer.store('connections');

const connectionUrl = 'amqp://localhost:9000';
const connection = connections.cachedResult(connectionUrl, getConnector(connectionUrl));

function getConnector(connectionUrl) {
    return async() => {
        return await amqp.connect(connectionUrl);
    }
} 
```

API
===

