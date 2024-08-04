---
title: Entry API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="entry-api">Entry API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API for managing user entries and their statistics

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="entry-api-default">Default</h1>

## get__entries

> Code samples

```shell
# You can also use wget
curl -X GET /entries \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /entries HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/entries',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('/entries', headers = headers)

print(r.json())

```

`GET /entries`

*Get all entries for the authenticated user*

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "userId": "string",
    "statistics": {
      "id": "string",
      "message": "string",
      "summary": "string",
      "size": "string",
      "total": {
        "paragraphs": 0,
        "lines": 0,
        "specials": 0,
        "sentences": 0,
        "averageWordsPerSentence": 0
      },
      "paragraphs": [
        {
          "uuid": "string",
          "words": 0,
          "lines": 0,
          "sentences": 0,
          "averages": {
            "wordsPerSentence": 0
          },
          "duplicatedSentences": [
            {
              "value": 0,
              "raw": "string"
            }
          ],
          "mostWordsperParagraph": [
            {
              "name": "string",
              "value": 0
            }
          ],
          "mostLinkingWordsperParagraph": [
            {
              "name": "string",
              "value": 0
            }
          ]
        }
      ]
    },
    "paragraphs": [
      "string"
    ]
  }
]
```

<h3 id="get__entries-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of entries for the user|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<h3 id="get__entries-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Entry](#schemaentry)]|false|none|none|
|» id|string|false|none|none|
|» userId|string|true|none|none|
|» statistics|[Statistics](#schemastatistics)|false|none|none|
|»» id|string|false|none|none|
|»» message|string|true|none|none|
|»» summary|string|true|none|none|
|»» size|string|true|none|none|
|»» total|object|true|none|none|
|»»» paragraphs|number|true|none|none|
|»»» lines|number|true|none|none|
|»»» specials|number|true|none|none|
|»»» sentences|number|true|none|none|
|»»» averageWordsPerSentence|number|true|none|none|
|»» paragraphs|[object]|true|none|none|
|»»» uuid|string|true|none|none|
|»»» words|number|true|none|none|
|»»» lines|number|true|none|none|
|»»» sentences|number|true|none|none|
|»»» averages|object|true|none|none|
|»»»» wordsPerSentence|number|true|none|none|
|»»» duplicatedSentences|[object]|true|none|none|
|»»»» value|number|true|none|none|
|»»»» raw|string|true|none|none|
|»»» mostWordsperParagraph|[object]|true|none|none|
|»»»» name|string|true|none|none|
|»»»» value|number|true|none|none|
|»»» mostLinkingWordsperParagraph|[object]|true|none|none|
|»»»» name|string|true|none|none|
|»»»» value|number|true|none|none|
|» paragraphs|[string]|true|none|Generated from the input text by the server|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## post__entries

> Code samples

```shell
# You can also use wget
curl -X POST /entries \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST /entries HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "text": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/entries',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post '/entries',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('/entries', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/entries', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/entries");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/entries", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /entries`

*Create a new entry*

User provides the text, and the server generates paragraphs, statistics, and other fields.

> Body parameter

```json
{
  "text": "string"
}
```

<h3 id="post__entries-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EntryInput](#schemaentryinput)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "userId": "string",
  "statistics": {
    "id": "string",
    "message": "string",
    "summary": "string",
    "size": "string",
    "total": {
      "paragraphs": 0,
      "lines": 0,
      "specials": 0,
      "sentences": 0,
      "averageWordsPerSentence": 0
    },
    "paragraphs": [
      {
        "uuid": "string",
        "words": 0,
        "lines": 0,
        "sentences": 0,
        "averages": {
          "wordsPerSentence": 0
        },
        "duplicatedSentences": [
          {
            "value": 0,
            "raw": "string"
          }
        ],
        "mostWordsperParagraph": [
          {
            "name": "string",
            "value": 0
          }
        ],
        "mostLinkingWordsperParagraph": [
          {
            "name": "string",
            "value": 0
          }
        ]
      }
    ]
  },
  "paragraphs": [
    "string"
  ]
}
```

<h3 id="post__entries-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Entry created successfully|[Entry](#schemaentry)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## get__entries_{id}

> Code samples

```shell
# You can also use wget
curl -X GET /entries/{id} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET /entries/{id} HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/entries/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get '/entries/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('/entries/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/entries/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/entries/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/entries/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /entries/{id}`

*Get an entry by ID*

