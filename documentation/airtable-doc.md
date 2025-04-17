From https://airtable.com/appTZNwy0h8PLgahr/api/docs
Last updated: 2025-04-12

Introduction
The Value Machine API provides an easy way to integrate your Value Machine data in Airtable with any external system. The API closely follows REST semantics, uses JSON to encode objects, and relies on standard HTTP codes to signal operation outcomes.

The API documentation below is specifically generated for your base. We recommend that you use the graphical Airtable interface to add a few records of example data for each table. These records will be displayed in the documentation examples generated below.

To view documentation for all available endpoints, as well as documentation that has not been generated specific to your base, please visit here.

The ID of this base is appTZNwy0h8PLgahr.

Please note: if you make changes to a field (column) name or type, the API interface for those fields will change correspondingly. Therefore, please make sure to update your API implementation accordingly whenever you make changes to your Airtable schema from the graphical interface.

Official API client:

JavaScript: airtable.js (Node.js + browser)
Community-built API clients:

Ruby: airrecord
.NET: airtable.net
Python 3: pyairtable
Python 2/3: airtable.py
Metadata
This API gives you the ability to list all of your bases, tables, fields, and views. For more, see the API reference documentation for List bases and Get base schema.

Rate Limits
The API is limited to 5 requests per second per base. If you exceed this rate, you will receive a 429 status code and will need to wait 30 seconds before subsequent requests will succeed.

The official JavaScript client has built-in retry logic.

If you anticipate a higher read volume, we recommend using a caching proxy. This rate limit is the same for all plans and increased limits are not currently available.

Authentication
Airtable uses simple token-based authentication. For personal development, we recommend using personal access tokens, which can be created at /create/tokens. To learn more about other authentication methods like OAuth, please visit our developer documentation.


You can authenticate to the API by providing your secret API token (e.g. personal access token) in the HTTP authorization bearer token header.

All API requests must be authenticated and made over HTTPS.

 
Example
$ curl https://api.airtable.com/v0/appTZNwy0h8PLgahr/Tasks \
-H "Authorization: Bearer YOUR_SECRET_API_TOKEN"
Tasks Table
The id for Tasks is tbl1WHlNN6yYdmYlR. Table ids and table names can be used interchangeably in API requests. Using table ids means table name changes do not require modifications to your API request.

Fields
Each record in the Tasks table contains the following fields:

Field names and field ids can be used interchangeably. Using field ids means field name changes do not require modifications to your API request. We recommend using field ids over field names where possible, to reduce modifications to your API request if the user changes the field name later.

Field NameField IDTypeDescription
TaskfldH8x5FFqEV17YnBText
string
A single line of text.
 
Example values
"Domeinnaam overdracht"

"Google cloud starten "

ProjectfldZ0jhS7Snk9EHzi
Link to another record
array of record IDs (strings)
Array of linked records IDs from the Projects table.
 
Example value
["rec8116cdd76088af", "rec245db9343f55e8", "rec4f3bade67ff565"]

DescriptionfldUppKO76Q16BjHYLong text
string
Multiple lines of text, which may contain "mention tokens", e.g.
<airtable:mention id="menE1i9oBaGX3DseR">@Alex</airtable:mention>
 
Example values
"Als de Squarespace code binnen is moet ik via de domain hosting (zie bookmark), de domeinnaam kunnen overzetten."

"https://console.cloud.google.com/cloud-setup/overview?inv=1&invt=AbssrQ&project=grounded-braid-454314-n9"

SubtasksfldUAuMu3729AjH2E
Long text (with rich text formatting enabled)
string
A Markdown-inspired markup language.
Learn more about using Markdown in long text's rich text formatting API.
 
Example values
"[ ] Mail checken\n[ ] Google sites hostingkant\n[ ] Squarespace fiksen\n"

"[ ] Tutorial afmaken\n"

AssigneefldBHcjCk1By8ycB8
Collaborator
collaborator object
Object providing details about the user collaborator in this field.

idstring
user id
emailstring
user's email address
namestring
user's display name (optional, may be empty if the user hasn't created an account)
 
Example values
{
    "id": "usr2OowfR4FWvdayu",
    "email": "tom@inventhor.com",
    "name": "Tom Franse"
}

{
    "id": "usr2OowfR4FWvdayu",
    "email": "tom@inventhor.com",
    "name": "Tom Franse"
}

