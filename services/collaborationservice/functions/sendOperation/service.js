const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require('@aws-sdk/client-apigatewaymanagementapi');

class SendOperationService {
  constructor(repository) {
    this.repository = repository;
  }

  async broadcastOperation(domainName, stage, senderConnectionId, { documentId, operation }) {
    const connections = await this.repository.getDocumentConnections(documentId);

    const apiGwClient = new ApiGatewayManagementApiClient({
      endpoint: `https://${domainName}/${stage}`
    });

    const payload = JSON.stringify({
      action: 'OPERATION',
      documentId,
      operation,
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
          // Stale connection cleanup placeholder
        }
      });

    await Promise.all(broadcastPromises);
    return { broadcastCount: connections.length - 1 };
  }
}

module.exports = SendOperationService;
