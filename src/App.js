import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  SimpleGrid,
  Flex,
  Input,
  useToast,
} from '@chakra-ui/react'
import useFetch from 'use-http'
import TransactionsList from './TransactionsList'
import isSolid from 'is-solid'

const API_BASE_URL = 'https://api.etherscan.io/'
const API_KEY = 'BFK2C4SZU96PAIV7N1TVNJJ8TQFP6B79DV'
const DEFAULT_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

function App() {
  const [urlToFetch, setUrlToFetch] = useState(null)
  const [etheriumAddress, setEtheriumAddress] = useState(DEFAULT_ADDRESS)
  const [transactions, setTransactions] = useState(null)
  const { get, response, loading, error } = useFetch(API_BASE_URL)
  const toast = useToast()

  useEffect(() => {
    createUrlToFetch()
  }, [etheriumAddress])

  const createUrlToFetch = (address = etheriumAddress) => {
    const url = `api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`

    setUrlToFetch(url)
  }

  const getTransactions = async () => {
    const response = await get(urlToFetch)

    if (response.message === 'OK') {
      setTransactions(response.result)
    } else if (response.message === 'NOTOK') {
      toast({
        title: 'Warning',
        description: 'Please add a valid etherium address.',
        status: 'warning',
        duration: 7000,
        isClosable: true,
      })
    }
  }
  return (
    <Box p="2rem" maxWidth="1200px" mx="auto" height="100%">
      <Flex mb="1rem" pb="1rem" borderBottom="1px solid #e7eaf3">
        <Box width={[1 / 2]}>
          <Input
            value={etheriumAddress}
            placeholder="Add etherium address"
            onChange={(e) => setEtheriumAddress(e.target.value)}
          />
        </Box>
        <Button onClick={getTransactions} isLoading={loading} mx="1rem">
          Fetch Transactions
        </Button>
      </Flex>

      {isSolid(transactions) ? (
        <>
          <SimpleGrid
            minChildWidth="120px"
            columns={5}
            spacing={10}
            pr="1rem"
            pb="1rem"
            mb="1rem"
            borderBottom="1px solid #e7eaf3"
          >
            <Box>#</Box>
            <Box>timeStamp</Box>
            <Box>from</Box>
            <Box>to</Box>
            <Box>value</Box>
            <Box>confirmations</Box>
          </SimpleGrid>
          <TransactionsList transactions={transactions} />
        </>
      ) : (
        <Box textAlign="center" mt="4rem">
          No Data
        </Box>
      )}
    </Box>
  )
}

export default App
