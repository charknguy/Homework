

```python
#Observation trends
#1 The data shows that the closer to 0 latitude, the hotter it is.
#2 It is humid in most places and there is no good correlation between being closer to the equator or further away. Also, cloudiness doesn’t not have a clear correlation.
#3 In my wind speed data is sporadic and winds seem to vary randomly.
```


```python
import csv
import matplotlib.pyplot as plt
import requests as req
import pandas as pd
import numpy as np
```


```python
api_key = "8b517dd12acab8faa94bcceee89c48ac"
url = "http://api.openweathermap.org/data/2.5/weather?"
units = "imperial"
```


```python
query_url = url + "appid=" + api_key + "&units=" + units + "&q="
print(query_url)
```

    http://api.openweathermap.org/data/2.5/weather?appid=8b517dd12acab8faa94bcceee89c48ac&units=imperial&q=



```python
cities_df = pd.read_csv("https://raw.githubusercontent.com/wingchen/citipy/master/citipy/worldcities.csv")
```


```python
selected_cities = cities_df.sample(n=500)
selected_cities.head()
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
      <th>Country</th>
      <th>City</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>26974</th>
      <td>ph</td>
      <td>alayao</td>
      <td>14.281800</td>
      <td>122.552400</td>
    </tr>
    <tr>
      <th>11418</th>
      <td>fr</td>
      <td>bihorel</td>
      <td>49.454685</td>
      <td>1.122298</td>
    </tr>
    <tr>
      <th>45525</th>
      <td>us</td>
      <td>cleveland</td>
      <td>35.159444</td>
      <td>-84.876667</td>
    </tr>
    <tr>
      <th>13187</th>
      <td>gh</td>
      <td>kpandae</td>
      <td>8.466667</td>
      <td>-0.016667</td>
    </tr>
    <tr>
      <th>46495</th>
      <td>ws</td>
      <td>saleilua</td>
      <td>-14.016667</td>
      <td>-171.700000</td>
    </tr>
  </tbody>
</table>
</div>




```python
selected_cities["Temp"] = ""
selected_cities["Humidity"] = ""
selected_cities["Cloudiness"] = ""
selected_cities["Wind Speed"] = ""
selected_cities.head()
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
      <th>Country</th>
      <th>City</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Temp</th>
      <th>Humidity</th>
      <th>Cloudiness</th>
      <th>Wind Speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>26974</th>
      <td>ph</td>
      <td>alayao</td>
      <td>14.281800</td>
      <td>122.552400</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11418</th>
      <td>fr</td>
      <td>bihorel</td>
      <td>49.454685</td>
      <td>1.122298</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>45525</th>
      <td>us</td>
      <td>cleveland</td>
      <td>35.159444</td>
      <td>-84.876667</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>13187</th>
      <td>gh</td>
      <td>kpandae</td>
      <td>8.466667</td>
      <td>-0.016667</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>46495</th>
      <td>ws</td>
      <td>saleilua</td>
      <td>-14.016667</td>
      <td>-171.700000</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>




```python
weather_data = []
cities = selected_cities["City"]
```