Statusfldw6h8Fbn21InRsa
Single select
string
Selected option name.

When creating or updating records, if the choice string does not exactly match an existing option, the request will fail with an INVALID_MULTIPLE_CHOICE_OPTIONS error unless the typecast parameter is enabled. If typecast is enabled, a new choice will be created if one does not exactly match.

 
Possible values
[
    "To Do",
    "In Progress",
    "Completed",
    "Blocked"
]
PriorityfldPrefVnBwK73vEv
Single select
string
Selected option name.

When creating or updating records, if the choice string does not exactly match an existing option, the request will fail with an INVALID_MULTIPLE_CHOICE_OPTIONS error unless the typecast parameter is enabled. If typecast is enabled, a new choice will be created if one does not exactly match.

 
Possible values
[
    "Low",
    "Medium",
    "High",
    "Critical"
]
AttachmentsfldBqa5jOBCj8hPuk
Attachment
array of attachment objects
Each attachment object may contain the following properties. To see which fields are required or optional, please consult the relevant section: retrieve, create, update, or delete.

Because this field is configured to show attachments in reversed order, the order of attachments in the app will be reversed compared to what you see here.

idstring
unique attachment id
urlstring
url, e.g. "https://v5.airtableusercontent.com/foo".

Note: URLs returned will expire 2 hours after being returned from our API. If you want to persist the attachments, we recommend downloading them instead of saving the URL. See our support article for more information.
filenamestring
filename, e.g. "foo.jpg"
sizenumber
file size, in bytes
typestring
content type, e.g. "image/jpeg"
widthnumberheightnumber
width/height, in pixels (these may be available if the attachment is an image)
thumbnails.small.urlstringthumbnails.large.urlstring
url of small/large thumbnails (these may be available if the attachment is an image or document). See notes under url about the lifetime of these URLs.
thumbnails.small.widthnumberthumbnails.small.heightnumberthumbnails.large.widthnumberthumbnails.large.heightnumber
width/height of small/large thumbnails, in pixels (these will be available if the corresponding thumbnail url is available)
 
Example value
[
    {
        "id": "att6f75cc83f1b648",
        "size": 26317,
        "url": "https://www.filepicker.io/api/file/5YTJXioCQG0tYWPw6OPw",
        "type": "image/jpeg",
        "filename": "33823_3_xl.jpg",
        "thumbnails": {
            "small": {
                 "url": "https://www.filepicker.io/api/file/Dy5gioxaShSUvHX0LgIC",
                 "width": 54,
                 "height": 36
             },
            "large": {
                 "url": "https://www.filepicker.io/api/file/ueYi00yRiqhuUn420UZA",
                 "width": 197,
                 "height": 131
             }
         }
    }
]
                            

ProgressfldyK4Vkz9P1G07onFormula
number, string, array of numbers or strings
Computed value: IF(Subtasks, (LEN(Subtasks) - LEN(SUBSTITUTE(Subtasks, "[x", "[") ) ) / (LEN(Subtasks) - LEN(SUBSTITUTE(Subtasks, "[", "") ) ) ).
 
Example values
0

0

Manual sortfldUqiBctfvQtiTi6
 
List Tasks records
To list records in Tasks, issue a GET request to the Tasks endpoint. Note that table names and table ids can be used interchangeably. Using table ids means table name changes do not require modifications to your API request.

Returned records do not include any fields with "empty" values, e.g. "", [], or false.

You can filter, sort, and format the results with the following query parameters. Note that these parameters need to be URL encoded. You can use our API URL encoder tool to help with this. If you are using a helper library like Airtable.js, these parameters will be automatically encoded.

Note: Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/{baseId}/{tableIdOrName}/listRecords while passing the parameters within the body of the request instead of the query parameters. See our support article on this for more information.

fields
array of strings
optional
Only data for fields whose names are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred.

For example, to only return data from Task and Project, send these two query parameters:


fields%5B%5D=Task&fields%5B%5D=Project
You can also perform the same action with field ids (they can be found in the fields section):


fields%5B%5D=fldH8x5FFqEV17YnB&fields%5B%5D=fldZ0jhS7Snk9EHzi
Note: %5B%5D may be omitted when specifying multiple fields, but must always be included when specifying only a single field.

filterByFormula
string
optional
A formula used to filter records. The formula will be evaluated for each record, and if the result is not 0, false, "", NaN, [], or #Error! the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request.

