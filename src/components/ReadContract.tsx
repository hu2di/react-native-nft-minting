import { View, Text, StyleSheet } from "react-native";
import { useReadContract } from "wagmi";
import abi from "../abis/abi.json";
import { useEffect } from "react";

export default function ReadContract() {
   // Read DAI Name
   const {
    data: daiName,
    isSuccess: isDaiSuccess,
    isPending: isDaiPending,
   } = useReadContract({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Address
    abi,
    functionName: 'name',
   })

   // Read USDT totalSupply
   const {
    data: usdtSupply,
    isSuccess: isUsdtSuccess,
    isPending: isUsdtPending,
   } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT Address
    abi,
    functionName: 'totalSupply',
   })

   // Read USDC Symbol
   const {
    data: usdcSymbol,
    isSuccess: isUsdcSuccess,
    isPending: isUsdcPending,
   } = useReadContract({
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC Address
    abi,
    functionName: 'symbol',
   })

  // Show result when success
  useEffect(() => {
    console.log('Read Contract:', {
      DAI: daiName?.toString(),
      USDT: usdtSupply?.toString(),
      USDC: usdcSymbol?.toString()
    });
  }, [daiName, usdtSupply, usdcSymbol]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Test Read Contract:</Text>
      
      {isDaiPending ? (
        <Text style={styles.text}>Loading DAI Name...</Text>
      ) : isDaiSuccess && (
        <Text style={styles.text}>
          DAI Name: {daiName?.toString()}
        </Text>
      )}

      {isUsdtPending ? (
        <Text style={styles.text}>Loading USDT Supply...</Text>
      ) : isUsdtSuccess && (
        <Text style={styles.text}>
          USDT Supply: {usdtSupply?.toString()}
        </Text>
      )}

      {isUsdcPending ? (
        <Text style={styles.text}>Loading USDC Symbol...</Text>
      ) : isUsdcSuccess && (
        <Text style={styles.text}>
          USDC Symbol: {usdcSymbol?.toString()}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 40,
  },
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  }
});