```python
city_list = []
for index, row in selected_cities.iterrows():
    
    try:
        weather = (req.get(query_url + row['City'].replace(" ","+")).json())
        selected_cities.set_value(index, "Temp", weather["main"]["temp"])
        selected_cities.set_value(index, "Humidity", weather["main"]["humidity"])
        selected_cities.set_value(index, "Cloudiness", weather["clouds"]["all"])
        selected_cities.set_value(index, "Wind Speed", weather["wind"]["speed"])
        print("--", end="")
        city_list.append(row['City'])
    except:
        print(row['City'])
selected_cities.head()
```

    --------saleilua
    ----------------------mulatupo
    ------------------rogun
    --------kastron
    --------------kholmskaya
    ----------mau aima
    ----------ushtobe
    ----------------------waterfoot
    ----uwayl
    --mangile
    ------solenzo
    ----budhgaon
    ------sioni
    ----------------------------------------signagi
    ----------------------------------------------------------frankfurt
    ------------------------------------------echt
    ------------------guaymitas
    ------------------------monospita
    ------------------------------------------------sedelnikovo
    alzenau
    ----------------------------eucaliptus
    --------new guinlo
    --------san martin de hidalgo
    ----rohatyn
    --------------aakirkeby
    ----------------------------------ayia varvara
    --maguilling
    ----------------------------------------------kroderen
    --------------------------------------------------------------agrafa
    --punakha
    ----------------pulong sampalok
    --------------------------------------------------------------------kerteh
    ------------------------------------------------------------------------------------------------arakhnaion
    ------------------------------------------------kurya
    --------------------------tarudant
    ------hanau
    ------------------------------jamame
    ------------------------yeletskiy
    ipanema
    ----------------------sandayong
    ----------uzunkopru





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
      <th>Country</th>
      <th>City</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Temp</th>
      <th>Humidity</th>
      <th>Cloudiness</th>
      <th>Wind Speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>26974</th>
      <td>ph</td>
      <td>alayao</td>
      <td>14.281800</td>
      <td>122.552400</td>
      <td>81.98</td>
      <td>98</td>
      <td>56</td>
      <td>2.15</td>
    </tr>
    <tr>
      <th>11418</th>
      <td>fr</td>
      <td>bihorel</td>
      <td>49.454685</td>
      <td>1.122298</td>
      <td>40.17</td>
      <td>86</td>
      <td>75</td>
      <td>9.17</td>
    </tr>
    <tr>
      <th>45525</th>
      <td>us</td>
      <td>cleveland</td>
      <td>35.159444</td>
      <td>-84.876667</td>
      <td>26.15</td>
      <td>63</td>
      <td>90</td>
      <td>19.46</td>
    </tr>
    <tr>
      <th>13187</th>
      <td>gh</td>
      <td>kpandae</td>
      <td>8.466667</td>
      <td>-0.016667</td>
      <td>79.05</td>
      <td>73</td>
      <td>20</td>
      <td>7.74</td>
    </tr>
    <tr>
      <th>46495</th>
      <td>ws</td>
      <td>saleilua</td>
      <td>-14.016667</td>
      <td>-171.700000</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>




```python
print(selected_cities.shape)
selected_cities = selected_cities[selected_cities['City'].isin(city_list)]
print(selected_cities.shape)
```

    (500, 8)
    (459, 8)



```python
selected_cities.to_csv('selected_cities.csv')
```


```python
plt.scatter(selected_cities["Latitude"], selected_cities["Temp"], marker="o")
```




    <matplotlib.collections.PathCollection at 0x11bf0c390>




```python
plt.title("Temperature (F) vs. Latitude (Today)")
plt.ylabel("Temperature (Fahrenheit)")
plt.xlabel("Latitude")
plt.grid(True)
```


```python
plt.savefig("Temperature_(F)_vs._Latitude_(Today).png")
```


```python
plt.show()
```


![png](output_14_0.png)



```python
plt.scatter(selected_cities["Latitude"], selected_cities["Humidity"], marker="o")
```




    <matplotlib.collections.PathCollection at 0x11c003c50>




```python
plt.title("humidity % vs. Latitude (Today)")
plt.ylabel("Humidity %")
plt.xlabel("Latitude")
plt.grid(True)
```


```python
plt.savefig("Humidity_%_vs._Latitude_(Today).png")
```


```python
plt.show()
```


![png](output_18_0.png)



```python
plt.scatter(selected_cities["Latitude"], selected_cities["Cloudiness"], marker="o")
```




    <matplotlib.collections.PathCollection at 0x11c2b0c50>




```python
plt.title("cloudiness % vs. Latitude (Today)")
plt.ylabel("Cloudiness %")
plt.xlabel("Latitude")
plt.grid(True)
```


```python
plt.savefig("Cloudiness_%_vs._Latitude_(Today).png")
```


```python
plt.show()
```


![png](output_22_0.png)



```python
plt.scatter(selected_cities["Latitude"], selected_cities["Wind Speed"], marker="o")
```




    <matplotlib.collections.PathCollection at 0x11c351f98>




```python
plt.title("wind speed (mph) vs. Latitude (Today)")
plt.ylabel("Wind Speed (mph)")
plt.xlabel("Latitude")
plt.grid(True)
```


```python
plt.savefig("Wind_Speed_(mph)_vs._Latitude_(Today).png")
```


```python
plt.show()
```


![png](output_26_0.png)



```python

```


```python

```


```python

```