If combined with the view parameter, only records in that view which satisfy the formula will be returned.

The formula must be encoded first before passing it as a value. You can use this tool to not only encode the formula but also create the entire url you need. For example, to only include records where Task isn't empty, pass in NOT({Task} = '') as a parameter like this:

filterByFormula=NOT%28%7BTask%7D%20%3D%20%27%27%29

Note: Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/{baseId}/{tableIdOrName}/listRecords while passing the parameters within the body of the request instead of the query parameters. See our support article on this for more information.

maxRecords
number
optional
The maximum total number of records that will be returned in your requests. If this value is larger than pageSize (which is 100 by default), you may have to load multiple pages to reach this total. See the Pagination section below for more.pageSize
number
optional
The number of records returned in each request. Must be less than or equal to 100. Default is 100. See the Pagination section below for more.sort
array of objects
optional
A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either "asc" or "desc". The default direction is "asc".

The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor the view parameter is included, the order of records is arbitrary.

For example, to sort records by Task in descending order, send these two query parameters:

sort%5B0%5D%5Bfield%5D=Task
sort%5B0%5D%5Bdirection%5D=desc
For example, to sort records by Task in descending order, pass in:

[{field: "Task", direction: "desc"}]
view
string
optional
The name or ID of a view in the Tasks table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the sort parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the fields parameter.cellFormat
string
optional
The format that should be used for cell values. Supported values are:

json: cells will be formatted as JSON, depending on the field type.

string: cells will be formatted as user-facing strings, regardless of the field type. The timeZone and userLocale parameters are required when using string as the cellFormat.

Note: You should not rely on the format of these strings, as it is subject to change.
The default is json.

timeZone
string
optional
The time zone that should be used to format dates when using string as the cellFormat. This parameter is required when using string as the cellFormat.

userLocale
string
optional
The user locale that should be used to format dates when using string as the cellFormat. This parameter is required when using string as the cellFormat.

returnFieldsByFieldId
boolean
optional
An optional boolean value that lets you return field objects where the key is the field id.

This defaults to false, which returns field objects where the key is the field name.

recordMetadata
array of strings
optional
An optional field that, if includes commentCount, adds a commentCount read only property on each record returned.

These parameters need to be URL encoded. If you are using a helper library like Airtable.js, they will be automatically encoded.

Pagination
The server returns one page of records at a time. Each page will contain pageSize records, which is 100 by default.

If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters.

Pagination will stop when you've reached the end of your table. If the maxRecords parameter is passed, pagination will stop once you've reached this maximum.

 
Example request
curl "https://api.airtable.com/v0/appTZNwy0h8PLgahr/Tasks?maxRecords=3&view=Grid%20view" \
  -H "Authorization: Bearer YOUR_SECRET_API_TOKEN"
Example response
{
    "records": [
        {
            "id": "recP3oLbl4Ig3BnQ9",
            "createdTime": "2025-03-22T09:22:15.000Z",
            "fields": {
                "Task": "Domeinnaam overdracht",
                "Description": "Als de Squarespace code binnen is moet ik via de domain hosting (zie bookmark), de domeinnaam kunnen overzetten.",
                "Assignee": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                },
                "Status": "To Do",
                "Priority": "High",
                "Subtasks": "[ ] Mail checken\n[ ] Google sites hostingkant\n[ ] Squarespace fiksen\n",
                "Progress": 0,
                "Project": [
                    "recoxSro8ryc5d5nf"
                ],
                "Manual sort": "a1"
            }
        },
        {
            "id": "recDIakWy5Wz3o054",
            "createdTime": "2025-03-22T10:12:44.000Z",
            "fields": {
                "Task": "Google cloud starten ",
                "Description": "https://console.cloud.google.com/cloud-setup/overview?inv=1&invt=AbssrQ&project=grounded-braid-454314-n9",
                "Assignee": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                },
                "Status": "To Do",
                "Priority": "Medium",
                "Subtasks": "[ ] Tutorial afmaken\n",
                "Progress": 0,
                "Manual sort": "a2"
            }
        }
    ],
    "offset": "itrgyscboA4iS6Hsy/recDIakWy5Wz3o054"
}
 
Iteration may timeout due to client inactivity or server restarts. In that case, the client will receive a 422 response with error message LIST_RECORDS_ITERATOR_NOT_AVAILABLE. It may then restart iteration from the beginning.