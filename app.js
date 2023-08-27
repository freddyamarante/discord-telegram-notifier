const WebSocket = require('ws')

const ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json')
let interval = 0

token = 'MjMxMTQ4Njc3OTM3MjMzOTMw.GRVwCn.1WnFhCpYcgd2gb-BP6hi9hoVVzdshavV4fll08'
payload = {
  op: 2,
  d: {
    token,
    intents: 513,
    properties: {
      $os: 'linux',
      $browser: 'chrome',
      $device: 'chrome',
    },
  },
}

ws.on('open', function open() {
  ws.send(JSON.stringify(payload))
})

ws.on('message', function incoming(data) {
  let payload = JSON.parse(data)
  const { t, d, op } = payload

  switch (op) {
    case 10:
      const { heartbeat_interval } = d
      interval = heartbeat(heartbeat_interval)
      break
  }

  switch (t) {
    case 'READY':
      console.log('ready!')
      break
    case 'VOICE_STATE_UPDATE':
      const { user_id, member, channel_id } = d
      console.log('it changed')

      if (channel_id) {
        console.log(`${member.user.username} has entered the channel.`)
      }
      break
    case 'TYPING_START':
      console.log('somebody started typing dawg')
  }
})

ws.on('error', function error(err) {
  console.error('WebSocket error:', err)
})

const heartbeat = (ms) => {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 2, d: null }))
  }, ms)
}
