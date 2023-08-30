const { Events } = require('discord.js')

module.exports = {
  name: Events.VoiceStateUpdate,
  execute(oldState, newState) {
    try {
      if (!oldState.channel && newState.channel) {
        const user = newState.member.displayName
        const channelName = newState.channel.name
        const guildName = newState.guild.name

        console.log(
          `${user} just entered the '${channelName}' voice channel in ${guildName}`
        )
      } else if (oldState.channel && !newState.channel) {
        const user = oldState.member.displayName
        const channelName = oldState.channel.name
        const guildName = oldState.guild.name

        console.log(
          `${user} just left the '${channelName}' voice channel in ${guildName}`
        )
      }
    } catch (e) {
      console.log(e)
    }
  },
}
