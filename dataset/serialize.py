#! /usr/bin/env python3

import pandas as pd
import json
from random import randint

"""
2022-10-08 23:46 (WAT)
0.01 XRP is 0.003580 US Dollar
0.0001 XRP is 0.0000358 US Dollar.
"""

df = pd.read_csv('fashion.csv', nrows=2000)

with open('database.json', 'w') as fh:
    finalList = []
    for i in df.index:
        jsonData = json.loads(df.loc[i].to_json())
        jsonData['Price'] = randint(1, 100) / 1000
        finalList.append(jsonData)
    json.dump(finalList, fh)
