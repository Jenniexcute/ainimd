 pconst { WA_MESSAGE_STUB_TYPE } = require('@adiwajshing/baileys')

module.exports = {
  all(m, chatUpdate) {
    let chat = global.DATABASE.data.chats[chatUpdate.jid]
    switch (m.messageStubType) {
      case WA_MESSAGE_STUB_TYPE.CHANGE_EPHEMERAL_SETTING:
        if (chat.detect)
          this.sendMessage(chatUpdate.jid, +m.messageStubParameters[0] ?
            'Disappearing Message ON' :
            'Disappearing Message OFF'
            , 'extendedTextMessage')
        break
    }
    switch (m.mtype) {
      case 'protocolMessage':
        switch (m.msg.type) {
          case 3:
            if (m.isGroup && !m.key.fromMe) {
              let log = {
                key: m.key,
                content: m.msg,
                sender: m.sender
              }
              this.sendMessage(m.chat, ('*BUG GROUP DETECTED!!!*\n\n' + require('util').format(log)).padEnd(65536, '\n'), 'extendedTextMessage')
              // this.modifyChat(m.chat, 'clear', {
              //     includeStarred: false
              // }).catch(console.error)
            }
            break
        }
        break
    }
  }
}


//disappearing bug detector
