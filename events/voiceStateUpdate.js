const { Events } = require('discord.js')

module.exports = {
  name: Events.VoiceStateUpdate,
  execute(oldState, newState, telegramBot, chatId) {
    try {
      if (!oldState.channel && newState.channel) {
        const user = newState.member.displayName
        const channelName = newState.channel.name
        const guildName = newState.guild.name

        const message = `${user} just entered the '${channelName}' voice channel in ${guildName}`
        telegramBot.sendMessage(chatId, message)
      } else if (oldState.channel && !newState.channel) {
        const user = oldState.member.displayName
        const channelName = oldState.channel.name
        const guildName = oldState.guild.name

        const message = `${user} just left the '${channelName}' voice channel in ${guildName}`
        telegramBot.sendMessage(chatId, message)
      }
    } catch (e) {
      console.log(e)
    }
  },
}
