Projects Table
The id for Projects is tblQLHjJ0BkWiiHSz. Table ids and table names can be used interchangeably in API requests. Using table ids means table name changes do not require modifications to your API request.

Fields
Each record in the Projects table contains the following fields:

Field names and field ids can be used interchangeably. Using field ids means field name changes do not require modifications to your API request. We recommend using field ids over field names where possible, to reduce modifications to your API request if the user changes the field name later.

Field NameField IDTypeDescription
Project NamefldIEeAltobEcmsR0Text
string
A single line of text.
 
Example values
"Narcom"

"Bedrijfsbreed"

"Evolver"

Project DescriptionfldJSoYDtkRzhj3SGLong text
string
Multiple lines of text, which may contain "mention tokens", e.g.
<airtable:mention id="menE1i9oBaGX3DseR">@Alex</airtable:mention>
 
Example values
"Construction of a new bridge over the river"

"Al het werk gerelateerd aan de platform-ondersteuning van Inventhor. Met name Airtable, Google (workspace/cloud/firebase), de website en socials."

"Evolution AI powered"

StatusfldCZmxh6u6AEarhK
Single select
string
Selected option name.

When creating or updating records, if the choice string does not exactly match an existing option, the request will fail with an INVALID_MULTIPLE_CHOICE_OPTIONS error unless the typecast parameter is enabled. If typecast is enabled, a new choice will be created if one does not exactly match.

 
Possible values
[
    "Backlog",
    "In Progress",
    "Released",
    "Shelved"
]
OwnerflddIRXbEhQFe4Idw
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

ThumbnailfldrCcYQ28D6yq2jd
Attachment
array of attachment objects
Each attachment object may contain the following properties. To see which fields are required or optional, please consult the relevant section: retrieve, create, update, or delete.

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
                            

PublishfldK6Y0Unsa9VqdNn
Checkbox
boolean
This field is "true" when checked and otherwise empty.
 
Example value
true

Start datefldXPJFFJ7PZXNS6m
Date
string (ISO 8601 formatted date)
UTC date, e.g. "2014-09-05".
 
Example value
"2014-09-05"

End datefldnZ66lMw2XaD2zW
Date
string (ISO 8601 formatted date)
UTC date, e.g. "2014-09-05".
 
Example value
"2014-09-05"

MilestonesfldAVlem5LUdIZgnT
Link to another record
array of record IDs (strings)
Array of linked records IDs from the Milestones table.
 
Example value
["rec8116cdd76088af", "rec245db9343f55e8", "rec4f3bade67ff565"]

TasksfldZeQNoPrlfYhPDZ
Link to another record
array of record IDs (strings)
Array of linked records IDs from the Tasks table.
 
Example value
["rec8116cdd76088af", "rec245db9343f55e8", "rec4f3bade67ff565"]

List Projects records
To list records in Projects, issue a GET request to the Projects endpoint. Note that table names and table ids can be used interchangeably. Using table ids means table name changes do not require modifications to your API request.

Returned records do not include any fields with "empty" values, e.g. "", [], or false.

You can filter, sort, and format the results with the following query parameters. Note that these parameters need to be URL encoded. You can use our API URL encoder tool to help with this. If you are using a helper library like Airtable.js, these parameters will be automatically encoded.

Note: Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/{baseId}/{tableIdOrName}/listRecords while passing the parameters within the body of the request instead of the query parameters. See our support article on this for more information.

fields
array of strings
optional
Only data for fields whose names are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred.

For example, to only return data from Project Name and Project Description, send these two query parameters:


fields%5B%5D=Project%20Name&fields%5B%5D=Project%20Description
You can also perform the same action with field ids (they can be found in the fields section):


fields%5B%5D=fldIEeAltobEcmsR0&fields%5B%5D=fldJSoYDtkRzhj3SG
Note: %5B%5D may be omitted when specifying multiple fields, but must always be included when specifying only a single field.

filterByFormula
string
optional
A formula used to filter records. The formula will be evaluated for each record, and if the result is not 0, false, "", NaN, [], or #Error! the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request.

If combined with the view parameter, only records in that view which satisfy the formula will be returned.

The formula must be encoded first before passing it as a value. You can use this tool to not only encode the formula but also create the entire url you need. For example, to only include records where Project Name isn't empty, pass in NOT({Project Name} = '') as a parameter like this:

filterByFormula=NOT%28%7BProject%20Name%7D%20%3D%20%27%27%29

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

