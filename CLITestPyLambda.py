import pendulum

def handler(event, context):

    currentTime = pendulum.now().to_datetime_string()
    print("Current time (UTC): " + currentTime)
    
    return currentTime
