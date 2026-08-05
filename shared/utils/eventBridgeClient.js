const { EventBridgeClient, PutEventsCommand } = require('@aws-sdk/client-eventbridge');

const region = process.env.AWS_REGION || 'ap-south-1';
const eventBridgeClient = new EventBridgeClient({ region });
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME || 'SynkDocsEventBus';

class EventBridgeUtil {
  static async publishEvent(eventType, detail, source = 'synkdocs.backend') {
    const command = new PutEventsCommand({
      Entries: [
        {
          EventBusName: EVENT_BUS_NAME,
          Source: source,
          DetailType: eventType,
          Detail: JSON.stringify(detail),
          Time: new Date()
        }
      ]
    });

    const result = await eventBridgeClient.send(command);
    return result;
  }
}

module.exports = EventBridgeUtil;