For example, to sort records by Project Name in descending order, send these two query parameters:

sort%5B0%5D%5Bfield%5D=Project%20Name
sort%5B0%5D%5Bdirection%5D=desc
For example, to sort records by Project Name in descending order, pass in:

[{field: "Project Name", direction: "desc"}]
view
string
optional
The name or ID of a view in the Projects table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the sort parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the fields parameter.cellFormat
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
curl "https://api.airtable.com/v0/appTZNwy0h8PLgahr/Projects?maxRecords=3&view=Grid%20view" \
  -H "Authorization: Bearer YOUR_SECRET_API_TOKEN"
Example response
{
    "records": [
        {
            "id": "recflMTTAdBPpQ6mE",
            "createdTime": "2025-03-22T08:44:16.000Z",
            "fields": {
                "Project Name": "Narcom",
                "Project Description": "Construction of a new bridge over the river",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                }
            }
        },
        {
            "id": "recoxSro8ryc5d5nf",
            "createdTime": "2025-03-22T08:44:16.000Z",
            "fields": {
                "Project Name": "Bedrijfsbreed",
                "Project Description": "Al het werk gerelateerd aan de platform-ondersteuning van Inventhor. Met name Airtable, Google (workspace/cloud/firebase), de website en socials.",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                },
                "Tasks": [
                    "recP3oLbl4Ig3BnQ9"
                ]
            }
        },
        {
            "id": "recd9AfA9DJufrYMC",
            "createdTime": "2025-04-06T09:00:55.000Z",
            "fields": {
                "Project Name": "Evolver",
                "Project Description": "Evolution AI powered",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                }
            }
        }
    ],
    "offset": "itrjZOyN4GWOaLfyl/recd9AfA9DJufrYMC"
}
 
Iteration may timeout due to client inactivity or server restarts. In that case, the client will receive a 422 response with error message LIST_RECORDS_ITERATOR_NOT_AVAILABLE. It may then restart iteration from the beginning.

 
Retrieve a Projects record
To retrieve an existing record in Projects table, issue a GET request to the record endpoint.

Any "empty" fields (e.g. "", [], or false) in the record will not be returned.

In attachment objects included in the retrieved record (Thumbnail), only id, url, and filename are always returned. Other attachment properties may not be included. Note: Attachment URLs returned will expire 2 hours after being returned from our API. If you want to persist the attachments, we recommend downloading them instead of saving the URL. See our support article for more information.

 
Example request
curl https://api.airtable.com/v0/appTZNwy0h8PLgahr/Projects/recflMTTAdBPpQ6mE \
  -H "Authorization: Bearer YOUR_SECRET_API_TOKEN"
Example response
{
    "id": "recflMTTAdBPpQ6mE",
    "createdTime": "2025-03-22T08:44:16.000Z",
    "fields": {
        "Project Name": "Narcom",
        "Project Description": "Construction of a new bridge over the river",
        "Status": "In Progress",
        "Owner": {
            "id": "usr2OowfR4FWvdayu",
            "email": "tom@inventhor.com",
            "name": "Tom Franse"
        }
    }
}
Create Projects records
To create new records, issue a POST request to the Projects endpoint. Note that table names and table ids can be used interchangeably. Using table ids means table name changes do not require modifications to your API request.

Your request body should include an array of up to 10 record objects. Each of these objects should have one key whose value is an inner object containing your record's cell values, keyed by either field name or field id.

Returns an array of record objects created if the call succeeded, including record IDs which will uniquely identify the records within Value Machine.

To create new attachments in Thumbnail, set the field value to an array of attachment objects. When creating an attachment, url is required, and filename is optional. Airtable will download the file at the given url and keep its own copy of it. All other attachment object properties will be generated server-side soon afterward.

Note that in most cases the API does not currently return an error code for failed attachment object creation given attachment uploading happens in an asynchronous manner, such cases will manifest with the attachment object either being cleared from the cell or persisted with generated URLs that return error responses when queried. If the same attachment URL fails to upload multiple times in a short time interval then * the API may return an ATTACHMENTS_FAILED_UPLOADING error code in the details field of the response and the attachment object will * be cleared from the cell synchronously.

We also require URLs used to upload have the https:// or http:// protocol (Note: http:// support will be removed in the near future), have a limit of 3 max redirects, and a file size limit of 1GB. In addition, URLs must be publicly accessible, in cases where cookie authentication or logging in to access the file is required, the login page HTML will be downloaded instead of the file.

