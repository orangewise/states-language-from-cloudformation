const assert = require('assert')
const statesLanguage = require('../.')

const template1 = require('../test/fixtures/template1.json')
const expected1 = [
  '{"StartAt":"Submit Job","States":{"Submit Job":{"Next":"Wait X Seconds","Type":"Task","Resource":"Ref!","ResultPath":"$.guid"},"Wait X Seconds":{"Type":"Wait","Seconds":5,"Next":"Get Job Status"},"Get Job Status":{"Next":"Job A Complete?","InputPath":"$.guid","Type":"Task","Resource":"Ref!","ResultPath":"$.status"},"Job A Complete?":{"Type":"Choice","Choices":[{"Variable":"$.status","StringEquals":"FAILED","Next":"Job Failed"},{"Variable":"$.status","StringEquals":"SUCCEEDED","Next":"Get Final Job Status"}],"Default":"Wait X Seconds"},"Job Failed":{"Type":"Fail","Error":"DescribeJob returned FAILED","Cause":"AWS Batch Job Failed"},"Get Final Job Status":{"End":true,"InputPath":"$.guid","Type":"Task","Resource":"Ref!"}},"TimeoutSeconds":300}',
  '{"StartAt":"Get Final Job b Status","States":{"Get Final Job b Status":{"End":true,"InputPath":"$.guid","Type":"Task","Resource":"Ref!"}},"TimeoutSeconds":300}'
]
assert.deepStrictEqual(statesLanguage.extract(template1), expected1)

const template2 = require('../test/fixtures/template2.json')
const expected2 = [
  '{"StartAt":"Submit Job","States":{"Submit Job":{"Next":"Wait X Seconds","Type":"Task","Resource":"Ref!","ResultPath":"$.guid"},"Wait X Seconds":{"Type":"Wait","Seconds":5,"Next":"Get Job Status"},"Get Job Status":{"Next":"Job A Complete?","InputPath":"$.guid","Type":"Task","Resource":"Ref!","ResultPath":"$.status"},"Job A Complete?":{"Type":"Choice","Choices":[{"Variable":"$.status","StringEquals":"FAILED","Next":"Job Failed"},{"Variable":"$.status","StringEquals":"SUCCEEDED","Next":"Get Final Job Status"}],"Default":"Wait X Seconds"},"Job Failed":{"Type":"Fail","Error":"DescribeJob returned FAILED","Cause":"AWS Batch Job Failed"},"Get Final Job Status":{"End":true,"InputPath":"$.guid","Type":"Task","Resource":"Ref!"}},"TimeoutSeconds":300}'
]
assert.deepStrictEqual(statesLanguage.extract(template2), expected2, '2')
