let handler = m => m

handler.all = async function (m) {
    this.spam = this.spam ? this.spam : {}
    if (!(m.sender in this.spam)) {
        let spaming = {
        jid: await m.sender, 
        spam: 0,
        lastspam: 0
            
        }
        this.spam[spaming.jid] = spaming
    } else try {
        this.spam[m.sender].spam += 1
        if (new Date - this.spam[m.sender].lastspam > 20) {
            if (this.spam[m.sender].spam > 20) {
                this.spam[m.sender].spam = 0
                this.spam[m.sender].lastspam = new Date * 1
                global.DATABASE._data.users[m.sender].banned = true
                m.reply('*Karena Kamu Spam Kamu Akan Dibanned*')
            } else {
                this.spam[m.sender].spam = 0
                this.spam[m.sender].lastspam = new Date * 1
            }
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = handler