Attachment URLs returned will expire 2 hours after being returned from our API. If you want to persist the attachments, we recommend downloading them instead of saving the URL.

If too many attachments are uploaded within a short period of time, the server may return a partial failure on record creation with an "Attachment Upload Rate Too High" error. See our support article for more information.

To set a collaborator in Owner, set the field value to a user object. A user object must contain either the id or email of a user that this base is shared with. An id takes precedence over email if both are present. Any missing properties will be filled in automatically based on the matching user.

The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in (click to show example). Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.

You can also include a single record object at the top level. Click here to show an example.

 
Example request
curl -X POST https://api.airtable.com/v0/appTZNwy0h8PLgahr/Projects \
  -H "Authorization: Bearer YOUR_SECRET_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
  "records": [
    {
      "fields": {
        "Project Name": "Narcom",
        "Project Description": "Construction of a new bridge over the river",
        "Status": "In Progress",
        "Owner": {
          "id": "usr2OowfR4FWvdayu",
          "email": "tom@inventhor.com",
          "name": "Tom Franse"
        }
      }
    },
    {
      "fields": {
        "Project Name": "Bedrijfsbreed",
        "Project Description": "Al het werk gerelateerd aan de platform-ondersteuning van Inventhor. Met name Airtable, Google (workspace/cloud/firebase), de website en socials.",
        "Status": "In Progress",
        "Owner": {
          "id": "usr2OowfR4FWvdayu",
          "email": "tom@inventhor.com",
          "name": "Tom Franse"
        },
        "Tasks": [
          "recP3oLbl4Ig3BnQ9"
        ]
      }
    }
  ]
}'
Example response
{
    "records": [
        {
            "id": "recflMTTAdBPpQ6mE",
            "createdTime": "2025-03-22T08:44:16.000Z",
            "fields": {
                "Project Name": "Narcom",
                "Project Description": "Construction of a new bridge over the river",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                }
            }
        },
        {
            "id": "recoxSro8ryc5d5nf",
            "createdTime": "2025-03-22T08:44:16.000Z",
            "fields": {
                "Project Name": "Bedrijfsbreed",
                "Project Description": "Al het werk gerelateerd aan de platform-ondersteuning van Inventhor. Met name Airtable, Google (workspace/cloud/firebase), de website en socials.",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                },
                "Tasks": [
                    "recP3oLbl4Ig3BnQ9"
                ]
            }
        }
    ]
}
Update/Upsert Projects records
To update Projects records, issue a request to the Projects endpoint. Table names and table IDs can be used interchangeably. Using table IDs means table name changes won't require modifying your API request code. A PATCH request will only update the fields included in the request. Fields not included in the request will be unchanged. A PUT request will perform a destructive update and clear all unincluded cell values.

Your request body should include an array of up to 10 record objects. Each of these objects should have an id property representing the record ID and a fields property which contains all of your record's cell values by field name or field id for all of your record's cell values by field name.

Upsert behavior can be enabled by including a performUpsert object with a fieldsToMergeOn array in your request. Upserts will treat fieldsToMergeOn as an external ID to find existing records in Airtable. If a match is found, that record will be updated. If no matches are found, a new record will be created. For more details, visit our API reference.
Click here to show an example.

fieldsToMergeOn should be an array with 1-3 field names or field IDs which uniquely identify a record. These cannot be computed fields and must be of the following field types: number, text, long text, single select, multiple select, date.

The API response for upsert requests will additionally include createdRecords and updatedRecords. These are arrays of record IDs, identifying the records from the response's records array that were created or updated.

Airtable reserves the right to throttle upsert requests differently from the standard rate limit throttling policy.

To add attachments to Thumbnail, add new attachment objects to the existing array. Be sure to include all existing attachment objects that you wish to retain, to keep preexisting attachments providing id is required (which can be retrieved using the retrieve endpoint), other fields are ignored. For the new attachments being added, url is required, and filename is optional. To remove attachments, include the existing array of attachment objects, excluding any that you wish to remove.

Note that in most cases the API does not currently return an error code for failed attachment object creation given attachment uploading happens in an asynchronous manner, such cases will manifest with the attachment object either being cleared from the cell or persisted with generated URLs that return error responses when queried. If the same attachment URL fails to upload multiple times in a short time interval then * the API may return an ATTACHMENTS_FAILED_UPLOADING error code in the details field of the response and the attachment object will * be cleared from the cell synchronously.

