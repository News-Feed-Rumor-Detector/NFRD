#! /bin/bash
#unzip -d /content/BiGCN/data/Weibo /content/BiGCN/data/Weibo/weibotree.txt.zip
#pip install -U torch==1.4.0 numpy==1.18.1
pip install -r /content/BiGCN/requirements.txt
#Generate graph data and store in /data/Weibograph
#python /content/BiGCN/Process/getWeibograph.py
#Generate graph data and store in /data/Twitter15graph
python /content/BiGCN/Process/getTwittergraph.py Twitter15
#Generate graph data and store in /data/Twitter16graph
#python /content/BiGCN/Process/getTwittergraph.py Twitter16
#Reproduce the experimental results.
#python /content/BiGCN/model/Weibo/BiGCN_Weibo.py 1
python /content/BiGCN/model/Twitter/BiGCN_Twitter.py Twitter15 1
#python /content/BiGCN/model/Twitter/BiGCN_Twitter.py Twitter16 1