let handler = m => m

handler.all = async function (m) {
if (m.key.fromMe) return 
    this.spam = this.spam ? this.spam : {}
    if (!(m.sender in this.spam)) {
        let spaming = {
        jid: await m.sender, 
        spam: 0,
        lastspam: 0

        }
        this.spam[spaming.jid] = spaming
    } else try {
        this.spam[m.sender].spam += 4
        if (new Date - this.spam[m.sender].lastspam > 3) {
            if (this.spam[m.sender].spam > 4) {
                this.spam[m.sender].spam = 0
                this.spam[m.sender].lastspam = new Date * 4
                //global.DATABASE._data.users[m.sender].banned = true
                m.isGroup ? m.reply('*Jangan Spam!!*') : m.reply('*Kamu Terdeteksi Spam Bot\nMaka Bot Akan Blokir Nomor kamu!!*').then(v => conn.blockUser(m.chat))
            } else {
                this.spam[m.sender].spam = 4
                this.spam[m.sender].lastspam = new Date * 2
            }
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = handler