<h3 id="get__entries_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "userId": "string",
  "statistics": {
    "id": "string",
    "message": "string",
    "summary": "string",
    "size": "string",
    "total": {
      "paragraphs": 0,
      "lines": 0,
      "specials": 0,
      "sentences": 0,
      "averageWordsPerSentence": 0
    },
    "paragraphs": [
      {
        "uuid": "string",
        "words": 0,
        "lines": 0,
        "sentences": 0,
        "averages": {
          "wordsPerSentence": 0
        },
        "duplicatedSentences": [
          {
            "value": 0,
            "raw": "string"
          }
        ],
        "mostWordsperParagraph": [
          {
            "name": "string",
            "value": 0
          }
        ],
        "mostLinkingWordsperParagraph": [
          {
            "name": "string",
            "value": 0
          }
        ]
      }
    ]
  },
  "paragraphs": [
    "string"
  ]
}
```

<h3 id="get__entries_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The requested entry|[Entry](#schemaentry)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Entry not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

# Schemas

<h2 id="tocS_EntryInput">EntryInput</h2>
<!-- backwards compatibility -->
<a id="schemaentryinput"></a>
<a id="schema_EntryInput"></a>
<a id="tocSentryinput"></a>
<a id="tocsentryinput"></a>

```json
{
  "text": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text|string|true|none|The full text provided by the user. The server will process this to generate paragraphs and statistics.|

<h2 id="tocS_Entry">Entry</h2>
<!-- backwards compatibility -->
<a id="schemaentry"></a>
<a id="schema_Entry"></a>
<a id="tocSentry"></a>
<a id="tocsentry"></a>

```json
{
  "id": "string",
  "userId": "string",
  "statistics": {
    "id": "string",
    "message": "string",
    "summary": "string",
    "size": "string",
    "total": {
      "paragraphs": 0,
      "lines": 0,
      "specials": 0,
      "sentences": 0,
      "averageWordsPerSentence": 0
    },
    "paragraphs": [
      {
        "uuid": "string",
        "words": 0,
        "lines": 0,
        "sentences": 0,
        "averages": {
          "wordsPerSentence": 0
        },
        "duplicatedSentences": [
          {
            "value": 0,
            "raw": "string"
          }
        ],
        "mostWordsperParagraph": [
          {
            "name": "string",
            "value": 0
          }
        ],
        "mostLinkingWordsperParagraph": [
          {
            "name": "string",
            "value": 0
          }
        ]
      }
    ]
  },
  "paragraphs": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|userId|string|true|none|none|
|statistics|[Statistics](#schemastatistics)|false|none|none|
|paragraphs|[string]|true|none|Generated from the input text by the server|

<h2 id="tocS_Statistics">Statistics</h2>
<!-- backwards compatibility -->
<a id="schemastatistics"></a>
<a id="schema_Statistics"></a>
<a id="tocSstatistics"></a>
<a id="tocsstatistics"></a>

```json
{
  "id": "string",
  "message": "string",
  "summary": "string",
  "size": "string",
  "total": {
    "paragraphs": 0,
    "lines": 0,
    "specials": 0,
    "sentences": 0,
    "averageWordsPerSentence": 0
  },
  "paragraphs": [
    {
      "uuid": "string",
      "words": 0,
      "lines": 0,
      "sentences": 0,
      "averages": {
        "wordsPerSentence": 0
      },
      "duplicatedSentences": [
        {
          "value": 0,
          "raw": "string"
        }
      ],
      "mostWordsperParagraph": [
        {
          "name": "string",
          "value": 0
        }
      ],
      "mostLinkingWordsperParagraph": [
        {
          "name": "string",
          "value": 0
        }
      ]
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|message|string|true|none|none|
|summary|string|true|none|none|
|size|string|true|none|none|
|total|object|true|none|none|
|» paragraphs|number|true|none|none|
|» lines|number|true|none|none|
|» specials|number|true|none|none|
|» sentences|number|true|none|none|
|» averageWordsPerSentence|number|true|none|none|
|paragraphs|[object]|true|none|none|
|» uuid|string|true|none|none|
|» words|number|true|none|none|
|» lines|number|true|none|none|
|» sentences|number|true|none|none|
|» averages|object|true|none|none|
|»» wordsPerSentence|number|true|none|none|
|» duplicatedSentences|[object]|true|none|none|
|»» value|number|true|none|none|
|»» raw|string|true|none|none|
|» mostWordsperParagraph|[object]|true|none|none|
|»» name|string|true|none|none|
|»» value|number|true|none|none|
|» mostLinkingWordsperParagraph|[object]|true|none|none|
|»» name|string|true|none|none|
|»» value|number|true|none|none|

