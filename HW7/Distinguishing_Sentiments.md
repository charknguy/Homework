

```python
# Charles Nguyen HW7
```


```python
# Observations

#1 Majority of tweets are neutral.
#2 For today's data, @foxnews has the most positive tweets.
#3 @bbcnews posts the most negative tweets between all news organizations observed.
```


```python
# Import Libraries 
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import requests as reqs
import tweepy
import json
import time

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
```


```python
# Twitter API Keys
consumer_key = "tIZ2XiI8vNVadgJbcraPofPDU"
consumer_secret = "illoEp1AY8WCnmLrCwD1yUrrCgB9w5XUFStgXVShGhlphiWeeC"
access_token = "937017463102832640-8nTjGBdVxZA1OnhLEgw8js5hYWWo58o"
access_token_secret = "HU4lM9ZTeDxi5Qp9rtm4WrMQXABrANSB6OXt3NlLwDCPw"

# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
```


```python
# List of news orgs
news_orgs = ["@bbcnews", "@CBSNews", "@foxnews", "@cnnbrk", "@nytimes"]
sentiments = []
```


```python
# Loop through news listing, 100 tweets per news listing.
for news in news_orgs:
    counter = 1       
    for item in tweepy.Cursor(api.user_timeline, id=news).items(100):
        tweet = json.dumps(item._json, indent=3)
        tweet = json.loads(tweet)
        text = tweet['text']
        
        compound = analyzer.polarity_scores(tweet["text"])["compound"]
        pos = analyzer.polarity_scores(tweet["text"])["pos"]
        neu = analyzer.polarity_scores(tweet["text"])["neu"]
        neg = analyzer.polarity_scores(tweet["text"])["neg"]
        
        news_dict = {
            'Source':news,
            'Date': tweet["created_at"],
            'Text': text,
            'Compound': compound,
            'Positive': pos,
            'Negative': neg,
            'Tweets_Ago': counter
        }
        
        sentiments.append(news_dict)
        counter +=1      
```


```python
news_sentiment_df = pd.DataFrame.from_dict(sentiments)
news_sentiment_df.head()
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
      <th>Compound</th>
      <th>Date</th>
      <th>Negative</th>
      <th>Positive</th>
      <th>Source</th>
      <th>Text</th>
      <th>Tweets_Ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.2500</td>
      <td>Fri Dec 15 02:18:16 +0000 2017</td>
      <td>0.193</td>
      <td>0.281</td>
      <td>@bbcnews</td>
      <td>V Festival: 'No police stationed' at 2017 even...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-0.2732</td>
      <td>Fri Dec 15 02:18:16 +0000 2017</td>
      <td>0.259</td>
      <td>0.000</td>
      <td>@bbcnews</td>
      <td>Schools warned over hackable heating systems h...</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0000</td>
      <td>Fri Dec 15 02:18:15 +0000 2017</td>
      <td>0.143</td>
      <td>0.143</td>
      <td>@bbcnews</td>
      <td>Russia a 'risk' to undersea cables, defence ch...</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0000</td>
      <td>Fri Dec 15 02:18:15 +0000 2017</td>
      <td>0.000</td>
      <td>0.000</td>
      <td>@bbcnews</td>
      <td>'Youthquake' declared word of the year by Oxfo...</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.1280</td>
      <td>Fri Dec 15 02:18:14 +0000 2017</td>
      <td>0.176</td>
      <td>0.000</td>
      <td>@bbcnews</td>
      <td>Virgin Trains staff to hold 24-hour strike htt...</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
news_sentiment_df.groupby('Source').Source.count()
```




    Source
    @CBSNews    100
    @bbcnews    100
    @cnnbrk     100
    @foxnews    100
    @nytimes    100
    Name: Source, dtype: int64




```python
# Separate news orgs. to graph
BBC_graph = news_sentiment_df[news_sentiment_df["Source"]=="@BBCNews"]
CBS_graph = news_sentiment_df[news_sentiment_df["Source"]=="@CBSNews"]
CNN_graph = news_sentiment_df[news_sentiment_df["Source"]=="@cnnbrk"]
FoxNews_graph = news_sentiment_df[news_sentiment_df["Source"]=="@foxnews"]
nytimes_graph = news_sentiment_df[news_sentiment_df["Source"]=="@nytimes"]
```


```python
# plot all 5 news orgs. graphs onto 1 graph

plt.figure(figsize=(10,10))

BBC = plt.scatter(BBC_graph['Tweets_Ago'],BBC_graph['Compound'], c='lightskyblue', s=100, 
                  edgecolors='Black', alpha = 0.8, label='BBC')

CBS = plt.scatter(CBS_graph['Tweets_Ago'],CBS_graph['Compound'], c='green', s=100, 
                  edgecolors='Black', alpha = 0.8, label='CBS')

CNN = plt.scatter(CNN_graph['Tweets_Ago'],CNN_graph['Compound'], c='red', s=100, 
                  edgecolors='Black', alpha = 0.8, label='CNN')

FoxNews = plt.scatter(FoxNews_graph['Tweets_Ago'],FoxNews_graph['Compound'], c='blue', s=100, 
                      edgecolors='Black', alpha = 0.8, label='FoxNews')

nytimes = plt.scatter(nytimes_graph['Tweets_Ago'],nytimes_graph['Compound'], c='yellow', s=100, 
                      edgecolors='Black', alpha = 0.8, label='New York Times')

plt.ylim(-1, 1)
plt.xlim(100, 0)

plt.xlabel("Tweets_Ago")
plt.ylabel("Tweet_Polarity (Compound Sentiments Score)")

plt.legend(loc=9, bbox_to_anchor=(.5, -0.2), ncol=2)

# Prints our scatter plot graph to the screen
plt.title("Sentiment Analyis of Media Tweet - (12/14/2017)")
plt.savefig('Sentiment Analyis of Media Tweet.png')
plt.show()

```


![png](output_9_0.png)



```python
# Group compound sentiments by news and calculate avg. to graph
News_graph = news_sentiment_df.groupby(['Source'])['Compound'].mean()
News_graph = pd.DataFrame(News_graph)
News_graph
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
      <th>Compound</th>
    </tr>
    <tr>
      <th>Source</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>@CBSNews</th>
      <td>-0.040973</td>
    </tr>
    <tr>
      <th>@bbcnews</th>
      <td>-0.102065</td>
    </tr>
    <tr>
      <th>@cnnbrk</th>
      <td>-0.100021</td>
    </tr>
    <tr>
      <th>@foxnews</th>
      <td>0.018544</td>
    </tr>
    <tr>
      <th>@nytimes</th>
      <td>-0.049102</td>
    </tr>
  </tbody>
</table>
</div>




```python
News = ['@CBSNews', '@bbcnews', '@cnnbrk', '@foxnews', '@nytimes']
colors = ['lightskyblue', 'green', 'red', 'blue', 'yellow']
Tweet_Polarity = News_graph['Compound']
ypos = np.arange(len(News))
plt.xticks(ypos,News)

plt.bar(ypos, Tweet_Polarity, align='center', alpha=0.5, color = colors)
 
plt.xlabel("News Source")
plt.ylabel("Tweet_Polarity (Compound Sentiments Score)")

plt.title("Overall Media Sentiment based on Twitter - (12/14/2017)")
plt.savefig("Overall Media Sentiment based on Twitter.png")
plt.show()

```


![png](output_11_0.png)



```python

```
