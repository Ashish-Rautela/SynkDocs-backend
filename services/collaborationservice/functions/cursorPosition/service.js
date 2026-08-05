const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require('@aws-sdk/client-apigatewaymanagementapi');

class CursorPositionService {
  constructor(repository) {
    this.repository = repository;
  }

  async broadcastCursor(domainName, stage, senderConnectionId, { documentId, cursor }) {
    const connections = await this.repository.getDocumentConnections(documentId);

    const apiGwClient = new ApiGatewayManagementApiClient({
      endpoint: `https://${domainName}/${stage}`
    });

    const payload = JSON.stringify({
      action: 'CURSOR',
      documentId,
      cursor,
      senderConnectionId,
      timestamp: new Date().toISOString()
    });

    const broadcastPromises = connections
      .filter(conn => conn.connectionId !== senderConnectionId)
      .map(async (conn) => {
        try {
          await apiGwClient.send(new PostToConnectionCommand({
            ConnectionId: conn.connectionId,
            Data: Buffer.from(payload)
          }));
        } catch (err) {
          // Ignore failed send to stale socket
        }
      });

    await Promise.all(broadcastPromises);
    return { broadcastCount: connections.length - 1 };
  }
}

module.exports = CursorPositionService;
