exports.extract = function (template) {
  return Object
    .values(template.Resources)
    .filter(resource => resource.Type === 'AWS::StepFunctions::StateMachine')
    .map(machine => machine.Properties.DefinitionString['Fn::Join'][1])
    .map(sm => sm
      .map(snippet => {
        if (typeof snippet === 'object') {
          return 'Ref!'
        } else { return snippet }
      })
    )
    .map(sm => sm.join(''))
}
