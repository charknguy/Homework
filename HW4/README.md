

```python
Heroes of Pymoli
Observation 1. There are many more male players than female players.
Observation 2. Some players made multiple purchases.
Obsercation 3. 11 players didnot want to disclose their gender or marked it as other.
```


```python
import pandas as pd
import numpy as np
import json
```


```python
data_file_pd = pd.read_json('purchase_data.json')
data_file_pd.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>38</td>
      <td>Male</td>
      <td>165</td>
      <td>Bone Crushing Silver Skewer</td>
      <td>3.37</td>
      <td>Aelalis34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>21</td>
      <td>Male</td>
      <td>119</td>
      <td>Stormbringer, Dark Blade of Ending Misery</td>
      <td>2.32</td>
      <td>Eolo46</td>
    </tr>
    <tr>
      <th>2</th>
      <td>34</td>
      <td>Male</td>
      <td>174</td>
      <td>Primitive Blade</td>
      <td>2.46</td>
      <td>Assastnya25</td>
    </tr>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>Male</td>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>Pheusrical25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>23</td>
      <td>Male</td>
      <td>63</td>
      <td>Stormfury Mace</td>
      <td>1.27</td>
      <td>Aela59</td>
    </tr>
  </tbody>
</table>
</div>




```python
total_Players = data_file_pd["SN"].nunique()
total_Players_DF = pd.DataFrame({"Total Players": [total_Players]})
total_Players_DF = total_Players_DF[["Total Players"]]

total_Players_DF = total_Players_DF.round(2)
total_Players_DF
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>573</td>
    </tr>
  </tbody>
</table>
</div>




```python
unique_Items = data_file_pd["Item ID"].nunique()
unique_Items
```




    183




```python
avg_Price = data_file_pd["Price"].mean()
avg_Price
```




    2.931192307692303




```python
number_Purchases = data_file_pd["Item Name"].count()
number_Purchases
```




    780




```python
total_Revenue = data_file_pd["Price"].sum()
total_Revenue
```




    2286.3299999999963




```python
unique_Items = data_file_pd["Item ID"].nunique()
avg_Price = data_file_pd["Price"].mean()
number_Purchases = data_file_pd["Item Name"].count()
total_Revenue = data_file_pd["Price"].sum()

purchasing_Analysis_DF = pd.DataFrame({"Number of Unique Items": [unique_Items],
                                      "Average Price": [avg_Price],
                                      "Number of Purchases": [number_Purchases],
                                      "Total Revenue": [total_Revenue]})

purchasing_Analysis_DF = purchasing_Analysis_DF[["Number of Unique Items",
                                                "Average Price",
                                                "Number of Purchases",
                                                "Total Revenue"]]

purchasing_Analysis_DF = purchasing_Analysis_DF.round(2)
purchasing_Analysis_DF
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number of Unique Items</th>
      <th>Average Price</th>
      <th>Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>183</td>
      <td>2.93</td>
      <td>780</td>
      <td>2286.33</td>
    </tr>
  </tbody>
</table>
</div>




```python
avg_Price = data_file_pd["Price"].mean()
avg_Price
```




    2.931192307692303




```python
gender_data_df = data_file_pd["Gender"].value_counts()
gender_data_df
```




    Male                     633
    Female                   136
    Other / Non-Disclosed     11
    Name: Gender, dtype: int64




```python
gender_Total = data_file_pd["Gender"].count()
gender_Total
```




    780




```python
male_Count_df = data_file_pd.loc[data_file_pd["Gender"] == "Male"]
male_Count_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>38</td>
      <td>Male</td>
      <td>165</td>
      <td>Bone Crushing Silver Skewer</td>
      <td>3.37</td>
      <td>Aelalis34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>21</td>
      <td>Male</td>
      <td>119</td>
      <td>Stormbringer, Dark Blade of Ending Misery</td>
      <td>2.32</td>
      <td>Eolo46</td>
    </tr>
    <tr>
      <th>2</th>
      <td>34</td>
      <td>Male</td>
      <td>174</td>
      <td>Primitive Blade</td>
      <td>2.46</td>
      <td>Assastnya25</td>
    </tr>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>Male</td>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>Pheusrical25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>23</td>
      <td>Male</td>
      <td>63</td>
      <td>Stormfury Mace</td>
      <td>1.27</td>
      <td>Aela59</td>
    </tr>
  </tbody>
