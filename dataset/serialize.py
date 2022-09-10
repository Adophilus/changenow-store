#! /usr/bin/env python3

import pandas as pd
import json

df = pd.read_csv('fashion.csv', nrows=2000)

with open('database.json', 'w') as fh:
    json.dump(list(json.loads(df.loc[i].to_json()) for i in df.index), fh)
