const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const { isValid } = require('json-validity');

const schema = {
    name: 'string',
    age: 'number',
    gender: ['M', 'F']
}

exports.handler = async (event) => {

    console.log(event);
    let validEvent = isValid({ input: event, schema });
    console.log("Is valid:", validEvent);

    let notificationSent = false;
    if (validEvent) {
        try {
            let data = await sns.publish({
                Message: JSON.stringify(event),
                Subject: "Validation Passed",
                TopicArn: `arn:aws:sns:us-east-1:${process.env.SIGMA_AWS_ACC_ID}:MyNotificationTopic`,
                MessageStructure: "String",
                MessageAttributes: {}
            }).promise();
            console.log("Published notification", data);
            notificationSent = true;

        } catch (err) {
            console.log("Failed to publish notification", err);
            notificationSent = false;
        }
    }
    return { valid: validEvent, notification: notificationSent }
};