import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import { groupBy } from 'lodash-es'

import { Cosmos } from '../../../utils/cosmos'
import Menu from '@/components/menu'
import AccountHeader from '@/components/accountHeader'
import { getAccount } from '@/utils'
import { getTransByHash, messageByAccount } from '@/resources/api'
import dayjs from 'dayjs'
import { dealType, cutText } from '@/utils/tools'
import MsgSend from './typeField/msgSend'
import MsgCustom from './typeField/msgCustom'
import MsgDefault from './typeField/msgDefault'
import Custom from './typeField/msgCustom'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Activity({ style, setTab }: any) {
  const navigate = useNavigate()
  // new Array(3).fill(1)
  const [list, setList] = useState<any[]>([])

  const initData = async () => {
    const res = await getAccount()
    res.address = 'sil157ykw7kanea77pkwkrhw6v6a7gpzlwwcwjztup'
    const res2: any = await messageByAccount({ account: res.address })
    console.log('res2.data:::', res2.data)
    const trans = res2.data.map(async (item: any) => {
      const info = await getTransByHash({ transaction_hash: item.transaction_hash })
      return {
        ...item,
        ...info.data,
        timestamp: info.timestamp,
        accountAddress: res.address,
      }
    })
    const res3 = await Promise.all(trans)

    const category = groupBy(res3, (item) => {
      // console.log(dayjs(item.timestamp).format('DD MMM YYYY'))
      return dayjs(item.timestamp).format('DD MMM YYYY')
    })
    const list = []
    for (const key in category) {
      if (Object.prototype.hasOwnProperty.call(category, key)) {
        // console.log('key:::', key)
        const item: any = category[key].map((v) => {
          const _type = dealType(v.type)
          // console.log('_type:::', _type)
          return {
            ...v,
            _time: dayjs(v.timestamp).format('h:mm A'),
            _type,
            _isForm: _type === 'Send' && res.address === v.value.from_address,
            _gas: v.fee.amount.find((v2: any) => v2.denom === 'src').amount,
          }
        })
        // console.log('key:::', key)
        item.time = list.push({
          date: dayjs(key).format('DD MMM YYYY'),
          list: item,
        })
      }
    }
    console.log('res3::', res3)
    console.log('category::', category)
    console.log('list::', list)
    setList(list)
  }

  useEffect(() => {
    initData()
  }, [])

  const next = () => {
    // navigate({ pathname: '/create2' })
  }

  const customList = ['Delegate', 'ExitDelegate', 'Undelegate', 'CreateDelegate', 'DoFixedDeposit', 'DoFixedWithdraw', 'AgToAc']
  const listItem = (data: any) => {
    if (data._type === 'Send') {
      return <MsgSend data={data} key={data.hash}></MsgSend>
    } else if (customList.includes(data._type)) {
      return <MsgCustom data={data} key={data.hash}></MsgCustom>
    } else {
      return <MsgDefault data={data} key={data.hash}></MsgDefault>
    }
  }

  return (
    <Box className={styles.container} style={style}>
      <AccountHeader title="Activitys"></AccountHeader>

      <Box mt="18px" fontSize="16px">
        RECENT TRANSACTIONS
      </Box>

      <Box className={styles.list}>
        {list.map((item: any, index: any) => {
          return (
            <Box key={index} mt="10px">
              <Box fontSize="14px" mt="5px" mb="8px">
                {item.date}
              </Box>
              {item.list.map((item2: any, index2: any) => {
                return listItem(item2)
              })}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
