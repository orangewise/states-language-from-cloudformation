#!/usr/bin/env node

const getStdin = require('get-stdin')
const statesLanguage = require('../.')

async function go () {
  const input = await getStdin()
  const template = typeof input === 'string' ? JSON.parse(input) : input
  const stateMachines = statesLanguage.extract(template)
  stateMachines.map(sm => console.log(sm))
}

go()