We also require URLs used to upload have the https:// or http:// protocol (Note: http:// support will be removed in the near future), have a limit of 3 max redirects, and a file size limit of 1GB. In addition, URLs must be publicly accessible, in cases where cookie authentication or logging in to access the file is required, the login page HTML will be downloaded instead of the file.

If too many attachments are uploaded within a short period of time, the server may return a partial failure on record creation with an "Attachment Upload Rate Too High" error.

To link to new records in Milestones and Tasks, add new linked record IDs to the existing array. Be sure to include all existing linked record IDs that you wish to retain. To unlink records, include the existing array of record IDs, excluding any that you wish to unlink.

To set a collaborator in Owner, set the field value to a user object. A user object must contain either the id or email of a user that this base is shared with. An id takes precedence over email if both are present. Any missing properties will be filled in automatically based on the matching user.

Project Description may contain "mention tokens". A mention token corresponds to a "@mention" in Airtable's user interface; here in the API it will look like <airtable:mention id="menE1i9oBaGX3DseR">@Alex</airtable:mention>. Mention tokens cannot be created via this API and should be left intact (or wholly removed) when updating long text fields.

Automatic data conversion for update actions can be enabled via typecast parameter. See create record for details.

You can also include a single record object at the top level. Click here to show an example.

 
Example request
curl -X PATCH https://api.airtable.com/v0/appTZNwy0h8PLgahr/Projects \
  -H "Authorization: Bearer YOUR_SECRET_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
  "records": [
    {
      "id": "recflMTTAdBPpQ6mE",
      "fields": {
        "Project Name": "Narcom",
        "Project Description": "Construction of a new bridge over the river",
        "Status": "In Progress",
        "Owner": {
          "id": "usr2OowfR4FWvdayu",
          "email": "tom@inventhor.com",
          "name": "Tom Franse"
        }
      }
    },
    {
      "id": "recoxSro8ryc5d5nf",
      "fields": {
        "Project Name": "Bedrijfsbreed",
        "Project Description": "Al het werk gerelateerd aan de platform-ondersteuning van Inventhor. Met name Airtable, Google (workspace/cloud/firebase), de website en socials.",
        "Status": "In Progress",
        "Owner": {
          "id": "usr2OowfR4FWvdayu",
          "email": "tom@inventhor.com",
          "name": "Tom Franse"
        },
        "Tasks": [
          "recP3oLbl4Ig3BnQ9"
        ]
      }
    },
    {
      "id": "recd9AfA9DJufrYMC",
      "fields": {
        "Project Name": "Evolver",
        "Project Description": "Evolution AI powered",
        "Status": "In Progress",
        "Owner": {
          "id": "usr2OowfR4FWvdayu",
          "email": "tom@inventhor.com",
          "name": "Tom Franse"
        }
      }
    }
  ]
}'
Example response
{
    "records": [
        {
            "id": "recflMTTAdBPpQ6mE",
            "createdTime": "2025-03-22T08:44:16.000Z",
            "fields": {
                "Project Name": "Narcom",
                "Project Description": "Construction of a new bridge over the river",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                }
            }
        },
        {
            "id": "recoxSro8ryc5d5nf",
            "createdTime": "2025-03-22T08:44:16.000Z",
            "fields": {
                "Project Name": "Bedrijfsbreed",
                "Project Description": "Al het werk gerelateerd aan de platform-ondersteuning van Inventhor. Met name Airtable, Google (workspace/cloud/firebase), de website en socials.",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                },
                "Tasks": [
                    "recP3oLbl4Ig3BnQ9"
                ]
            }
        },
        {
            "id": "recd9AfA9DJufrYMC",
            "createdTime": "2025-04-06T09:00:55.000Z",
            "fields": {
                "Project Name": "Evolver",
                "Project Description": "Evolution AI powered",
                "Status": "In Progress",
                "Owner": {
                    "id": "usr2OowfR4FWvdayu",
                    "email": "tom@inventhor.com",
                    "name": "Tom Franse"
                }
            }
        }
    ]
}
Delete Projects records
To delete Projects records, issue a DELETE request to the Projects endpoint. Note that table names and table ids can be used interchangeably. Using table ids means table name changes do not require modifications to your API request.

Your request should include a URL-encoded array of up to 10 record IDs to delete.

You can also issue a DELETE request to the record endpoint to delete a single record. Click here to show an example.

