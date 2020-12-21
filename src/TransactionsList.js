import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { Flex, Tooltip, Box, SimpleGrid, useClipboard } from '@chakra-ui/react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { CopyIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'

const Row = ({ data, index, style }) => {
  const { timeStamp, from, to, value, confirmations } = data[index]

  return (
    <SimpleGrid
      style={style}
      fontSize="13px"
      minChildWidth="120px"
      columns={5}
      spacing={10}
    >
      <Box>{index + 1}</Box>
      <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {dayjs(timeStamp).format('DD/MM/YYYY')}
      </Box>
      <Flex>
        <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          <Tooltip
            hasArrow
            placement="top-start"
            label={from}
            aria-label="A tooltip"
          >
            {from}
          </Tooltip>
        </Box>
        <CopyIcon cursor="pointer" />
      </Flex>
      <Flex>
        <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          <Tooltip
            hasArrow
            placement="top-start"
            label={to}
            aria-label="A tooltip"
          >
            {to}
          </Tooltip>
        </Box>
        <CopyIcon cursor="pointer" />
      </Flex>
      <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {value}
      </Box>
      <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {confirmations}
      </Box>
    </SimpleGrid>
  )
}

const TransactionsList = ({ transactions }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemData={transactions}
          itemCount={transactions.length}
          itemSize={35}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}

export default TransactionsList
