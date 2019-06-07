import json
import os

import ipfsapi
import requests
from common.constant import IPFS_URL
from requests_oauth2 import OAuth2BearerToken

class UtilIPFS:
    def __init__(self):
        pass

    def _write_to_ipfs_node(self, file):
        try:
            ipfs_conn = ipfsapi.connect(host=IPFS_URL['url'], port=IPFS_URL['port'])
            return ipfs_conn.add(file)
        except Exception as err:
            print("write_to_ipfs_node::err: ", err)

    def _json_to_file(self, data):
        try:
            with open('/tmp/data.json', 'w') as file:
                json.dump(data, file)
        except Exception as err:
            print("json_to_file::err: ", err)

    def write_json_to_ipfs(self, json_data):
        try:
            self._json_to_file(json.dumps(json_data))
            res = self._write_to_ipfs_node('/tmp/data.json')
            return {'hash': res['Hash'] }
        except Exception as err:
            print("write_json_to_ipfs::err: ", err)
            
    def read_from_ipfs(self, ipfs_hash):
        try:
            ipfs_conn = ipfsapi.connect(host=IPFS_URL['url'], port=IPFS_URL['port'])
            ipfs_data = ipfs_conn.cat(ipfs_hash)
            return json.loads(ipfs_data.decode('utf8'))
        except Exception as err:
            print("read_from_ipfs::err: ", err)
            raise err
    
    def get_git_user_from_code(self, code):
        try:
            raw_response = requests.post('https://github.com/login/oauth/access_token',
                                         data={'client_id': os.environ['client_id'],
                                               'client_secret': os.environ['client_secret'],
                                               'code': code})
            access_token = None
            response = raw_response.text.split('&')[0].split('=')
            if response[0] == 'access_token':
                access_token = response[1]
            elif response[0] == 'error':
                raise Exception(response[1])
            if access_token is not None:
                auth = OAuth2BearerToken(access_token)
                user_details = requests.get('https://api.github.com/user', auth=auth)
                if user_details.status_code == 200:
                    return user_details.json()
                else:
                    raise Exception(user_details.text)
        except Exception as e:
            raise e