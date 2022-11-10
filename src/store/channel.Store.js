import { makeAutoObservable } from 'mobx'
import { http } from '@/utils/http'

class ChannelStore {
  channelList = []

  constructor() {
    makeAutoObservable(this)
  }


  // acticle publish 在公共的Layout里面调用
  loadChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels
  }

}

export default ChannelStore