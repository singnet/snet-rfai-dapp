import json
import re
import traceback

from util_ipfs import UtilIPFS
from common.utils import Utils
obj_util = Utils()
def request_handler(event, context):
    print(event)
    if 'path' not in event:
        print("request_handler::path: ", None)
        return get_response("400", "Bad Request")
    try:
        payload_dict = None
        path = event['path'].lower()
        if event['httpMethod'] == 'POST':
            body = event['body']
            if body is not None and len(body) > 0:
                payload_dict = json.loads(body)
                print("Processing [" + str(path) + "] with body [" + str(body) + "]")
        elif event['httpMethod'] == 'GET':
            payload_dict = event.get('queryStringParameters')
            print("Processing [" + str(path) + "] with queryStringParameters [" + str(payload_dict) + "]")
            

        data = None
        
        obj = UtilIPFS()
        if "/ipfs" == path:
            data = obj.write_json_to_ipfs(json_data=payload_dict)
        elif "/read-ipfs" == path:
            data = json.loads(obj.read_from_ipfs(ipfs_hash=payload_dict['hash']))
            
        if data is None:
            err_msg = {'status': 'failed', 'error': 'Bad Request', 'api': event['path']}
            obj_util.report_slack(1, str(err_msg))
            response = get_response("400", err_msg)
        else:
            response = get_response("200", {"status": "success", "data": data})
            
    except Exception as e:
        err_msg = {"status": "failed", "error": repr(e)}
        obj_util.report_slack(1, str(err_msg))
        response = get_response(500, err_msg)
        traceback.print_exc()

    print(response)
    return response

def get_response(status_code, message):
    return {
        'statusCode': status_code,
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            "X-Requested-With": '*',
            "Access-Control-Allow-Headers": 'Access-Control-Allow-Origin, Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'GET,OPTIONS,POST'
        }
    }
