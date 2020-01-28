# states-language-from-cloudformation

Extracts states-language from cloudformation (AWS::StepFunctions::StateMachine)


## Examples

Single statemachine in template:

```bash

$ cat test/fixtures/template2.json | npx states-language-from-cloudformation

{"StartAt":"Submit Job","States":{"Submit Job":{"Next":"Wait X Seconds","Type":"Task","Resource":"Ref!","ResultPath":"$.guid"},"Wait X Seconds":{"Type":"Wait","Seconds":5,"Next":"Get Job Status"},"Get Job Status":{"Next":"Job A Complete?","InputPath":"$.guid","Type":"Task","Resource":"Ref!","ResultPath":"$.status"},"Job A Complete?":{"Type":"Choice","Choices":[{"Variable":"$.status","StringEquals":"FAILED","Next":"Job Failed"},{"Variable":"$.status","StringEquals":"SUCCEEDED","Next":"Get Final Job Status"}],"Default":"Wait X Seconds"},"Job Failed":{"Type":"Fail","Error":"DescribeJob returned FAILED","Cause":"AWS Batch Job Failed"},"Get Final Job Status":{"End":true,"InputPath":"$.guid","Type":"Task","Resource":"Ref!"}},"TimeoutSeconds":300}

```


Multiple statemachines in template:
```bash

 $ cat test/fixtures/template1.json | npx states-language-from-cloudformation
 
{"StartAt":"Submit Job","States":{"Submit Job":{"Next":"Wait X Seconds","Type":"Task","Resource":"Ref!","ResultPath":"$.guid"},"Wait X Seconds":{"Type":"Wait","Seconds":5,"Next":"Get Job Status"},"Get Job Status":{"Next":"Job A Complete?","InputPath":"$.guid","Type":"Task","Resource":"Ref!","ResultPath":"$.status"},"Job A Complete?":{"Type":"Choice","Choices":[{"Variable":"$.status","StringEquals":"FAILED","Next":"Job Failed"},{"Variable":"$.status","StringEquals":"SUCCEEDED","Next":"Get Final Job Status"}],"Default":"Wait X Seconds"},"Job Failed":{"Type":"Fail","Error":"DescribeJob returned FAILED","Cause":"AWS Batch Job Failed"},"Get Final Job Status":{"End":true,"InputPath":"$.guid","Type":"Task","Resource":"Ref!"}},"TimeoutSeconds":300}
{"StartAt":"Get Final Job b Status","States":{"Get Final Job b Status":{"End":true,"InputPath":"$.guid","Type":"Task","Resource":"Ref!"}},"TimeoutSeconds":300}

```