</table>
</div>




```python
male_Total = male_Count_df["Gender"].count()
male_Total
```




    633




```python
female_Count_df = data_file_pd.loc[data_file_pd["Gender"] == "Female"]
female_Count_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7</th>
      <td>29</td>
      <td>Female</td>
      <td>169</td>
      <td>Interrogator, Blood Blade of the Queen</td>
      <td>3.32</td>
      <td>Iathenudil29</td>
    </tr>
    <tr>
      <th>16</th>
      <td>22</td>
      <td>Female</td>
      <td>123</td>
      <td>Twilight's Carver</td>
      <td>1.14</td>
      <td>Sundista85</td>
    </tr>
    <tr>
      <th>17</th>
      <td>22</td>
      <td>Female</td>
      <td>59</td>
      <td>Lightning, Etcher of the King</td>
      <td>1.65</td>
      <td>Aenarap34</td>
    </tr>
    <tr>
      <th>22</th>
      <td>11</td>
      <td>Female</td>
      <td>11</td>
      <td>Brimstone</td>
      <td>2.52</td>
      <td>Deural48</td>
    </tr>
    <tr>
      <th>29</th>
      <td>16</td>
      <td>Female</td>
      <td>45</td>
      <td>Glinting Glass Edge</td>
      <td>2.46</td>
      <td>Phaedai25</td>
    </tr>
  </tbody>
</table>
</div>




```python
female_Total = female_Count_df["Gender"].count()
female_Total
```




    136




```python
Other_df = data_file_pd.loc[data_file_pd["Gender"] == "Other / Non-Disclosed"]
Other_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>177</th>
      <td>34</td>
      <td>Other / Non-Disclosed</td>
      <td>155</td>
      <td>War-Forged Gold Deflector</td>
      <td>3.73</td>
      <td>Assassa38</td>
    </tr>
    <tr>
      <th>209</th>
      <td>33</td>
      <td>Other / Non-Disclosed</td>
      <td>157</td>
      <td>Spada, Etcher of Hatred</td>
      <td>2.21</td>
      <td>Frichistasta59</td>
    </tr>
    <tr>
      <th>244</th>
      <td>21</td>
      <td>Other / Non-Disclosed</td>
      <td>183</td>
      <td>Dragon's Greatsword</td>
      <td>2.36</td>
      <td>Tyaerith73</td>
    </tr>
    <tr>
      <th>267</th>
      <td>33</td>
      <td>Other / Non-Disclosed</td>
      <td>65</td>
      <td>Conqueror Adamantite Mace</td>
      <td>1.96</td>
      <td>Frichistasta59</td>
    </tr>
    <tr>
      <th>276</th>
      <td>12</td>
      <td>Other / Non-Disclosed</td>
      <td>128</td>
      <td>Blazeguard, Reach of Eternity</td>
      <td>4.00</td>
      <td>Aillycal84</td>
    </tr>
  </tbody>
</table>
</div>




```python
other_Total = Other_df["Gender"].count()
other_Total
```




    11




```python
percent_Male = male_Total / gender_Total
percent_Male
```




    0.81153846153846154




```python
percent_Female = female_Total / gender_Total
percent_Female
```




    0.17435897435897435




```python
percent_Other = other_Total / gender_Total
percent_Other
```




    0.014102564102564103




```python

```


```python
gender_group = data_file_pd.groupby('Gender', as_index=True).agg({'SN': pd.Series.nunique})
gender_group['Percentage'] = gender_group['SN'] / total_Players * 100
gender_group.columns = ['Total Count','Percentage']
gender_group = gender_group[['Percentage','Total Count']]

gender_group.round({'Percentage':2})
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percentage</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>17.45</td>
      <td>100</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>81.15</td>
      <td>465</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>1.40</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
