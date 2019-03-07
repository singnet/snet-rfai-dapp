import json
import os

import ipfsapi

from common.constant import IPFS_URL


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